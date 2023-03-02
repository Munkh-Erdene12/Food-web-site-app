"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderLoader = exports.elementsString = exports.elements = exports.clearLoader = void 0;
var elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResultList: document.querySelector(".results__list"),
  searchResultsDiv: document.querySelector(".results"),
  pageBtns: document.querySelector(".results__pages")
};
exports.elements = elements;
var elementsString = {
  loader: "loader"
};
exports.elementsString = elementsString;
var clearLoader = function clearLoader() {
  var loader = document.querySelector(".".concat(elementsString.loader));
  if (loader) loader.parentElement.removeChild(loader);
};
exports.clearLoader = clearLoader;
var renderLoader = function renderLoader(parent) {
  var loader = " \n  <div class=\"".concat(elementsString.loader, "\">\n  <svg>\n      <use href=\"img/icons.svg#icon-cw\">\n  </svg>\n</div>");
  parent.insertAdjacentHTML("afterbegin", loader);
};
exports.renderLoader = renderLoader;