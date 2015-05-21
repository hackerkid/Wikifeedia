  
  var category_of_page = "featured_articles";
  if(typeof getUrlVars()["category"] !== 'undefined') {
    category_of_page = getUrlVars()["category"];
  }
 
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
          catId = "cat" + pageId;

          $("#feed").append("<div id = "+colum+">");

          $("#"+colum).append("<h2>"+item.title +"</h2>");
          $("#"+colum).append("<div id = " + catId + "> </div><br>");


          $("#"+colum).append("<p>" + content + "</p>");

          $("#feed").append("</div><hr><br>");
          fetchCat(pageId);
          fetchImage(pageId);
        });

        $("#search_input").keyup(function()
        {
          var search_input = $(this).val();
          console.log(search_input);
          category_of_page = search_input;
          $("#feed").html("");
          loadStartIndex();
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
    //  
      loadStartIndex();
    
    });

   
    
   $(window).scroll(function()
    {
      
    if($(window).scrollTop() == $(document).height() - $(window).height())
    {    
        data = 0;      
         urlContinue = "http://en.wikipedia.org/w/api.php?format=json&action=query&list=random&generator=categorymembers&gcmtitle=Category:"+category_of_page+"&prop=info&prop=extracts&exintro=&explaintext&exlimit=max&continue=gcmcontinue||random&rnlimit=10&rnnamespace=0&gcmcontinue="+ next + "&continue=&callback=?";

        $('div#loadmoreajaxloader').show();
        $.ajax({
        url: urlContinue ,
        dataType: "json",

        success: function(data)
        {   


            if(data)
            {
               $.each(data.query.pages, function(i, item) {
               content = item.extract;
               pageId = item.pageid;
               pageTitle = item.title;
               catId = "cat" + pageId;

               colum = "post" + pageId;
               pageurl = "rest/?title=" + pageTitle;

               $("#feed").append("<div id = "+colum+">");

               $("#"+colum).append("<h1>"+item.title +"</h1>");
               $("#"+colum).append("<div id = " + catId + "> </div><br>");

               $("#"+colum).append( "<p>" + content + "</p>");
               
               $("#feed").append("</div><hr><br>");
               fetchCat(pageId);
               fetchImage(pageId);
              });
                
                $('div#loadmoreajaxloader').hide();
            } 

            else
              {
                
                $('div#loadmoreajaxloader').html('<center>No more posts to show.</center>');
            }
        }
        });
    }
});

 function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

function fetchCat(pageId) {

    ul = "https://en.wikipedia.org/w/api.php?action=query&format=json&grnlimit=max&exlimit=max&prop=categories&pageids="+pageId+"&continue=&callback=?"
    
    
    $.getJSON(ul, function(data) {
          $.each(data.query.pages, function(i, item) {
            k = 0;
            $.each(item.categories, function(j, cat) {
              catId = "cat" + pageId;
              catile = cat.title;
              catile = catile.replace("Category:", "");
              if((catile.match(/articles/g) || []).length == 0 && (catile.match(/Articles/g) || []).length == 0 && (catile.match(/Pages/g ) || []).length == 0 && (catile.match(/Article/g) || []).length == 0 && (catile.match(/category/g) || []).length == 0 && (catile.match(/pages/g) || []).length == 0 && k <5 ) {
                k++;  
                $("#"+catId).append("<span id = 'category'>" + catile +" </span>");

              }

            });
          
          });
      });

  }




        