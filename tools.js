const request = require('request');
const mysql = require('mysql');
module.exports = {

    // Return random image urls from an API
    // param string keyword - search term
    // param int    imageCount - number of random images
    // return array of image URLs
    getRandomImages_cb: function (keyword, imageCount, callback) {
        var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=38f5c9e645d4339173db6fd3447ba851c5b895ea8c0dd39f1ab88a1dcef67dec";
        request(requestURL, function (error, response, body) {
    
            if (!error) {
                var parsedData = JSON.parse(body);
                // console.log("image url:", parseData["urls"]["regular"]);
                var imageURLs = [];
                for (let i = 0; i < 9; i++) {
                    imageURLs.push(parsedData[i].urls.regular);
                }
                //console.log(imageURLs);
                //return imageURLs;
                callback(imageURLs);
                
            } else {
                //res.render("results", {"error":"Unable to access API"})
                console.log("error", error);
            }
            
        });
    },
    
    
    // Return random image urls from an API
    // param string keyword - search term
    // param int    imageCount - number of random images
    // return array of image URLs
    getRandomImages: function (keyword, imageCount, callback) {
        var requestURL = "https://api.unsplash.com/photos/random?query="+keyword+"&count="+imageCount+"&client_id=38f5c9e645d4339173db6fd3447ba851c5b895ea8c0dd39f1ab88a1dcef67dec";
        
        return new Promise(function(resolve, reject){
            request(requestURL, function (error, response, body) {
    
                if (!error) {
                    var parsedData = JSON.parse(body);
                    // console.log("image url:", parseData["urls"]["regular"]);
                    var imageURLs = [];
                    for (let i = 0; i < imageCount; i++) {
                        imageURLs.push(parsedData[i].urls.regular);
                    }
                    //console.log(imageURLs);
                    //return imageURLs;
                    resolve(imageURLs);
                    
                } else {
                    //res.render("results", {"error":"Unable to access API"})
                    console.log("error", error);
                }
            
            });
        });
    },
    
    // creates database connection 
    // return database connection
    createConnection: function(){
        var conn = mysql.createConnection({
        host: "cst336db.space",
        user: "cst336_dbUser028",
        password: "v8hdke",
        database: "cst336_db028"
    });
    return conn;
    
    }

}