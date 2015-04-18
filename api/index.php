<?php
	require_once("database.php");

	$opts = array(
    	    'http'=>array(
        	    'method'=>"GET",
            	'header'=>"Accept-language: en\r\n" .
            	"Cookie: foo=bar\r\n",
            	'proxy' => 'tcp://172.31.1.4:8080',
            	)
	);

	$context = stream_context_create($opts);
	//$category = $_GET["category"];
	$category = "Chemistry";
	$query = "SELECT * from gcmcontinue where category = " . $category;
	$result = mysqli_query($con, $query);
	
	if(mysqli_num_rows($result) == 0) {
		$url = "http://en.wikipedia.org/w/api.php?format=json&action=query&list=random&generator=categorymembers&gcmtitle=Category:" . $category . "&prop=info&prop=extracts&exintro=&explaintext&exlimit=max&continue=gcmcontinue||random&rnlimit=10&rnnamespace=0";
		$json = file_get_contents($url, false, $context);
		//print $json;
		$parsed_json = json_decode($json); 
    	$gcm =  $parsed_json->continue->gcmcontinue;
    	$query = "INSERT INTO gcmcontinue ( gcm, category)
		VALUES ('Doe', 'john@example.com')";
    	//$query = "INSERT into gcmcontinue (gcm, category) VALUES (". 'wow' .",". $category.")";
		print $query;
		mysqli_query($con, $query);
		if ($con->query($sql) === TRUE) {
    		echo "New record created successfully";
		} else {
    		echo "Error: " . $sql . "<br>" . $con->error;
		}
	}

	else {
		$fetch = mysqli_fetch_row($result);
		$next = $fetch["gcmcontinue"];
		$url = "http://en.wikipedia.org/w/api.php?format=json&action=query&lowist=random&generator=categorymembers&gcmtitle=Category:" . $category. "&prop=info&prop=extracts&exintro=&explaintext&exlimit=max&continue=gcmcontinue||random&rnlimit=10&rnnamespace=0&gcmcontinue="+ $next + "&continue=&callback=?";
		$json = file_get_contents($url, false, $context);
		echo $json;
		$obj = json_decode($json);
		$gcm =  $obj->continue->gcmcontinue;
		$query = "UPDATE gcmcontinue SET gcmcontinue = ". $gcm . "WHERE category = ". $category;
		mysqli_query($con, $query);


	}

?>
