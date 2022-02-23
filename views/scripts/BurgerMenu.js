let btnOpenMenu = document.getElementById("open-burger");
let btnCloseMenu = document.getElementById("close-burger");
let burgerMenu = document.getElementsByClassName("menu")[0];

function changeMenuView() {
    burgerMenu.classList.toggle("open-burger");
}

btnOpenMenu.addEventListener("click", changeMenuView);
btnCloseMenu.addEventListener("click", changeMenuView);

let btnOpenSearch = document.getElementById("open-search");
let btnCloseSearch = document.getElementById("burger-search");
let burgerSearch = document.getElementsByClassName("search")[0];

function changeSearchView() {
    burgerSearch.classList.toggle("open-search");
}

btnOpenSearch.addEventListener("click", changeSearchView);
btnCloseSearch.addEventListener("click", changeSearchView);
