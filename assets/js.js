$(document).ready(function(){

var gamesList = ['Dota 2', 'Starcraft', 'World of Warcraft'];
var apiKey = '&api_key=DFXzSBLk00OK1piIKJ0vWamIJu5R6gcb';
var cors = 'https://cors-anywhere.herokuapp.com/';
var buttonStyles = ['btn btn-primary', 'btn btn-secondary', 'btn btn-success', 'btn btn-danger', 'btn btn-warning', 'btn btn-info']
var rndmbtn = buttonStyles[Math.floor(Math.random()*buttonStyles.length)];

function renderButtons() {
    $(".buttonContainer").empty();
    for (var i = 0; i < gamesList.length; i++) {
        var a = $("<button>");
        a.addClass(rndmbtn);
        a.addClass("action");
        a.attr("data-name", gamesList[i]);
        a.text(gamesList[i]);
        $(".buttonContainer").append(a);
    }     
    
}
function addNewButton(){
    $('#add-game').on('click', function(event) {
        $('.games-view').html('');
        event.preventDefault();
        var userInput = $('#search-input').val().trim();
        if (userInput == ""){
            return false;
        }
        gamesList.push(userInput);
        console.log('This is the userInput passed to gameSearch: '+userInput);
        renderButtons(userInput);
        console.log(gamesList);
        $(this).closest('form').find("input[type=text], textarea").val("");
        $(this).closest('form').find("input[type=number], textarea").val("");
        return false;
})};
function removeLastButton(){
    $('#remove-game').on('click', function(event){
        event.preventDefault();
        $('.games-view').html('');
        $('.buttonContainer').children().last().remove();
        gamesList.pop();
    });
}
function clearGIFsOnly(){
$('#remove-game').on('click', function(event){
    event.preventDefault();
    $('.games-view').html('');
})};
function gameSearch() {
    var numInput = $('#number-input').val().trim();
    var limit = '&limit='+numInput;
    var game = $(this).attr("data-name");
    var queryURL = cors+'https://api.giphy.com/v1/gifs/search?q='+game+apiKey+limit;
    console.log('This is the game searched: '+game);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function(response){
        $('.games-view').html('');
        console.log('This was the queryURL sent: '+queryURL);
        var results = response.data;
        console.log(results);
        if (results == ""){
            alert("There isn't a gif for this search. Womp womp. :(");
          }
        for (var i = 0; i < results.length; i++) { 
                var gameDiv = $("<div>");
                gameDiv.addClass('gameDiv');
                gameDiv.addClass('col');
                var gameGifRating = results[i].rating.toUpperCase();
                var gifTitle = results[i].title.toUpperCase(); 
                var pOne = $("<p>").text("GIF RATING: " + gameGifRating + " GIF TITLE: " + gifTitle);
                gameDiv.append(pOne);                                
                var gameImage = $("<img>");
                var stillImgURL = results[i].images.fixed_height_small_still.url;
                var animatedImgURL = results[i].images.fixed_height_small.url;
                gameImage.attr('src', stillImgURL);
                gameImage.attr("data-still", stillImgURL);
                gameImage.attr("data-animate", animatedImgURL);
                gameImage.attr("data-state", "still");
                gameImage.addClass("game-image");
                gameDiv.append(gameImage);
                $(".games-view").append(gameDiv);
        }
    });
}

addNewButton();
renderButtons();
removeLastButton();
clearGIFsOnly();

$(document).on("click", ".action", gameSearch); 

$(document).on("click", ".game-image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
$('.js-change-theme').html('Switch to a Lighter Display');
$(document).on('click', '.js-change-theme', function(){
    var body = $(document.body);
    var container = $(document.container);
    if (body.hasClass('t--dark')) {
        body.removeClass('t--dark');
        body.addClass('t--light');
    } else {
        body.removeClass('t--light');
        body.addClass('t--dark');
    };
    if (body.hasClass('t--light')){
        $('.js-change-theme').html('Switch to a Darker Display');
    } else {
        $('.js-change-theme').html('Switch to a Lighter Display');
    }
    
});
});
