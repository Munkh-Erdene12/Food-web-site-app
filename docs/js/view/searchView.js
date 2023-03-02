"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderRecipes = exports.getInput = exports.clearSearchResult = exports.clearSearchQuery = void 0;
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.array.slice.js");
var _base = require("./base");
var renderRecipe = function renderRecipe(recipe) {
  var markup = "     \n  <li>\n  <a class=\"results__link\" href=\"".concat(recipe.recipe_id, "\">\n      <figure class=\"results__fig\">\n          <img src=\"").concat(recipe.image_url, "\" alt=\"Test\">\n      </figure>\n      <div class=\"results__data\">\n          <h4 class=\"results__name\">").concat(recipe.title, "</h4>\n          <p class=\"results__author\">").concat(recipe.publisher, "</p>\n      </div>\n  </a>\n</li>");

  // ul рүүгээ нэмнэ
  _base.elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};
var clearSearchQuery = function clearSearchQuery() {
  _base.elements.searchInput.value = "";
};
exports.clearSearchQuery = clearSearchQuery;
var clearSearchResult = function clearSearchResult() {
  _base.elements.searchResultList.innerHTML = "";
  _base.elements.pageBtns.innerHTML = "";
};
exports.clearSearchResult = clearSearchResult;
var getInput = function getInput() {
  return _base.elements.searchInput.value;
};
exports.getInput = getInput;
var renderRecipes = function renderRecipes(recipes) {
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var resPage = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10;
  // хайлтын үр дүнг хуудслаж үзүүлэх
  var start = (page - 1) * resPage;
  var end = page * resPage;
  recipes.slice(start, end).forEach(renderRecipe);
  // хуудаслалтын товчуудыг гаргаж ирэх
  var totalPages = Math.ceil(recipes.length / resPage);
  renderButtons(page, totalPages);
};
exports.renderRecipes = renderRecipes;
var createBtn = function createBtn(pages, type, direction) {
  return "   \n <button class=\"btn-inline results__btn--".concat(type, "\" data-goto=").concat(pages, ">\n<svg class=\"search__icon\">\n    <use href=\"img/icons.svg#icon-triangle-").concat(direction, "\"></use>\n</svg>\n<span>\u0425\u0443\u0443\u0434\u0430\u0441 ").concat(pages, "</span>\n</button>");
};
var renderButtons = function renderButtons(page, totalPages) {
  var buttonHTML;
  if (page === 1 && totalPages > 1) {
    // 1-р хуудсан дээр байна, 2-р хуудас гэдэг товчийг гарга
    buttonHTML = createBtn(2, "next", "right");
  } else if (page < totalPages) {
    buttonHTML = createBtn(page - 1, "prev", "left");
    buttonHTML += createBtn(page + 1, "next", "right");
  } else if (page == totalPages) {
    // хамгийн сүүлийн хуудас дээр байна.
    buttonHTML = createBtn(page - 1, "prev", "left");
  }
  _base.elements.pageBtns.insertAdjacentHTML("afterbegin", buttonHTML);
};