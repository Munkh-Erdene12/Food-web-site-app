require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import {
  renderRecipe,
  clearRecipe,
  highlightSelectRecipe,
} from "./view/recipeView";

/**
 * web app төлөв
 * тухайн үзүүлж байгаа жор
 * лайкласан жорууд
 * захиалж байгаа жорын найрлаганууд
 */

const state = {};

const controlSearch = async () => {
  // 1. вэбээс хайлтын түлхүүр үгийг гаргаж авна.
  const query = searchView.getInput();
  if (query) {
    // 2. шинээр хайлтын обьеютийг үүсгэж өгнө
    state.search = new Search(query);
    // 3. хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ
    await searchView.clearSearchQuery();
    await searchView.clearSearchResult();
    renderLoader(elements.searchResultsDiv);
    // 4. хайлтыг гүйцэтгэнэ
    await state.search.doSearch();
    // 5. хайлтын үр дүнг дэлгэцэнд үзүүлнэ
    // console.log(state.search.result);
    clearLoader();
    if (state.search.result == undefined) {
      alert("Хайлтаар илэрцгүй");
    } else {
      searchView.renderRecipes(state.search.result);
    }
  } else {
    alert("Та хайх зүйлээ оруулна уу!!!");
  }
};

elements.searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});

elements.pageBtns.addEventListener("click", (e) => {
  const btn = e.target.closest(".btn-inline ");
  if (btn) {
    const goto = parseInt(btn.dataset.goto);
    searchView.clearSearchResult();
    searchView.renderRecipes(state.search.result, goto);
  }
});

/**
 * Жорын контроллер
 */
const controlRecipe = async () => {
  // 1. URL-аас ID-ийг салгах
  const id = window.location.hash.replace("#", "");
  // 2. Жорийн моделийг үүсгэж өгнө
  state.recipe = new Recipe(id);
  // 3. UI дэлгэцийг бэлтгэнэ
  clearRecipe();
  renderLoader(elements.recipeDiv);
  highlightSelectRecipe(id);
  // 4. жороо татаж авчирна
  await state.recipe.getRecipe();
  // 5. жорыг гүйцэтгэх хугацаа болон орцыг тооцоолно
  clearLoader();
  state.recipe.calcTime();
  state.recipe.calcHuniiToo();
  // 6. жороо дэлгэц гаргана
  renderRecipe(state.recipe);
};
window.addEventListener("hashchange", controlRecipe);
window.addEventListener("load", controlRecipe);
