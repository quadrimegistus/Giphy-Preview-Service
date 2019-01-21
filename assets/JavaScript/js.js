$(document).ready(function(){
    var gamesList = ['Dota 2', 'Starcraft', 'World of Warcraft', 'FF7'];
    var apiKey = '&api_key=DFXzSBLk00OK1piIKJ0vWamIJu5R6gcb';
    var cors = 'https://cors-anywhere.herokuapp.com/';

    function renderButtons() {
        $('.buttonContainer').empty();
        for (var i = 0; i < gamesList.length; i++) {
            $('<button>', {type:'button', class:'btn btn-primary t-border action', 'data-name':gamesList[i], text:gamesList[i]}).appendTo('.buttonContainer');
        }}
    renderButtons();

    $(document).on('click', '.action', function gameSearchOnClick() {
        $('.loading').show();
        event.preventDefault();
        var game = $(this).attr('data-name');
        var numInput = $('input:radio:checked').val(), limit = '&limit='+numInput;
        var queryURL = cors+'https://api.giphy.com/v1/gifs/search?q='+game+apiKey+limit;
        $.get(queryURL).done(function(response){
            $('.gifcontainer').addClass('t-border');
            $('.loading').hide();
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {
                var gameDiv = $("<div class='col-md-4'>");                
                var stillImgURL = results[i].images.fixed_height_small_still.url, animatedImgURL = results[i].images.fixed_height_small.url;
                var gameImage = $('<img>', {class:'game-image t-border', src:stillImgURL, 'data-still':stillImgURL, 'data-animate':animatedImgURL, 'data-state':'still'})
                var favBtn = $('<button>', {type:'button', class:'btn btn-primary btn-sm fav t-border', 'data-name':'Favorite', text:'Favorite'}).appendTo(gameDiv)
                var dlBtn = $('<button>', {type:'button', class:'btn btn-primary btn-sm dl t-border', 'data-name':'Download', text:'Download'}).appendTo(gameDiv)
                var gifRatingBtn = $('<button>', {type:'button', class:'btn btn-primary btn-sm gifrb t-border', 'data-name':results[i].rating, text:'GIF Rating: '+results[i].rating.toUpperCase()}).appendTo(gameDiv)                                              
                $('.games-view').prepend(gameDiv.prepend(gameImage, gifRatingBtn, favBtn, dlBtn));
        }});});

    $(document).on('click', '#add-game', function gameSearchOnInput() {
        $('.loading').show();
        var userInput = $('#search-input').val().trim(), game = userInput;
        var numInput = $('input:radio:checked').val();
        var limit = '&limit='+numInput;
        var queryURL = cors+'https://api.giphy.com/v1/gifs/search?q='+game+apiKey+limit;
        event.preventDefault();
        if (userInput == ''){
            $("<div class='col-md-12 t-border'>").text('You need to type a game name to search fam.').prependTo('.games-view');S
            $('.loading').hide();
            return false;}
        gamesList.push(userInput);
        renderButtons(userInput);
        $.get(queryURL).done(function(response){
            $('.gifcontainer').addClass('t-border');
            $('.loading').hide();
            var results = response.data;
            if (results == ''){
                $("<div class='col-md-12 t-border'>").text("There isn't a gif for this search. Womp womp. :(").appendTo('.games-view');
                $('.buttonContainer').children().last().remove();
                gamesList.pop();}
            $('#search-input').val('');
            for (var i = 0; i < results.length; i++) { 
                var gameDiv = $("<div class='col-md-4'>");                
                var stillImgURL = results[i].images.fixed_height_small_still.url, animatedImgURL = results[i].images.fixed_height_small.url;
                var gameImage = $('<img>', {class:'game-image t-border', src:stillImgURL, 'data-still':stillImgURL, 'data-animate':animatedImgURL, 'data-state':'still'})
                var favBtn = $('<button>', {type:'button', class:'btn btn-primary btn-sm fav t-border', 'data-name':'Favorite', text:'Favorite'}).appendTo(gameDiv)
                var dlBtn = $('<button>', {type:'button', class:'btn btn-primary btn-sm dl t-border', 'data-name':'Download', text:'Download'}).appendTo(gameDiv)
                var gifRatingBtn = $('<button>', {type:'button', class:'btn btn-primary btn-sm gifrb t-border', 'data-name':results[i].rating, text:'GIF Rating: '+results[i].rating.toUpperCase()}).appendTo(gameDiv)                                              
                $('.games-view').prepend(gameDiv.prepend(gameImage, gifRatingBtn, favBtn, dlBtn));
    }});});

    $(document).on('click', '#remove-game', function clearLastButton (event){
        event.preventDefault();
        $('.buttonContainer').children().last().remove();
        gamesList.pop();});
    
    $(document).on('click', '#remove-gifs', function clearGIFsOnly (event){
        event.preventDefault();
        $('.games-view').html('');
        $('.gifcontainer').removeClass('t-border');
    });    

    $(document).on('click', '.game-image', function changeGIFState (){
        var state = $(this).attr('data-state');
        if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');}});

    $(document).on('click', '.js-change-theme', function changeTheme (){
        var body = $(document.body);
        if (body.hasClass('t--dark')) {
            body.removeClass('t--dark');
            body.addClass('t--light');
        } else {
            body.removeClass('t--light');
            body.addClass('t--dark');}
        if (body.hasClass('t--light')){
            $('.js-change-theme').text('Switch to a Darker Display');
        } else {
            $('.js-change-theme').text('Switch to a Brighter Display');}});

    $(document).on('click', '.gifsaver', function changeSaveGif (){
        var gifSaver = $('.gifsaver')
        if (gifSaver.hasClass('btn-success')) {
            gifSaver.removeClass('btn-success');
            gifSaver.addClass('btn-danger');
        } else {
            gifSaver.addClass('btn-success');
            gifSaver.removeClass('btn-danger');}
        if (gifSaver.hasClass('btn-success')){
            $('.gifsaver').text('Set Images to Clear On New Search');
        } else {
            $('.gifsaver').text('Set Images to Save On New Search');}});
        
    $('.js-change-theme').text('Switch to a Brighter Display')
    $('.gifsaver').text('Set Images to Clear On New Search')
    $('.loading').hide();
    $('.btn-secondary').button('toggle')
});