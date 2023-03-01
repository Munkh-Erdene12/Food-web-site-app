import { elements } from "./base";

const renderRecipe = (recipe) => {
  const markup = `     
  <li>
  <a class="results__link" href="${recipe.recipe_id}">
      <figure class="results__fig">
          <img src="${recipe.image_url}" alt="Test">
      </figure>
      <div class="results__data">
          <h4 class="results__name">${recipe.title}</h4>
          <p class="results__author">${recipe.publisher}</p>
      </div>
  </a>
</li>`;

  // ul рүүгээ нэмнэ
  elements.searchResultList.insertAdjacentHTML("beforeend", markup);
};

export const clearSearchQuery = () => {
  elements.searchInput.value = "";
};
export const clearSearchResult = () => {
  elements.searchResultList.innerHTML = "";
  elements.pageBtns.innerHTML = "";
};
export const getInput = () => elements.searchInput.value;
export const renderRecipes = (recipes, page = 1, resPage = 10) => {
  // хайлтын үр дүнг хуудслаж үзүүлэх
  const start = (page - 1) * resPage;
  const end = page * resPage;
  recipes.slice(start, end).forEach(renderRecipe);
  // хуудаслалтын товчуудыг гаргаж ирэх
  const totalPages = Math.ceil(recipes.length / resPage);
  renderButtons(page, totalPages);
};

const createBtn = (
  pages,
  type,
  direction
) => `    <button class="btn-inline results__btn--${type}" data-goto=${pages}>
<svg class="search__icon">
    <use href="img/icons.svg#icon-triangle-${direction}"></use>
</svg>
<span>Хуудас ${pages}</span>
</button>`;

const renderButtons = (page, totalPages) => {
  let buttonHTML;
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
  elements.pageBtns.insertAdjacentHTML("afterbegin", buttonHTML);
};
