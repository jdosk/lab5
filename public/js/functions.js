$(document).ready(function(){
   $(".favoriteIcon").on("click", function(){
       //alert($(this).prev().attr("src"));
       
       var imageURL = $(this).prev().attr("src");
       
       if($(this).attr("src") == "img/favorite.png"){
           $(this).attr("src", "img/favorite_on.png");
           updateFavorite("add", imageURL); // inserts a new record
       } else {
           $(this).attr("src", "img/favorite.png");
           updateFavorite("delete", imageURL); // deletes a record
       }
   });
   
   $(".keywordLink").on("click", function(){
       
       //alert($(this).text().trim());
       $.ajax({
           method: "get",
           url: "/api/displayFavorites",
           data: {
                  "keyword" : $(this).text().trim()
                 },
           success: function(rows, status){
                $("#favorites").html("");
                rows.forEach(function(row){
                    $("#favorites").append("<img src='" + row.imageURL + "' class='image' width='200' height='200'>");
                    $("#favorites").append("<img class='favoriteIcon' src='img/favorite_on.png' width='20' height='20'>");
                    
                    $(".favoriteIcon").on("click", function(){
       
                        var imageURL = $(this).prev().attr("src");

                        if($(this).attr("src") == "img/favorite.png"){
                            $(this).attr("src", "img/favorite_on.png");
                            updateFavorite("add", imageURL); // inserts a new record
                        } else {
                            $(this).attr("src", "img/favorite.png");
                            updateFavorite("delete", imageURL); // deletes a record
                        }
                    });
                });
            }
       });       
   });
   
   function updateFavorite(action, imageURL){
       
       $.ajax({
           method: "get",
           url: "/api/updateFavorites",
           data: {"imageURL" : imageURL,
                  "keyword" : $("#keyword").val(),
                  "action" : action
                 }
       });
   }
});
