var data = {
    recipes : []
}

var params = new URLSearchParams(window.location.search);
if (params.has("q") && params.get("q").length > 0) {
    $(".text-input").val(params.get("q"));
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

$(".text-input").on("input", (event) => {
    var query = $(".text-input").val().toLowerCase();
    var result = data.recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(query) ||
        recipe.keywords.filter(word => 
            word.toLowerCase().includes(query)
        ).length > 0
    );
    $(".recipe").remove();
    result.forEach(recipe => {
        var crumbs = $("<div></div>").addClass("recipe-crumbs");  
        recipe.keywords.forEach(word => {
            crumbs = $(crumbs).append(
                $("<span></span>").addClass("crumb").text(word.replace(" ", "\xa0"))
            ).append($("<span> </span>"));
        });
        var recipeHTML = $("<div></div>").addClass("recipe")
            .append($("<div></div>").addClass("recipe-title").text(recipe.title))
            .append(crumbs)
            .click(() => {
                window.location = '/recipe.html?id=' + data.recipes.indexOf(recipe);
            });
        $(".content").append(recipeHTML);
    });
});