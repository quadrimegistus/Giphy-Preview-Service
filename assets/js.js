$.get('https://api.giphy.com/v1/gifs/search?q=funny+dogs&api_key=DFXzSBLk00OK1piIKJ0vWamIJu5R6gcb').then(function(response){
    console.log(response);
    var row1 = $('row1');
    for (var i = 0; i < 10; i++){
        console.log(response.data[i]);
        var gif1 = $('#gif1').html('<img src='+response.data[i].embed_url+'>').prepend('<div> Rating: '+response.data[i].rating.toUpperCase()+'</div>');
        var gif2 = $('#gif2').html('<img src='+response.data[i].url+'\>').prepend('<div> Rating: '+response.data[i].rating.toUpperCase()+'</div>');
        var gif3 = $('#gif3').html('<img src='+response.data[i].url+'\>').prepend('<div> Rating: '+response.data[i].rating.toUpperCase()+'</div>');
        var gif4 = $('#gif4').html('<img src='+response.data[i].url+'\>').prepend('<div> Rating: '+response.data[i].rating.toUpperCase()+'</div>');
        var gif5 = $('#gif5').html('<img src='+response.data[i].url+'\>').prepend('<div> Rating: '+response.data[i].rating.toUpperCase()+'</div>');
        var gif6 = $('#gif6').html('<img src='+response.data[i].url+'\>').prepend('<div> Rating: '+response.data[i].rating.toUpperCase()+'</div>');
        var gif7 = $('#gif7').html('<img src='+response.data[i].url+'\>').prepend('<div> Rating: '+response.data[i].rating.toUpperCase()+'</div>');
        var gif8 = $('#gif8').html('<img src='+response.data[i].url+'\>').prepend('<div> Rating: '+response.data[i].rating.toUpperCase()+'</div>');
        var gif9 = $('#gif9').html('<img src='+response.data[i].url+'\>').prepend('<div> Rating: '+response.data[i].rating.toUpperCase()+'</div>');

        row1.append(gif1, gif2, gif3, gif4, gif5, gif6, gif7, gif8, gif9);
    }
});


$('#btn').text('Submit')

console.log("Last JS Line Loaded");