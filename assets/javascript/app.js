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

$("#buttonContainer").on("click", ".buttons", function(){
    gif.searchGif($(this).attr("data"));
})

let gif = {
    makeButton: function(string) {
        let newButton = $("<button>");
        newButton.attr({
            class: `btn btn-primary buttons p-1 m-1`,
            data: string,
        });
        newButton.text(string);
        $("#buttonContainer").append(newButton);
    },
    
    searchGif: function(string) {
        console.log(string);
        
            
        let url = `https://api.giphy.com/v1/gifs/search?q=${string}&api_key=Aas52GuoSuIvX4QCtuPaGD15cwWqoBNG`

        $.ajax({
            url: url,
            method: "GET",
        }).then(function(response){
            console.log(response);
            for (i in response) {
                let newDiv = $("<div>");
                newDiv.append(response.data[i].)
            }
            
        })
        
    }
}