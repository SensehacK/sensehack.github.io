 /* <!-- 
//     Integrating Trakt Movies & TMDB  api for history by Sensehack.
-->
 */

 var movieImgsPath = [];
 var movieIDsPath = [];
 var movieTitleArr = [];
 var movieYearArr = [];
 var outputMovieStrNo = 1;
 var movieTitleStrNo = 1;
 var movieYearStrNo = 1;

 movieTrakt();

 function movieTrakt() {
     var request = new XMLHttpRequest();
     var getRecentMoviesHistory = "https://api.trakt.tv/users/sensehack/history/movies/";

     // call url
     request.open('GET', getRecentMoviesHistory);
     request.setRequestHeader('Content-Type', 'application/json');
     request.setRequestHeader('trakt-api-version', '2');

     // Production Environment API Key
     request.setRequestHeader('trakt-api-key',
         'e76f84733301c6380989637d3c7cc0394f58ae5046b94649d9d65f18e31e43fa');

     // Client ID of Trial 2 cors.io
     // request.setRequestHeader('trakt-api-key',
     //     'e76f84733301c6380989637d3c7cc0394f58ae5046b94649d9d65f18e31e43fa');

     // Dev Environment API Key
     // request.setRequestHeader('trakt-api-key',
     //     'de642baa61a382542ab1e01881f35b4f2da090547b1afcc6d645ffeda6f69db1');

     request.onreadystatechange = function () {

         if (this.readyState === 4) {
             //Converting responseText String JSON to Javascript Object JSON.
             var traktJSON = this.responseText;
             var movieIDTr = "";
             var traktObj = JSON.parse(traktJSON);

             //Accessing 8 json elements overall
             for (var i = 0; i < 8; i++) {
                 // Accessing movie title
                 var movieTitle = traktObj[i].movie.title;

                 // Accessing movie title
                 var movieYear = traktObj[i].movie.year;

                 // Accessing movie title
                 var movieTmdbId = traktObj[i].movie.ids.tmdb;
                 movieIDTr = movieTmdbId;

                 // Storing movie ID's in array
                 movieIDsPath.push(movieIDTr);
                 movieTitleArr.push(movieTitle);
                 movieYearArr.push(movieYear);

                 // Calling the function with user Movie ID
                 UserAction(movieIDTr, movieTitle, movieYear);
             }

             //You can call whatever you want after the function of API Movie Details & Movie Images are retrieved. 
             // After this stage the synchronous dependency of Movie images & text is already done.
             // Display Movie Text
             displayMovieDetails();
         }
     };
     request.send();

 }

 function UserAction(movieIDT, mTitle, mYear) {

     // Variables 
     var urlTMDB = "https://api.themoviedb.org/3/movie/";
     var movieID = movieIDT;
     var apiKeyTMDB = "?api_key=eab66c078f08232f3a3dec068c6a14d3";
     var langTMDB = "&language=en-US";
     //  var fullUrlTMDB ="https://api.themoviedb.org/3/movie/100402?api_key=eab66c078f08232f3a3dec068c6a14d3&language=en-US";

     var concatTmdbMovieURL = urlTMDB + movieID + apiKeyTMDB + langTMDB;

     // Last FM API Integration Testing
     fetch(concatTmdbMovieURL)
         .then(function (response) {
             return response.json();
         })
         .then(function (jsonResponse) {
             var poster = jsonResponse.poster_path;
             var imageTMDB = "https://image.tmdb.org/t/p/w342/";
             var fullImageTMDB = imageTMDB + poster;

             //Adding image paths to the array
             movieImgsPath.push(fullImageTMDB);

             //Testing Timeout parameter for calling image resources
             setTimeout(function () {
                 singleImageDisplay(fullImageTMDB);
             }, 800);

             // Important Calling individual function image paths urls from TMDB
             // singleImageDisplay(fullImageTMDB)

         });
 }


 function singleImageDisplay(imgPath) {
     var outputStr = "moviePoster";
     //moviePosterBImage
    //  var moviePosterBImgStr = "moviePosterBImage";

     // Setting movie Poster images Div tag + number.
     outputStr = outputStr + outputMovieStrNo;
    //  moviePosterBImgStr = moviePosterBImgStr + outputMovieStrNo;

     // Incrementing the html tag ID string value
     outputMovieStrNo = (outputMovieStrNo + 1);

	 //Setting the div tag of moviePoster accordingly.
	 if (!imgPath.includes("null"))
     document.getElementById(outputStr).src = imgPath;
    //  document.getElementById(moviePosterBImgStr).src = imgPath;
 }


 function displayMovieDetails() {
     for (i = 0; i < 8; i++) {

         var movieTitleStr = "movieTitle";
         var movieYearStr = "movieYear";

         movieTitleStr = movieTitleStr + movieTitleStrNo;
         movieYearStr = movieYearStr + movieYearStrNo;

         //Actual Movie Details
         document.getElementById(movieYearStr).innerHTML = movieYearArr[i];
         document.getElementById(movieTitleStr).innerHTML = movieTitleArr[i];

         // Incrementing the html tag ID string value
         movieTitleStrNo = (movieTitleStrNo + 1);
         movieYearStrNo = (movieYearStrNo + 1);

     }
     // You can call whatever you want after the function of API Movie Details & Movie Images are retrieved. 
     // After this stage the synchronous dependency of Movie images & text is already done.
     // Display TV shows Text

     // setTimeout(function ()

     //     {
     //         //  console.log("SET TIMEOUT")
     //         //  console.log("Delay by 1 secs")
     //         showTrakt()
     //     }, 2000);

 }