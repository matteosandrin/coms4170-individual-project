var data = {
    recipes : []
}
var recipeID = null;

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
        data.recipes[recipeID].keywords.push(value);
        dumpToLocalStorage(data);
        setupRecipe(data.recipes[recipeID]);
        $(".add-keyword-input").val("");
    }
});


var params = new URLSearchParams(window.location.search);
if (params.has("id") && params.get("id").length > 0) {
    recipeID = parseInt(params.get("id"));
}

$(document).ready(() => {
    if (recipeID != null) {
        if (getFromLocalStorage() == null) {
            $.ajax("./data.json").done((d) => {
                data = d;
                dumpToLocalStorage(data);
                var recipe = data.recipes[recipeID];
                setupRecipe(recipe);
            });
        } else {
            data = getFromLocalStorage();
            var recipe = data.recipes[recipeID];
            setupRecipe(recipe);
        }
    }
});

function setupRecipe(recipe) {
    $(".recipe-title").text(recipe.title);
    if (recipe.image) {
        $(".recipe-image").attr("src", recipe.image);
    } else {
        $(".recipe-image").remove();
    }
    if (recipe.url) {
        $(".recipe-url-button").attr("href", recipe.url);
    } else {
        $(".recipe-url-button").remove();
    }
    $(".recipe-crumbs > span").remove();
    recipe.keywords.forEach(word => {
        $(".recipe-crumbs").append(
            $("<span></span>").addClass("crumb").text(word.replace(" ", "\xa0"))
        ).append(
            $("<span> </span>")
        );
    });
}
