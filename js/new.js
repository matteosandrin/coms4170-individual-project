var base64img = null;
var data = {
    recipes : []
}

$(document).ready(() => {
    if (getFromLocalStorage() == null) {
        $.ajax("./data.json").done((d) => {
            data = d;
            dumpToLocalStorage(data);
            $(".text-input").trigger("input");
        });
    } else {
        data = getFromLocalStorage();
        $(".text-input").trigger("input");
    }
});


$(".file-input").on("change", (event) => {
    var file = event.target.files[0];

    var reader = new FileReader();
    reader.onloadend = function() {
        base64img = reader.result;                
        $(".recipe-image").attr("src", base64img);
        $(".recipe-image").css("display", "block");
    }
    reader.readAsDataURL(file); 
});

$(".add-keyword-button").click(() => {
    $(".add-keyword-button").css('display', 'none');
    $(".add-keyword-controls").css('display', 'block');
    $(".add-keyword-input").focus();
});

$('.add-keyword-done-button').click(() => {
    $(".add-keyword-controls").css('display', 'none');
    $(".add-keyword-button").css('display', 'block');
});

$(".add-keyword-input").keyup((event) => {
    var value = $(".add-keyword-input").val();
    if (value.length > 0 && event.keyCode === 13) {
        $(".recipe-crumbs").append(
            $("<span></span>").addClass("crumb").text(value)
        ).append(
            $("<span> </span>")
        );
        $(".add-keyword-input").val("");
    }
});

$(".save-recipe-button").click(() => {
    var error = "The following fields were left blank:\n";
    var isError = false;
    if ($(".title-input").val() == "") {
        isError = true;
        error += " - Recipe title field\n";
    }
    if ($(".file-input").val() == "" && $(".url-input").val() == "") {
        isError = true;
        error += " - Image field and URL field (they can't both be blank)\n";
    }
    if ($(".crumb").length == 0) {
        isError = true;
        error += " - Recipe keywords field\n";
    }
    if (isError) {
        alert(error);
        return;
    }
    var title = $(".title-input").val();
    var url = $(".url-input").val() ? $(".url-input").val() : null;
    var keywords = [];
    $(".crumb").each(function() {
        keywords.push($(this).text());
    });
    var newRecipe = {
        title: title,
        url: url,
        image: base64img,
        keywords: keywords
    };
    data.recipes.push(newRecipe);
    dumpToLocalStorage(data);
    window.location = "/";
});