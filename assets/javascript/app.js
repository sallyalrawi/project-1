
  var config = {
    apiKey: "AIzaSyAdTL9AEZb28jI9h2vFCq6awHGkVToQNWw",
    authDomain: "team-awsome-b9873.firebaseapp.com",
    databaseURL: "https://team-awsome-b9873.firebaseio.com",
    projectId: "team-awsome-b9873",
    storageBucket: "",
    messagingSenderId: "855994626372"
  };
  firebase.initializeApp(config);



//cin4 key: AIzaSyC9wRterwbUeNH8vwmGo8VpKfTtb2Xc_Q8
var apiKey = 'AIzaSyDuFndi-7erqfvwZQupd9SVfnqlSQYQdXg'

$('#forms').on('submit', function() {
    event.preventDefault();
    showHeaders();
    getmoviePoster(getValue());
    getYoutubeTrailer(getValue());
    getYoutubeReview(getValue());
 });

 function showHeaders() {
    if ($('#trailer-head').hasClass('vid-header-none')) {
   $('.vid-header-none').addClass('vid-header-display')
   $('.vid-header-display').removeClass('vid-header-none')
    }
}

 
 
 function getValue() {
    if ($('#inputMovie').val() !== 'Enter Movie Title') {
      var movieTitle = $('#inputMovie').val();
    }
    return movieTitle
 }
 
 
 function getmoviePoster(movieTitle) {
    if (movieTitle !== undefined) {
    $.get(`https://www.omdbapi.com/?t=${movieTitle}&apikey=fcc96c64`,
    function(response) {
        console.log(response)
        $('#theImg').attr('src', response.Poster)
        if (response.Metascore !== undefined) {
        $('#scoreNum').text(`Rating: ${response.Metascore}`)
        };
    })
    };
 }
 
 
 
 var posterSource = getmoviePoster(getValue());
 
 
 /// The following are for youtube api
 
 ////////////////////////////////////////////////////
 //following are for youtube movie trailers
 function getYoutubeTrailer(movieTitle) {
    if (movieTitle !== undefined) {
        console.log(apiKey)
        jQuery.ajaxSetup({
            beforeSend: function() {
               $('#loader').show();
            },
            complete: function(){
               $('#loader').hide();
            },
            success: function() {}
          });   
    $.get(`https://www.googleapis.com/youtube/v3/search?maxResults=25&part=snippet&q=${movieTitle} trailer&key=${apiKey}`,
    function(response) {
        var idArray = [];
        response.items.forEach(function(cur) {
            idArray.push(cur.id.videoId);
        });
        function printVids(youtubeArray){
            console.log('akuna');
            return youtubeArray.map(function(cur, index) {
             $(`.iframe${index}`).attr('src', `https://www.youtube.com/embed/${cur}`)
         });
    }         printVids(idArray);
 });
    };
 };
 
 //////////////////////////////////////////////////////
 //Following is for youtube reviews
 
 function getYoutubeReview(movieTitle) {
    if (movieTitle !== undefined) {
        console.log(movieTitle)
    $.get(`https://www.googleapis.com/youtube/v3/search?maxResults=25&part=snippet&q=${movieTitle} review&key=${apiKey}`,
    function(response) {
        var idArray = [];
        response.items.forEach(function(cur) {
            idArray.push(cur.id.videoId);
        });
        function printVids(youtubeArray){
            console.log('akuna');
            return youtubeArray.map(function(cur, index) {
             $(`.review${index}`).attr('src', `https://www.youtube.com/embed/${cur}`)
         });
    }
    printVids(idArray);
 });
 };
};
 


