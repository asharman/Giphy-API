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
        
            
        let url = `https://api.giphy.com/v1/gifs/search?q=${string}&api_key=Aas52GuoSuIvX4QCtuPaGD15cwWqoBNG&limit=24`

        $.ajax({
            url: url,
            method: "GET",
        }).then(function(response){
            console.log(response);
            for (let i = 0; i<response.data.length; i++) {
                console.log(i);
                
                let currentCol = ((i+4) % 4);
                let newDiv = $("<div>");
                let gifImg = $("<img>");
                gifImg.attr({
                    src: response.data[i].images.original_still.url,
                    class: "image img-fluid my-1",
                })
                newDiv.append(gifImg);
                $(`#gifCol${currentCol}`).prepend(newDiv);
            }
            
        })
        
    }
}