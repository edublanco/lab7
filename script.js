$(document).ready(function() {

    var temas  = ["ac/dc","a-ha", "abba","America","journey"]
    

    for(var i = 0; i < temas.length; i++){
        console.log(temas[i])
        $("#animal-buttons").append(`<button class="buttonSearch"> ${temas[i]}</button>`)
    }

    $("#add-animal").on("click", addButton);
    $("#animal-buttons").on("click",".buttonSearch", searchGiphy)
    $("body").on("click",".animal-item",changeState)

    // Start your code from here

    function addButton(e){
        e.preventDefault()
        var input  = $("#animal-input").val()
        console.log("Add Animal "+input )
        $("#animal-buttons").append(`<button class= "buttonSearch"> ${input}</button>`)
    }

    function searchGiphy(e){

        e.preventDefault()
        $("#animals").empty()
        var busqueda = $(this).text()
        
        var content = $.get("https://api.giphy.com/v1/gifs/search",{
            api_key: "jrLTFGcIsspa2Uf2Wx3zmJLJVh7opbEa",
            q: busqueda,
            limit: 10, 
        })

        content.done(function(response)
        {

            for(var i =0; i < response.data.length; i++){
                var imagen =  $("<img>")
                imagen.attr("src", response.data[i].images.fixed_height_still.url)
                imagen.attr("data-still", response.data[i].images.fixed_height_still.url)
                imagen.attr("data-move", response.data[i].images.fixed_height.url)
                imagen.attr("data-state", "no")
                imagen.addClass("animal-item")
                var gif = $(`<div id="gif"><p>${response.data[i].rating}</p></div>`).append(imagen)
                $("#animals").append(gif)

            }
        })
    }
    function changeState(e){
        e.preventDefault()
        var estado = $(this).attr("data-state")
        if(estado === "no"){
            $(this).attr("src",$(this).attr("data-move"))
            $(this).attr("data-state","si")
        }else{
            $(this).attr("src",$(this).attr("data-still"))
            $(this).attr("data-state","no")
        }
    }
});
