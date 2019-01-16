 /* <!-- 
    Integrating Trakt TV Show & TMDB  api for history by Sensehack.
-->
 */



 var showImgsPath = []
 var showIDsPath = []
 var showTitleArr = []
 var showEpTitleArr = []

 var outputTVStrNo = 1;
 var showTitleStrNo = 1;
 var showEpTitleStrNo = 1;

 //Default Calling function for Trakt TV shows.
 showTrakt()

 // Display TV shows Text with timeout.

 // setTimeout(function ()

 //         {
 //             console.log("SET TVShow TIMEOUT")
 //             console.log("Delay by 2 secs")
 //             showTrakt()
 //         }, 2000);

 function showTrakt() {
     console.log("SET function showTrakt() T")
     var request = new XMLHttpRequest();

     var getRecentShowsHistory = "https://api.trakt.tv/users/sensehack/history/shows/"

     var getRecentshowsHistory = "https://api.trakt.tv/users/sensehack/history/shows/"

     // call url
     request.open('GET', getRecentShowsHistory);


     request.setRequestHeader('Content-Type', 'application/json');
     request.setRequestHeader('trakt-api-version', '2');

     // Client ID of Trial 2 cors.io
     request.setRequestHeader('trakt-api-key',
         'e76f84733301c6380989637d3c7cc0394f58ae5046b94649d9d65f18e31e43fa');


     request.onreadystatechange = function () {

         if (this.readyState === 4) {
             console.log('Status:', this.status);
             console.log('Headers:', this.getAllResponseHeaders());
             console.log('Body:', this.responseText);


             //Converting responseText String JSON to Javascript Object JSON.
             var traktJSON = this.responseText;
             var showIDTr = ""
             var traktObj = JSON.parse(traktJSON)


             //Accessing 8 json elements overall
             for (var i = 0; i < 8; i++) {
                 console.log("Printing iteration number", i)

                 // Trying to access show titles & EpTitle details  
                 console.log("traktObj[i].id")
                 console.log(traktObj[i].id)

                 // Accessing show title
                 var showTitle = traktObj[i].show.title
                 console.log("accessing show title")
                 console.log(showTitle)

                 // Accessing show episode title
                 var showEpTitle = traktObj[i].episode.title
                 console.log("accessing show EpTitle")
                 console.log(showEpTitle)

                 // Accessing show title
                 console.log("accessing .traktObj[i].show.id.tmdb")
                 var showTmdbId = traktObj[i].show.ids.tmdb
                 console.log(showTmdbId)
                 showIDTr = showTmdbId

                 // Storing show ID's in array
                 showIDsPath.push(showIDTr)
                 showTitleArr.push(showTitle)
                 showEpTitleArr.push(showEpTitle)


                 // Calling the function with user show ID
                 UserActionTV(showIDTr, showTitle, showEpTitle)
             }

             console.log("showIDsPathMediaStreamTrackEvent")
             console.log(showIDsPath)

             //You can call whatever you want after the function of API show Details & show Images are retrieved. 
             // After this stage the synchronous dependency of show images & text is already done.
             // Display show Text
             displayshowDetailsTV()

         }

     };

     request.send();

 }

 function UserActionTV(showIDT, mTitle, mEpTitle) {

     // Variables 
     var urlTMDB = "https://api.themoviedb.org/3/tv/"
     var showID = showIDT;
     var apiKeyTMDB = "?api_key=eab66c078f08232f3a3dec068c6a14d3";
     var langTMDB = "&language=en-US";
     var fullUrlTMDB =
         "https://api.themoviedb.org/3/tv/60573?api_key=eab66c078f08232f3a3dec068c6a14d3&language=en-US";
     var showTitle = mTitle;
     var showEpTitle = mEpTitle;

     console.log(showTitle)
     console.log(showEpTitle)

     var concatTmdbshowURL = urlTMDB + showID + apiKeyTMDB + langTMDB
     console.log("concatTmdbshowURL urlTMDB + showID + apiKeyTMDB + langTMDB")
     console.log(concatTmdbshowURL)
     console.log("showIDT")
     console.log(showIDT)

     // Last FM API Integration Testing
     fetch(concatTmdbshowURL)
         .then(function (response) {
             return response.json();
         })
         .then(function (jsonResponse) {

             console.log(jsonResponse)
             console.log("type of jsonresponse")
             console.log(typeof (jsonResponse))


             var posterTV = jsonResponse.poster_path
             console.log("printing jsonResponse.poster_path")
             console.log(jsonResponse.poster_path)
             var imageTMDBTV = "https://image.tmdb.org/t/p/w342/"
             var fullImageTMDBTV = imageTMDBTV + posterTV
             console.log("fullImageTMDB imageTMDB + poster")
             console.log(fullImageTMDBTV)

             //Adding image paths to the array
             showImgsPath.push(fullImageTMDBTV)
             console.log("printing in fetch method")
             console.log(showTitle)
             console.log(showEpTitle)

             //Testing Timeout parameter for calling image resources
             setTimeout(function ()

                 {
                     console.log("SET TIMEOUT")
                     console.log("Delay by 1 secs")
                     singleImageDisplayTV(fullImageTMDBTV)
                 }, 2000);


             // Old & working just images not appearing properly in order.
             //Calling individual function image paths urls from TMDB
             // singleImageDisplayTV(fullImageTMDBTV)



         })

 }


 function singleImageDisplayTV(imgPath) {
     var outputStr = "tvShowPoster"
     var tvShowBPosterStr = "tvShowBPoster"
     // Displaying 8 last watch shows images
     console.log("imageDisplay2(imgPath")
     console.log(imgPath)

     console.log(outputStr)
     outputStr = outputStr + outputTVStrNo;
     tvShowBPosterStr = tvShowBPosterStr + outputTVStrNo;

     console.log("tvShowPoster = tvShowPoster + tvShowPoster;")
     console.log(outputStr)
     console.log(tvShowBPosterStr)

     // Incrementing the html tag ID string value
     outputTVStrNo = (outputTVStrNo + 1)
     console.log("tvShowPoster = (tvShowPoster + 1)")
     console.log(outputTVStrNo)

     document.getElementById(outputStr).src = imgPath;
     document.getElementById(tvShowBPosterStr).src = imgPath;

 }

 function fullImageDisplayTV() {
     var outputStrb = "tvShowPoster"

     // Displaying 8 last watch shows images
     console.log("fullImageDisplayTV imageDisplay2(imgPath")


     for (i = 0; i < showImgsPath.count; i++) {
         var imgPath = showImgsPath[i];
         outputStrb = outputStrb + (i + 1);
         console.log("tvShowPoster #############@#@#@##@= tvShowPoster + tvShowPoster;")
         console.log(outputStrb)
         console.log(imgPath)

         document.getElementById(outputStr).src = imgPath;

     }

 }


 function displayshowDetailsTV() {
     for (i = 0; i < 8; i++) {

         var showTitleStr = "showTitle"
         var showEpTitleStr = "showEpTitle"

         showTitleStr = showTitleStr + showTitleStrNo
         showEpTitleStr = showEpTitleStr + showEpTitleStrNo

         console.log("showTitleStr")
         console.log(showTitleStr)
         console.log("showEpTitleStr")
         console.log(showEpTitleStr)

         console.log("showTitleArr[i]")
         console.log(showTitleArr[i])
         console.log("showEpTitleArr[i]")
         console.log(showEpTitleArr[i])

         console.log(typeof (showTitleArr[i]))
         console.log(typeof (showEpTitleArr[i]))
         console.log(typeof (String(showEpTitleArr[i])))

         console.log(typeof (showTitleStr))
         console.log(typeof (showEpTitleStr))

         //Actual show Details
         document.getElementById(showEpTitleStr).innerHTML = showEpTitleArr[i];
         document.getElementById(showTitleStr).innerHTML = showTitleArr[i];

         // Incrementing the html tag ID string value
         console.log("// Incrementing the html tag ID string value")
         showTitleStrNo = (showTitleStrNo + 1)
         showEpTitleStrNo = (showEpTitleStrNo + 1)

     }
 }

 // onload = reloadPage();

 function reloadPage() {
     // Trying the webpage reload again.
     console.log("reloading the page")
     if (!window.location.hash) {
         console.log("in the if condition for reload page")
         window.location = window.location + '#sensehack';
         //Reinitiating the variables to 1.
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
     console.log("reloaded the command page")

 }