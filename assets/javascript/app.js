// Initialize the input variable that hooks into the search bar
let input = $("#inputField");

// When the enter key is pressed if the searchbar has anything in it search that term
input.keyup(function(event){
    event.preventDefault();
    
    if(event.keyCode === 13 && (input.val())){
        gif.makeButton(input.val().trim());
        gif.searchGif(input.val().trim());
        input.val("");
    }
});

// When the search button is clicked if the searchbar has anything in it search that term
$("#searchButton").on("click", function(){
    if(input.val()) {
        gif.makeButton(input.val().trim());
        gif.searchGif(input.val().trim());
        input.val("");
    }
});

// If a button with a search term is clicked search the data value of that button
$("#buttonContainer").on("click", ".btn", function(event){
    event.preventDefault();
    gif.searchGif($(this).attr("data"));
})

// Gif object
let gif = {
    // When a search from the searchbar is executed create a button with the data value = to the search term
    makeButton: function(string) {
        // Assign randomColor a random number between 0 and 4, this is to randomize the colors of the buttons
        let randomColor = Math.floor(Math.random()*5);
        
        // Create the button element and assign its class and data value
        let newButton = $("<button>");
        newButton.attr({
            class: `btn buttons${randomColor} p-1 m-1`,
            data: string,
        });
        newButton.text(string);

        // Append the button to the container of buttons
        $("#buttonContainer").append(newButton);
    },
    
    // Search GIF method
    searchGif: function(string) {
        
        // The url of the search query with the unique search term
        let url = `https://api.giphy.com/v1/gifs/search?q=${string}&api_key=Aas52GuoSuIvX4QCtuPaGD15cwWqoBNG&limit=24`
        
        $.ajax({
            url: url,
            method: "GET",
        }).then(function(response){
            // After the AJAX request finishes run this for loop that iterates through the response object
            console.log(response);
            for (let i = 0; i<response.data.length; i++) {
                // Assign a random color to the border of the GIF
                let randomColor = Math.floor(Math.random()*5);

                // Returns a number that iterates through 0 and 4 to place each GIF in each column evenly
                let currentCol = ((i+4) % 4);
                // Create new html elements and assign the attributes and classes to them
                let newDiv = $("<div>");
                let gifImg = $("<img>");
                gifImg.attr({
                    src: response.data[i].images.original_still.url,
                    class: `gif img-fluid mt-1 border${randomColor}`,
                    'data-still': response.data[i].images.original_still.url,
                    'data-animate': response.data[i].images.original.url,
                    'data-state': 'still',
                });
                // The div that houses the rating
                let ratingDiv = $("<div>");
                ratingDiv.text(response.data[i].rating.toUpperCase());
                ratingDiv.attr({
                    class: `p-1 text-center buttons${randomColor}`,
                });
                // Append the gif and rating to the newly created div
                newDiv.append(gifImg);
                newDiv.append(ratingDiv);
                // Append the new div to the current column
                $(`#gifCol${currentCol}`).prepend(newDiv);
            }
            
        })
        
    }
}

// When a gif is clicked toggle it between paused and unpaused
$(".gifColumn").on("click",".gif",function(){
    state = $(this).attr("data-state");
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
})

// When the "Clear Selection" button is clicked empty all of the columns holding the GIFs
$("#clearButton").on("click",".btn", function(){
    $(".gifColumn").empty();
})