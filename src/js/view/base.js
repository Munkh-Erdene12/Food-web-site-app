export const elements = {
  searchForm: document.querySelector(".search"),
  searchInput: document.querySelector(".search__field"),
  searchResultList: document.querySelector(".results__list"),
  searchResultsDiv: document.querySelector(".results"),
  pageBtns: document.querySelector(".results__pages"),
  recipeDiv: document.querySelector(".recipe"),
  shoppingList: document.querySelector(".shopping__list"),
};
export const elementsString = {
  loader: "loader",
};
export const clearLoader = () => {
  const loader = document.querySelector(`.${elementsString.loader}`);
  if (loader) loader.parentElement.removeChild(loader);
};
export const renderLoader = (parent) => {
  const loader = ` 
  <div class="${elementsString.loader}">
  <svg>
      <use href="img/icons.svg#icon-cw">
  </svg>
</div>`;
  parent.insertAdjacentHTML("afterbegin", loader);
};
