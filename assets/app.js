animals = ["Dog", "Cat", "Bird", "Bear", "Horse", "Rabbit", "Turtle", "Duck", "Pig", "Goat"];

function displayGifs() {
    //Make call to Giphy API to retieve a set number of gifs and display them for the user
    var animal = $(this).data("name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=cJuRGE71gtJOzBJZsqnZHP5kd3AZFNcs&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response)
        $("#gif-view").empty();
        for (var i = 0; i < response.data.length; i++) {
            var animalDiv = $("<div class='animal'>");
            var ratingP = $("<p>").text("Rating: " + response.data[i].rating);
            var stillGif = response.data[i].images.fixed_height_still.url;
            var animGif = response.data[i].images.fixed_height.url;
            var gifImage = $("<img class='animal-gif img-fluid' src='" + stillGif + "'data-still='" + stillGif + "' data-animated='" + animGif + "'/>");
            animalDiv.append(gifImage);
            animalDiv.append(ratingP);
            $("#gif-view").append(animalDiv);
        };
    });
};

function createButtons() {
    //Create buttons container with a button for each animal in the array
    $("#buttons-view").empty();

    for (var i = 0; i < animals.length; i++) {
        var btn = $("<button type='button'class='animal-button btn btn-sm btn-success'>");
        btn.attr("data-name", animals[i]);
        btn.text(animals[i]);
        $("#buttons-view").append(btn);
    };
};

function animateGif() {
    //Start/stop gif animation on and off
    if ($(this).attr("src") === $(this).data("still")) {
        $(this).attr("src", $(this).data("animated"));
    } else {
        $(this).attr("src", $(this).data("still"));
    };
}

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    //Add animal to array if entered and doesn't already exist in the array
    if ($("#animal-input").val().trim() != "" &&
        animals.indexOf($("#animal-input").val()) === -1) {
        animals.push($("#animal-input").val());
        createButtons();
    };
    $("#animal-input").val("");
});

$(document).on("click", "animal-gif", animateGif);
$(document).on("click", "animal-button", displayGifs);
createButtons();
