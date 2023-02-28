require("@babel/polyfill");
import Search from "./model/search";

// let search = new Search("pasta");

// search.doSearch().then((r) => console.log(r));

/**
 * web app төлөв
 * тухайн үзүүлж байгаа жор
 * лайкласан жорууд
 * захиалж байгаа жорын найрлаганууд
 */

const state = {};

const webApp = {
  search: ".search",
};

const controlSearch = async () => {
  // 1. вэбээс хайлтын түлхүүр үгийг гаргаж авна.
  const query = "pizza";
  if (query) {
    // 2. шинээр хайлтын обьеютийг үүсгэж өгнө
    state.search = new Search(query);
    // 3. хайлт хийхэд зориулж дэлгэцийг UI бэлтгэнэ

    // 4. хайлтыг гүйцэтгэнэ
    await state.search.doSearch();
    // 5. хайлтын үр дүнг дэлгэцэнд үзүүлнэ
    console.log(state.search.result);
  }
};

document.querySelector(webApp.search).addEventListener("submit", (e) => {
  e.preventDefault();
  controlSearch();
});
