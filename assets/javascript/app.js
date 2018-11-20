let input = $("#inputField");


input.keyup(function(event){
    event.preventDefault();
    
    if(event.keyCode === 13 && (input.val())){
        gif.makeButton(input.val().trim());
        gif.searchGif(input.val().trim());
        input.val("");
    }
});

$("#searchButton").on("click", function(){
    if(input.val()) {
        gif.makeButton(input.val().trim());
        gif.searchGif(input.val().trim());
        input.val("");
    }
});

$("#buttonContainer").on("click", ".btn", function(){
    gif.searchGif($(this).attr("data"));
})

let gif = {
    makeButton: function(string) {
        let randomColor = Math.floor(Math.random()*5);
        
        let newButton = $("<button>");
        newButton.attr({
            class: `btn buttons${randomColor} p-1 m-1`,
            data: string,
        });
        newButton.text(string);
        $("#buttonContainer").append(newButton);
    },
    
    searchGif: function(string) {
        
        
        let url = `https://api.giphy.com/v1/gifs/search?q=${string}&api_key=Aas52GuoSuIvX4QCtuPaGD15cwWqoBNG&limit=24`
        
        $.ajax({
            url: url,
            method: "GET",
        }).then(function(response){
            console.log(response);
            for (let i = 0; i<response.data.length; i++) {
                let randomColor = Math.floor(Math.random()*5);
                
                let currentCol = ((i+4) % 4);
                let newDiv = $("<div>");
                let gifImg = $("<img>");
                gifImg.attr({
                    src: response.data[i].images.original_still.url,
                    class: `gif img-fluid mt-1 border${randomColor}`,
                    'data-still': response.data[i].images.original_still.url,
                    'data-animate': response.data[i].images.original.url,
                    'data-state': 'still',
                });
                let ratingDiv = $("<div>");
                ratingDiv.text(response.data[i].rating.toUpperCase());
                ratingDiv.attr({
                    class: `p-1 text-center buttons${randomColor}`,
                });
                newDiv.append(gifImg);
                newDiv.append(ratingDiv);
                $(`#gifCol${currentCol}`).prepend(newDiv);
            }
            
        })
        
    }
}

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