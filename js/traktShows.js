 /* <!--
    Integrating Trakt TV Show & TMDB  api for history by Sensehack.
-->
 */

 var showImgsPath = [];
 var showIDsPath = [];
 var showTitleArr = [];
 var showEpTitleArr = [];

 var outputTVStrNo = 1;
 var showTitleStrNo = 1;
 var showEpTitleStrNo = 1;

 //Default Calling function for Trakt TV shows.
 showTrakt();

 // Display TV shows Text with timeout.
 // setTimeout(function ()
 //         {
 //             //  console.log("SET TVShow TIMEOUT")
 //             //  console.log("Delay by 2 secs")
 //             showTrakt()
 //         }, 2000);

 function showTrakt() {

     var request = new XMLHttpRequest();
     var getRecentShowsHistory = "https://api.trakt.tv/users/sensehack/history/shows/";

     // call url
     request.open('GET', getRecentShowsHistory);
     request.setRequestHeader('Content-Type', 'application/json');
     request.setRequestHeader('trakt-api-version', '2');

     // Client ID of Trial 2 cors.io
     request.setRequestHeader('trakt-api-key',
         'e76f84733301c6380989637d3c7cc0394f58ae5046b94649d9d65f18e31e43fa');

     request.onreadystatechange = function () {
         if (this.readyState === 4) {
             //Converting responseText String JSON to Javascript Object JSON.
             var traktJSON = this.responseText;
             var showIDTr = "";
             var traktObj = JSON.parse(traktJSON);

             //Accessing 8 json elements overall
             for (var i = 0; i < 8; i++) {
                 // Accessing show title
                 var showTitle = traktObj[i].show.title;

                 // Accessing show episode title
                 var showEpTitle = traktObj[i].episode.title;

                 // Accessing show title
                 var showTmdbId = traktObj[i].show.ids.tmdb;
                 showIDTr = showTmdbId;

                 // Storing show ID's in array
                 showIDsPath.push(showIDTr);
                 showTitleArr.push(showTitle);
                 showEpTitleArr.push(showEpTitle);

                 // Calling the function with user show ID
                 UserActionTV(showIDTr, showTitle, showEpTitle);
             }

             //You can call whatever you want after the function of API show Details & show Images are retrieved.
             // After this stage the synchronous dependency of show images & text is already done.
             // Display show Text
             displayshowDetailsTV();
         }
     };
     request.send();
 }


 function UserActionTV(showIDT, mTitle, mEpTitle) {

     // Variables 
     var urlTMDB = "https://api.themoviedb.org/3/tv/";
     var showID = showIDT;
     var apiKeyTMDB = "?api_key=eab66c078f08232f3a3dec068c6a14d3";
     var langTMDB = "&language=en-US";
     //  var fullUrlTMDB ="https://api.themoviedb.org/3/tv/60573?api_key=eab66c078f08232f3a3dec068c6a14d3&language=en-US";

     var concatTmdbshowURL = urlTMDB + showID + apiKeyTMDB + langTMDB;

     // Last FM API Integration Testing
     fetch(concatTmdbshowURL)
         .then(function (response) {
             return response.json();
         })
         .then(function (jsonResponse) {
             var posterTV = jsonResponse.poster_path;
             var imageTMDBTV = "https://image.tmdb.org/t/p/w342/";
             var fullImageTMDBTV = imageTMDBTV + posterTV;

             //Adding image paths to the array
             showImgsPath.push(fullImageTMDBTV);

             //Testing Timeout parameter for calling image resources
             setTimeout(function () {
                 singleImageDisplayTV(fullImageTMDBTV);
             }, 2000);

             // Old & working just images not appearing properly in order.
             //Calling individual function image paths urls from TMDB
             // singleImageDisplayTV(fullImageTMDBTV)
         });
 }


 function singleImageDisplayTV(imgPath) {
     var outputStr = "tvShowPoster";
    //  var tvShowBPosterStr = "tvShowBPoster";
     outputStr = outputStr + outputTVStrNo;
    //  tvShowBPosterStr = tvShowBPosterStr + outputTVStrNo;

     // Incrementing the html tag ID string value
     outputTVStrNo = (outputTVStrNo + 1);

     //Setting the div tag of moviePoster accordingly.
    if (!imgPath.includes("null"))
     document.getElementById(outputStr).src = imgPath;
    //  document.getElementById(tvShowBPosterStr).src = imgPath;
 }

 function fullImageDisplayTV() {
     var outputStrb = "tvShowPoster";

     // Displaying 8 last watch shows images
     for (i = 0; i < showImgsPath.count; i++) {
         var imgPath = showImgsPath[i];
         outputStrb = outputStrb + (i + 1);
         document.getElementById(outputStr).src = imgPath;
     }

 }


 function displayshowDetailsTV() {
     for (i = 0; i < 8; i++) {
         var showTitleStr = "showTitle";
         var showEpTitleStr = "showEpTitle";
         showTitleStr = showTitleStr + showTitleStrNo;
         showEpTitleStr = showEpTitleStr + showEpTitleStrNo;

         //Actual show Details
         document.getElementById(showEpTitleStr).innerHTML = showEpTitleArr[i];
         document.getElementById(showTitleStr).innerHTML = showTitleArr[i];

         // Incrementing the html tag ID string value
         showTitleStrNo = (showTitleStrNo + 1);
         showEpTitleStrNo = (showEpTitleStrNo + 1);

     }
 }

 // onload = reloadPage();

 function reloadPage() {
     // Trying the webpage reload again.
     //  console.log("reloading the page")
     if (!window.location.hash) {
         //  console.log("in the if condition for reload page")
         window.location = window.location + '#sensehack';
         //Re initiating the variables to 1.
         outputTVStrNo = 1;
         showTitleStrNo = 1;
         showEpTitleStrNo = 1;

         //Calling function once again to Make sure image cached are also reused overall.
         //Which leads to using the cache images synchronously in one order & text + images are in sync.
         window.location.reload(false);

         // Still as a third backup plan I tried calling fullImageDisplayTV() function but maybe it doesnt work like that.
         // showTrakt();
     }
     // location.reload(false);
     // fullImageDisplayTV();
     //  console.log("reloaded the command page")
 }