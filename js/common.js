$(".header-back-button").click(() => {
    window.history.back();
});

function dumpToLocalStorage(data) {
    var ls = window.localStorage;
    ls.setItem("data", JSON.stringify(data));
}

function getFromLocalStorage() {
    var ls = window.localStorage;
    var value = ls.getItem("data");
    if (value == null) return null;
    try {
        return JSON.parse(value);
    } catch (e) {
        console.log("Error: ", e);
        return null;
    }   
}