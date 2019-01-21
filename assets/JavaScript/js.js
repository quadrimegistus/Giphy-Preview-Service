$(document).ready(function(){
    var gamesList = ['Dota 2', 'Starcraft', 'World of Warcraft'];
    var apiKey = '&api_key=DFXzSBLk00OK1piIKJ0vWamIJu5R6gcb';
    var cors = 'https://cors-anywhere.herokuapp.com/';

    function renderButtons() {
        $('.buttonContainer').empty();
        for (var i = 0; i < gamesList.length; i++) {
            var a = $('<button>');
            a.addClass('btn btn-primary');
            a.addClass('action');
            a.attr('data-name', gamesList[i]);
            a.text(gamesList[i]);
            $('.buttonContainer').append(a);
        }}
    renderButtons();
    
    $(document).on('click', '.action', function gameSearchOnClick() {
        $('#loading').show();
        event.preventDefault();
        var game = $(this).attr('data-name');
        var numInput = $('#number-input').val().trim();
        var limit = '&limit='+numInput;
        var queryURL = cors+'https://api.giphy.com/v1/gifs/search?q='+game+apiKey+limit;
        console.log('This is the URL passed: '+queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response){
            $('.games-view').html('');
            var results = response.data;
            if (results == ''){
                $('.games-view').html("There isn't a gif for this search. Womp womp. :(");
              }
            for (var i = 0; i < results.length; i++) {
                var gameDiv = $('<div>');
                gameDiv.addClass('gameDiv');
                gameDiv.addClass('col');
                var gameGifRating = results[i].rating.toUpperCase();
                var gameTitle = game.toUpperCase();
                var pOne = $('<p>').text('GIF RATING: ' + gameGifRating + ' TITLE: ' + gameTitle);
                gameDiv.append(pOne);                                
                var gameImage = $('<img>');
                var stillImgURL = results[i].images.fixed_height_small_still.url;
                var animatedImgURL = results[i].images.fixed_height_small.url;
                gameImage.attr('src', stillImgURL);
                gameImage.attr('data-still', stillImgURL);
                gameImage.attr('data-animate', animatedImgURL);
                gameImage.attr('data-state', 'still');
                gameImage.addClass('game-image');
                gameDiv.append(gameImage);
                $('.games-view').append(gameDiv);
        }});});
    
    $(document).on('click', '#add-game', function gameSearchOnInput() {
        $('#loading').show();
        var userInput = $('#search-input').val().trim();
        var numInput = $('#number-input').val().trim();
        var limit = '&limit='+numInput;
        var game = userInput;
        var queryURL = cors+'https://api.giphy.com/v1/gifs/search?q='+game+apiKey+limit;
        event.preventDefault();
        if (userInput == ''){
            return false;}
        gamesList.push(userInput);
        renderButtons(userInput);
        $('#search-input').val('');
        $('#number-input').val('');
        console.log('This is the URL passed: '+queryURL);
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).done(function(response){
            $('.games-view').html('');
            var results = response.data;
            if (results == ''){
                $('.games-view').html("There isn't a gif for this search. Womp womp. :(");
              }
            for (var i = 0; i < results.length; i++) { 
                    var gameDiv = $('<div>');
                    gameDiv.addClass('gameDiv');
                    gameDiv.addClass('col');
                    var gameGifRating = results[i].rating.toUpperCase();
                    var gameTitle = game.toUpperCase();
                    var pOne = $('<p>').text('GIF RATING: ' + gameGifRating + ' TITLE: ' + gameTitle);
                    gameDiv.append(pOne);                                
                    var gameImage = $('<img>');
                    var stillImgURL = results[i].images.fixed_height_small_still.url;
                    var animatedImgURL = results[i].images.fixed_height_small.url;
                    gameImage.attr('src', stillImgURL);
                    gameImage.attr('data-still', stillImgURL);
                    gameImage.attr('data-animate', animatedImgURL);
                    gameImage.attr('data-state', 'still');
                    gameImage.addClass('game-image');
                    gameDiv.append(gameImage);
                    $('.games-view').append(gameDiv);
        }});});

    $(document).on('click', '#remove-game', function clearLastButton (event){
        event.preventDefault();
        $('.buttonContainer').children().last().remove();
        gamesList.pop();
        });
    
    $(document).on('click', '#remove-gifs', function clearGIFsOnly (event){
        event.preventDefault();
        $('.games-view').html('');
        });

    $(document).on('click', '.game-image', function changeGIFState (){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
        }});

    $(document).on('click', '.js-change-theme', function changeTheme (){
        var body = $(document.body);
        if (body.hasClass('t--dark')) {
            body.removeClass('t--dark');
            body.addClass('t--light');
        } else {
            body.removeClass('t--light');
            body.addClass('t--dark');
        }
        if (body.hasClass('t--light')){
            $('.js-change-theme').text('Switch to a Darker Display');
        } else {
            $('.js-change-theme').text('Switch to a Lighter Display');
        }});
        
    $('.js-change-theme').text('Switch to a Lighter Display')
    $('#loading').hide();
});