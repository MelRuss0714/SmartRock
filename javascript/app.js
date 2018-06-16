$(document).ready(function () {
    var searchCount = -1;
    var band = "";
    var imgUrl = "";


    //Api searches from album cover on clicks 
    $("body").on("click", ".mcs-item", function () {
        searchCount++;
        var position = searchCount;

        //Empty all divs of past searches
        $('#upcomingEvents_result').empty();
        $('#topsong_result').empty();

        //Picks out which album was clicked on and finds the matching band by converting the data-item value into the number after the img id
        position = $(this).attr("data-item");
        band = $("#img" + position).attr("data-band");

        //Api searches based on band name from data-band attribute based on the album that was clicked on

        //Query Ticketmaster
        var queryTicketmaster = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + band + "&apikey=4IHM5zA4CzxsrfUN2mAI2jJnITAp0Kai";
        $.ajax({
            url: queryTicketmaster,
            method: "GET"
        }).then(function (events) {
            var resultTicketmaster = events._embedded.events;

            //Write upcoming shows from Ticketmaster

            for (var i = 0; i < 5; i++) {
                var showDiv = $("<table id='tbody2'>");
                $("#tbody2").append("<tr><th scope='row'>" + resultTicketmaster[i].name +
                    " </th><td> " + resultTicketmaster[i].dates.start.localTime + " </td><td> "
                    + resultTicketmaster[i].dates.start.localDate + " </td><td> "
                    + resultTicketmaster[i]._embedded.venues[0].name + " </td><td> "
                    + resultTicketmaster[i]._embedded.venues[0].city.name + " </td></tr>");

                $("#upcomingEvents_result").prepend(showDiv);
            }
        });

        //Query Last FM
        var queryLastFM = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + band + "&api_key=ae763900e0fbaf933486df8e2d16cb4d&format=json";
        $.ajax({
            url: queryLastFM,
            method: "GET"
        }).then(function (toptracks) {
            var resultLastFM = toptracks.toptracks.track
            var songDiv = $("<table id='tbody1'>");
            $("#tbody1").append("<tr><td> 1. </td><td><a href='" + resultLastFM[0].url + "'>" + resultLastFM[0].name + "</td></a></tr>");
            $("#topsong_result").append(songDiv);

            //Writes top tracks from Last FM
            for (var j = 0; j < 10; j++) {
                

                $("#tbody1").append("<tr><td>" + (j + 1) + ". </td><td><a href='" + resultLastFM[j].url + "'>" + resultLastFM[j].name + "</td></a></tr>");
                $("#topsong_result").append(songDiv);

            }

        });

        var queryYoutube = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + band + "&php&key=AIzaSyDXKhlYb7JKIJJ1ruJSF8wVa0hO11mI9Ao";
        $.ajax({
            url: queryYoutube,
            method: "GET"
        }).then(function (response) {
            var resultYoutube = response.items[0].id.videoId;
            $("#ytplayer").attr("src", "https://www.youtube.com/embed/" + resultYoutube);


        });

        var queryAlbum = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + band + "&api_key=ae763900e0fbaf933486df8e2d16cb4d&format=json";
        $.ajax({
            url: queryAlbum,
            method: "GET"
        }).then(function (albums) {
            imgUrl = albums.topalbums.album[0].image[3]["#text"];
            console.log(imgUrl);
        $("#img" + position).attr("src", imgUrl);
        $("#img" + position).attr("data-band", band);
        });


        //Activate link to ticketmaster for specific artist

        $("#ticket").attr("href", "https://www.ticketmaster.com/search?tm_link=tm_homeA_header_search&user_input=" + band + "&q=" + band);


        //Activate link to merchandise amazon for specific artist


        $("#merch").attr("href", "https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=" + band + "");

        

    });


    //Capture input from input bar
    $("#search").on("click", function (event) {


        searchCount++;
        var position = searchCount;

        // event.preventDefault() prevents the form from trying to submit itself.
        // We're using a form so that the user can hit enter instead of clicking the button if they want
        event.preventDefault();
        $('#upcomingEvents_result').empty();
        $('#topsong_result').empty();


        // This line will grab the text from the input box

        band = $("#searchTerm").val().trim();

        //Api searches based on input from input bar
        var queryTicketmaster = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + band + "&apikey=4IHM5zA4CzxsrfUN2mAI2jJnITAp0Kai";
        $.ajax({
            url: queryTicketmaster,
            method: "GET"
        }).then(function (events) {
            var resultTicketmaster = events._embedded.events;

            //Write upcoming shows from Songkick

            for (var i = 0; i < 5; i++) {
                var showDiv = $("<table id='tbody2'>");
                $("#tbody2").append("<tr><th scope='row'>" + resultTicketmaster[i].name +
                    " </th><td> " + resultTicketmaster[i].dates.start.localTime + " </td><td> "
                    + resultTicketmaster[i].dates.start.localDate + " </td><td> "
                    + resultTicketmaster[i]._embedded.venues[0].name + " </td><td> "
                    + resultTicketmaster[i]._embedded.venues[0].city.name + " </td></tr>");

                $("#upcomingEvents_result").prepend(showDiv);
            }
        });
        var queryLastFM = "http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=" + band + "&api_key=ae763900e0fbaf933486df8e2d16cb4d&format=json";
        $.ajax({
            url: queryLastFM,
            method: "GET"
        }).then(function (toptracks) {
            var resultLastFM = toptracks.toptracks.track
            var songDiv = $("<table id='tbody1'>");
            $("#tbody1").append("<tr><td> 1. </td><td class='track' data-name='" + resultLastFM[0].name + "'>" + resultLastFM[0].name + "</td></tr>");
            $("#topsong_result").append(songDiv);

            //Writes top tracks from Last FM
            for (var j = 0; j < 10; j++) {


                $("#tbody1").append("<tr><td>" + (j + 1) + ". </td><td class='track' data-name='" + resultLastFM[j].name + "'>" + resultLastFM[j].name + "</td></tr>");
                $("#topsong_result").append(songDiv);

            }

        });
        var queryYoutube = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + band + "&php&key=AIzaSyDXKhlYb7JKIJJ1ruJSF8wVa0hO11mI9Ao";
        $.ajax({
            url: queryYoutube,
            method: "GET"
        }).then(function (response) {
            var resultYoutube = response.items[0].id.videoId;
            $("#ytplayer").attr("src", "https://www.youtube.com/embed/" + resultYoutube);


        });

        $("body").on("click", ".track", function () {
            var track = $(this).attr("data-name");

            var queryYoutube = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=" + track + "&php&key=AIzaSyDXKhlYb7JKIJJ1ruJSF8wVa0hO11mI9Ao";
            $.ajax({
                url: queryYoutube,
                method: "GET"
            }).then(function (response) {
                var resultYoutube = response.items[0].id.videoId;
                $("#ytplayer").attr("src", "https://www.youtube.com/embed/" + resultYoutube);


            });
        });

        var queryAlbum = "http://ws.audioscrobbler.com/2.0/?method=artist.gettopalbums&artist=" + band + "&api_key=ae763900e0fbaf933486df8e2d16cb4d&format=json";
        $.ajax({
            url: queryAlbum,
            method: "GET"
        }).then(function (albums) {
            imgUrl = albums.topalbums.album[0].image[3]["#text"];
            console.log(imgUrl);
        $("#img" + position).attr("src", imgUrl);
        $("#img" + position).attr("data-band", band);
        });

        //Activate link to ticketmaster for specific artist

        $("#ticket").attr("href", "https://www.ticketmaster.com/search?tm_link=tm_homeA_header_search&user_input=" + band + "&q=" + band);


        //Activate link to merchandise amazon for specific artist


        $("#merch").attr("href", "https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Daps&field-keywords=" + band + "");

        



    });





});