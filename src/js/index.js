require("@babel/polyfill");
import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
// let search = new Search("pasta");

// search.doSearch().then((r) => console.log(r));

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
