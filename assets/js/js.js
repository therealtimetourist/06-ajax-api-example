// initial buttons array
var topic = ["50s", "60s", "70s", "80s", "90s"];

function displaygiphyInfo(){
  // declare variables
  var giphy = $(this).attr("data-name");  // get element selected data-name attribute
  // query string to send to Giphy API
  var queryURL = "https://api.giphy.com/v1/gifs/search?q="+giphy+"&limit=10&api_key=dc6zaTOxFJmzC";

  // get info from Giphy API
  $.ajax({
    url: queryURL,                      // send URL query string
    method: "GET"                       // method is GET
  }).done(function(response){           // when info returned from Giphy API
    $('#giphys-view').empty();          // clear page main area
    $.each(response.data, function(i){  // loop for each item returned
      var fig = $('<figure>');          // create a <figure> element
      var still = $('<img>');           // create an <image> element
      var figcap = $('<figcaption>');   // create a figure caption element

      fig.addClass('col-sm-4');         // set bootstrap class of 4 columns

      // set source, class, data-state, data-still, data-animate attributes of still image
      still.attr('src',response.data[i].images.fixed_height_still.url)
        .addClass('gif')
        .attr('data-state', 'still')
        .attr('data-still', response.data[i].images.fixed_height_still.url)
        .attr('data-animate', response.data[i].images.fixed_height.url);

      // append rated string to figurecaption  
      $(figcap).append('Rated: ' + response.data[i].rating);

      // append figure caption and image to giphys-view div
      $('#giphys-view').append(fig.append(figcap).append(still));
    })
  });
}

function renderButtons(){
  $("#buttons-view").empty();   // clear buttons area

  // loop to topic array length
  for (var i = 0; i < topic.length; i++){
    var a = $("<button>");                      // create <button> element
    a.addClass("giphy btn btn-primary btn-lg"); // add classes to button
    a.attr("data-name", topic[i]);              // add data-name attribute to button
    a.text(topic[i]);                           // add button text

    $("#buttons-view").append(a);               // append all to button
  }
}

function changeGifState(){
  var state = $(this).attr('data-state');       // get button state from data-state attribute

  if(state === "still"){                                // if state is still
    $(this).attr('src', $(this).attr('data-animate'));  // set image source to data-animate value
    $(this).attr('data-state', 'animate');              // set data-state to animate
  }else{                                                // else state not still
    $(this).attr('src', $(this).attr('data-still'));    // set image source to data-still value
    $(this).attr('data-state', 'still');                // set data-state to still
  }
}

$("#add-giphy").on("click", function(event){        // when adding a search button
  event.preventDefault();                           // prevent default button behavior, do this function instead
  var giphy = $("#giphy-input").val().trim();       // get the value of input text field

  if(topic.indexOf(giphy) > -1){                    // error check: determine if field text is already a button
    alert("There's already a button for that!");    // alert user
  }else if(giphy.length === 0){                     // error check: determine if input is empty
    return;                                         // do nothing
  }else{                                            // else valid input
    topic.push(giphy);                              // added text to topic array
    $('#giphy-input').val('');                      // clear input text field
    
    renderButtons();                                // call renderButtons to render buttons on page
  }
});

// add click event listener for elements with "giphy" class
$(document).on('click', '.giphy', displaygiphyInfo);
// add click event listener for elements with 'gif' class
$(document).on('click', '.gif', changeGifState);
// call renderButtons function to display intial buttons
renderButtons();
