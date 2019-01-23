// TODO: Add Clear Favorite Gifs Button in container
// TODO: Consolidate search on type and search on click functions into single function.
// TODO: Clean code, consolidate items for cleaner appearance and less total lines of code.
// TODO: Randomize order in which gifs are displayed.
// TODO: Remedy issue when pressing enter while #search-input is blank removes buttons.
// TODO: Fix favorite button not grabbing the correct image.
// TODO: Fix button creation populating with theme inconsistent with page theme.
// TODO: Fix download button not downloading the correct image. -Disabled

$(document).ready(function(){
    var gifSaver = $('.gifsaver')
    var gamesList = ['Dota 2', 'Starcraft', 'World of Warcraft', 'FF7'];
    var apiKey = '&api_key=DFXzSBLk00OK1piIKJ0vWamIJu5R6gcb';
    var cors = 'https://cors-anywhere.herokuapp.com/';

    function renderButtons() {
        $('.buttonContainer').empty();
        for (var i = 0; i < gamesList.length; i++) {$('<button>', {type:'button', class:'btn btn-light t-border action o-menu__item z', 'data-name':gamesList[i], text:gamesList[i]}).appendTo('.buttonContainer');}}
    renderButtons();

    $(document).on('click', '.action', function gameSearchOnClick() {
        $('.loading').show();
        var gameSearched = $(this).attr('data-name');
        var numInput = $('#number-input').val().trim(); if (numInput == ''){var numInput = 10;};
        var queryURL = cors+'https://api.giphy.com/v1/gifs/search?q='+gameSearched+apiKey+'&limit='+numInput;
        $.get(queryURL).done(function(response){
            $('.gifcontainer').addClass('t-border');
            $('.loading').hide();
            var results = response.data;
            if (gifSaver.hasClass('btn-danger')) {$('.games-view').html('');}
            $('#number-input').val('')
            for (var i = 0; i < results.length; i++) {
                var gameDiv = $("<div class='col-md-4'>");                
                var gifInfo = [results[i].images.fixed_height_small_still.url, results[i].images.fixed_height_small.url,'GIF Rating: '+results[i].rating.toUpperCase()];
                var gameImage = $('<img>', {class:'game-image t-border', src:gifInfo[0], 'data-still':gifInfo[0], 'data-animate':gifInfo[1], 'data-state':'still'})
                var favBtn = $('<button>', {type:'button', class:'btn btn-info btn-sm fav t-border', text:'Favorite', src:gifInfo[0], 'data-still':gifInfo[0], 'data-animate':gifInfo[1], 'data-state':'still'})
                var dlBtn = $('<button>', {type:'button', class:'btn btn-success btn-sm dl t-border', text:'Download'})
                var gifRatingBtn = $('<button>', {type:'button', class:'btn btn-primary btn-sm gifrb t-border', 'data-name':gifInfo[2], text:gifInfo[2]})                                         
                $('.games-view').prepend(gameDiv.prepend(gameImage, gifRatingBtn, favBtn, dlBtn));}
            $('.fav').on('click', function saveToFavs(){$('<img>', {class:'game-image t-border', src:gifInfo[0], 'data-still':gifInfo[0], 'data-animate':gifInfo[1], 'data-state':'still'}).appendTo('.favgifs')})
            });});

    $(document).on('click', '#add-game', function gameSearchOnInput() {
        $('.loading').show();
        var gameSearched = $('#search-input').val().trim();
        var numInput = $('#number-input').val().trim(); if (numInput == ''){var numInput = 10;}; 
        var queryURL = cors+'https://api.giphy.com/v1/gifs/search?q='+gameSearched+apiKey+'&limit='+numInput;
        if (gameSearched == ''){
            $("<div class='col-md-12 t-border'>").text('You need to type a game name to search fam.').prependTo('.games-view');
            $('.loading').hide();
            return false;}
        gamesList.push(gameSearched);
        renderButtons(gameSearched);
        $.get(queryURL).done(function(response){
            $('.gifcontainer').addClass('t-border');
            $('.loading').hide();
            var results = response.data;
            if (results == '') {$("<div class='col-md-12 t-border'>").text("There isn't a gif for this search. Womp womp. :(").appendTo('.games-view'); $('.buttonContainer').children().last().remove(); gamesList.pop();}
            if (gifSaver.hasClass('btn-danger')) {$('.games-view').html('');}
            $('#search-input').val(''); $('#number-input').val('');
            for (var i = 0; i < results.length; i++) { 
                var gameDiv = $("<div class='col-md-4'>");                
                var gifInfo = [results[i].images.fixed_height_small_still.url, results[i].images.fixed_height_small.url,'GIF Rating: '+results[i].rating.toUpperCase()];
                var gameImage = $('<img>', {class:'game-image t-border', src:gifInfo[0], 'data-still':gifInfo[0], 'data-animate':gifInfo[1], 'data-state':'still'})
                var favBtn = $('<button>', {type:'button', class:'btn btn-info btn-sm fav t-border', 'data-name':'Favorite', text:'Favorite'})
                var dlBtn = $('<button>', {type:'button', class:'btn btn-success btn-sm dl t-border', 'data-name':'Download', text:'Download'})
                var gifRatingBtn = $('<button>', {type:'button', class:'btn btn-primary btn-sm gifrb t-border', 'data-name':gifInfo[2], text:gifInfo[2]})                                         
                $('.games-view').prepend(gameDiv.prepend(gameImage, gifRatingBtn, favBtn, dlBtn));}
            $('.fav').on('click', function saveToFavs(){$('<img>', {class:'game-image t-border', src:gifInfo[0], 'data-still':gifInfo[0], 'data-animate':gifInfo[1], 'data-state':'still'}).appendTo('.favgifs')})
            });});

    $('#remove-game').on('click', function clearLastButton (){
        $('.buttonContainer').children().last().remove();
        gamesList.pop();});
    
    $('#remove-gifs').on('click', function clearGIFsOnly (){
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
        var btns = $('.z');
        if (body.hasClass('t--dark')) {
            body.removeClass('t--dark');
            btns.removeClass('btn-light')
            body.addClass('t--light');
            btns.addClass('btn-dark');
            $('.js-change-theme').text('Switch to a Darker Display')
        } else {
            body.removeClass('t--light');
            body.addClass('t--dark');
            btns.addClass('btn-light');
            btns.removeClass('btn-dark');
            $('.js-change-theme').text('Switch to a Brighter Display')
        }});

    gifSaver.on('click', function changeSaveGif (){
        if (gifSaver.hasClass('btn-success')) {
            gifSaver.removeClass('btn-success');
            gifSaver.addClass('btn-danger');
            $(gifSaver).text('Set Search Results to Save On New Search');
        } else {
            gifSaver.addClass('btn-success');
            gifSaver.removeClass('btn-danger');
            $(gifSaver).text('Set Search Results to Clear On New Search');
            }});
    
    $(document).on('click', '.giffavoriter', function showGifFavs(){
        var showFavs = $('.giffavoriter');
        if (showFavs.hasClass('off')){
            showFavs.removeClass('off');
            showFavs.addClass('on');
            $('.favgifs').show();
            $('.giffavoriter').text('Hide My Favorite GIFs')
        } else {
            showFavs.removeClass('on');
            showFavs.addClass('off');
            $('.favgifs').hide();}
            $('.giffavoriter').text('Show My Favorite GIFs');})
  
    $('.js-change-theme').text('Switch to a Brighter Display'); $('.gifsaver').text('Set Search Results to Clear On New Search'); $('.giffavoriter').text('Show My Favorite GIFs')
    $('.loading').hide(); $('.favgifs').hide();
});