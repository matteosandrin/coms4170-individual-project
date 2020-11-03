var data = {
    recipes : []
}

$(document).ready(() => {
    if (getFromLocalStorage() == null) {
        $.ajax("/data.json").done((d) => {
            data = d;
            dumpToLocalStorage(data);
            loadData();
        });
    } else {
        data = getFromLocalStorage();
        loadData();
    }
});

function loadData() {
    var reversed = data.recipes.slice().reverse();
    reversed = reversed.slice(0, 4);
    reversed.forEach((recipe) => {
        $("#recent-content").append(
            $("<div></div>").addClass("recent-recipe")
                .append($("<div></div>").addClass("recent-recipe-title").text(recipe.title))
                .append(
                    $("<div></div>").addClass("recent-recipe-crumbs")
                        .append($("<span></span>").addClass("crumb").text(recipe.keywords[0].replace(" ", "\xa0")))
                        .append($("<span></span>").addClass("crumb").text(recipe.keywords[1].replace(" ", "\xa0")))
                        .append($("<span></span>").addClass("crumb").text(recipe.keywords[2].replace(" ", "\xa0")))
                )
                .click(() => window.location = '/recipe.html?id=' + data.recipes.indexOf(recipe))
        );
    });
}