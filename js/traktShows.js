var movieImgsPath = []
var movieIDsPath = []
var movieTitleArr = []
var movieYearArr = []

var outputStrNo = 1;
var movieTitleStrNo = 1;
var movieYearStrNo = 1;

movieTrakt()

function movieTrakt() {
    var request = new XMLHttpRequest();

    var getRecentShowsHistory = "https://api.trakt.tv/users/sensehack/history/shows/"

    var getRecentMoviesHistory = "https://api.trakt.tv/users/sensehack/history/movies/"

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
            var movieIDTr = ""
            var traktObj = JSON.parse(traktJSON)


            //Accessing 8 json elements overall
            for (var i = 0; i < 8; i++) {
                console.log("Printing iteration number", i)

                // Trying to access movie titles & year details  
                console.log("traktObj[i].id")
                console.log(traktObj[i].id)

                // Accessing movie title
                var movieTitle = traktObj[i].movie.title
                console.log("accessing movie title")
                console.log(movieTitle)

                // Accessing movie title
                var movieYear = traktObj[i].movie.year
                console.log("accessing movie year")
                console.log(movieYear)

                // Accessing movie title
                console.log("accessing .traktObj[i].movie.id.tmdb")
                var movieTmdbId = traktObj[i].movie.ids.tmdb
                console.log(movieTmdbId)
                movieIDTr = movieTmdbId

                // Storing movie ID's in array
                movieIDsPath.push(movieIDTr)
                movieTitleArr.push(movieTitle)
                movieYearArr.push(movieYear)


                // Calling the function with user Movie ID
                UserAction(movieIDTr, movieTitle, movieYear)
            }

            console.log("movieIDsPathMediaStreamTrackEvent")
            console.log(movieIDsPath)

            //You can call whatever you want after the function of API Movie Details & Movie Images are retrieved. 
            // After this stage the synchronous dependency of Movie images & text is already done.
            // Display Movie Text
            displayMovieDetails()

        }

    };

    request.send();

}

function UserAction(movieIDT, mTitle, mYear) {

    // Variables 
    var urlTMDB = "https://api.themoviedb.org/3/movie/"
    var movieID = movieIDT;
    var apiKeyTMDB = "?api_key=eab66c078f08232f3a3dec068c6a14d3";
    var langTMDB = "&language=en-US";
    var fullUrlTMDB =
        "https://api.themoviedb.org/3/movie/100402?api_key=eab66c078f08232f3a3dec068c6a14d3&language=en-US";
    var movieTitle = mTitle;
    var movieYear = mYear;

    console.log(movieTitle)
    console.log(movieYear)

    var concatTmdbMovieURL = urlTMDB + movieID + apiKeyTMDB + langTMDB
    console.log("concatTmdbMovieURL urlTMDB + movieID + apiKeyTMDB + langTMDB")
    console.log(concatTmdbMovieURL)
    console.log("movieIDT")
    console.log(movieIDT)

    // Last FM API Integration Testing
    fetch(concatTmdbMovieURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonResponse) {

            console.log(jsonResponse)
            console.log("type of jsonresponse")
            console.log(typeof (jsonResponse))


            var poster = jsonResponse.poster_path
            console.log("printing jsonResponse.poster_path")
            console.log(jsonResponse.poster_path)
            var imageTMDB = "https://image.tmdb.org/t/p/w342/"
            var fullImageTMDB = imageTMDB + poster
            console.log("fullImageTMDB imageTMDB + poster")
            console.log(fullImageTMDB)

            //Adding image paths to the array
            movieImgsPath.push(fullImageTMDB)
            console.log("printing in fetch method")
            console.log(movieTitle)
            console.log(movieYear)

            //Testing Timeout parameter for calling image resources
            setTimeout(function ()

                {
                    console.log("SET TIMEOUT")
                    console.log("Delay by 1 secs")
                    singleImageDisplay(fullImageTMDB);
                }, 800);


            // Important Calling individual function image paths urls from TMDB
            // singleImageDisplay(fullImageTMDB)



        })

}


function singleImageDisplay(imgPath) {
    var outputStr = "moviePoster"

    // Displaying 8 last watch movies images
    console.log("imageDisplay2(imgPath")
    console.log(imgPath)

    console.log(outputStr)
    outputStr = outputStr + outputStrNo;

    console.log("outputStr = outputStr + outputStrNo;")
    console.log(outputStr)

    // Incrementing the html tag ID string value
    outputStrNo = (outputStrNo + 1)
    console.log("outputStrNo = (outputStrNo + 1)")
    console.log(outputStrNo)

    document.getElementById(outputStr).src = imgPath;

}




function displayMovieDetails() {
    for (i = 0; i < 8; i++) {

        var movieTitleStr = "movieTitle"
        var movieYearStr = "movieYear"

        movieTitleStr = movieTitleStr + movieTitleStrNo
        movieYearStr = movieYearStr + movieYearStrNo

        console.log("movieTitleStr")
        console.log(movieTitleStr)
        console.log("movieYearStr")
        console.log(movieYearStr)

        console.log("movieTitleArr[i]")
        console.log(movieTitleArr[i])
        console.log("movieYearArr[i]")
        console.log(movieYearArr[i])

        console.log(typeof (movieTitleArr[i]))
        console.log(typeof (movieYearArr[i]))
        console.log(typeof (String(movieYearArr[i])))

        console.log(typeof (movieTitleStr))
        console.log(typeof (movieYearStr))

        //Actual Movie Details
        document.getElementById(movieYearStr).innerHTML = movieYearArr[i];
        document.getElementById(movieTitleStr).innerHTML = movieTitleArr[i];

        // Incrementing the html tag ID string value
        console.log("// Incrementing the html tag ID string value")
        movieTitleStrNo = (movieTitleStrNo + 1)
        movieYearStrNo = (movieYearStrNo + 1)

    }



}