 
  var category_of_page = "Chemistry";
  var heroku_url = "http://wikifeedia.herokuapp.com/index.php?category=" + category_of_page + "&callback=?"
  var hex_code = new Array();
  function loadStartIndex() {
    $.getJSON(heroku_url, function(data) {
        start_page = data.category;
        
        start_page_cleaned = start_page.replace("_", " "); 
        start_page_cleaned = start_page.toUpperCase();

        for (var i = 0; i < start_page_cleaned.length; i++) {
          hex_code = hex_code + start_page_cleaned.charCodeAt(i).toString(16)
        }
//        console.log(start_page_cleaned);
//        console.log(hex_code);


        start_url = "https://en.wikipedia.org/w/api.php?format=json&action=query&prop=categories&titles="+start_page + "&callback=?"


        $.getJSON(start_url, function(data) {
          $.each(data.query.pages, function(i, item) {
          start_id = item.pageid;
          next = "page|" + hex_code + "|" + start_id;
          fetchPost();
    

        });

        console.log(next);
           
      });

    });

    }
        
  





    function fetchPost() {
      urlContent = "http://en.wikipedia.org/w/api.php?format=json&action=query&list=random&generator=categorymembers&gcmtitle=Category:"+category_of_page+"&prop=info&prop=extracts&exintro=&explaintext&exlimit=max&continue=gcmcontinue||random&rnlimit=10&rnnamespace=0&gcmcontinue="+ next + "&continue=&callback=?";
      
      $.getJSON(urlContent, function(data) {
        next =  data.continue.gcmcontinue;

        $.each(data.query.pages, function(i, item) {
          content = item.extract;
          pageId = item.pageid;
          colum = "post" + pageId;
          $("#feed").append("<div id = "+colum+">");
          $("#"+colum).append("<h2>"+item.title +"</h2>"+ "<p>" + content + "</p>");
          $("#feed").append("</div>");
          fetchImage(pageId);
        });
      });

      return 1;
    }

    function fetchImage(pageId) {
      urlImage = "http://en.wikipedia.org/w/api.php?action=query&pageids="+pageId+"&prop=pageimages&format=json&pithumbsize=500&continue=&callback=?";
      
        
       $.getJSON(urlImage, function(data) {
        $.each(data.query.pages, function(i, item) {
          content = item.thumbnail.source;
          colum = "post" + pageId;
          $("#" + colum).append("<img id='maxwidth' src = "+content+"> </img> <hr>");
            
        });
      });

    }

    

    $(document).ready(function(){
      loadStartIndex();
    
    });

   
   $(window).scroll(function()
    {
      
    if($(window).scrollTop() == $(document).height() - $(window).height())
    {    
        data = 0;
        urlContinue = "http://en.wikipedia.org/w/api.php?format=json&action=query&list=random&generator=categorymembers&gcmtitle=Category:"+category_of_page+"&prop=info&prop=extracts&exintro=&explaintext&exlimit=max&continue=gcmcontinue||random&rnlimit=10&rnnamespace=0&gcmcontinue="+ next + "&continue=&callback=?";
        console.log(urlContinue);
        $('div#loadmoreajaxloader').show();
        $.ajax({
        url: urlContinue ,
        dataType: "json",

        success: function(data)
        {   


            if(data)
            {
           
           if(next != data.continue.gcmcontinue) {
          
           next =  data.continue.gcmcontinue;
               
               $.each(data.query.pages, function(i, item) {
               console.log(item.pageid);
               content = item.extract;
               pageId = item.pageid;
               pageTitle = item.title;
               colum = "post" + pageId;

               $("#feed").append("<div id = "+colum+">");
               $("#"+colum).append("<h1>"+item.title +"</h1>");
               $("#"+colum).append( "<p>" + content + "</p>");
               
               $("#feed").append("</div>");
               fetchImage(pageId);
              });
                
               $('div#loadmoreajaxloader').hide();
              }
            
            } 

            else
              {
                
                $('div#loadmoreajaxloader').html('<center>No more posts to show.</center>');
            }
        }
        });
    }
});
     
   