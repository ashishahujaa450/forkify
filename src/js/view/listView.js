import {domData, renderLoader, clearLoader} from './base';


//add item into view
export const additemView = (item) => {
    const markup = `
    <li class="shopping__item" data-id="${item.id}">
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>
    `;

    domData.shoppingList.insertAdjacentHTML('beforeend', markup);
}


//delete item from view
export const removeItemView = (id) => {
    const element = document.querySelector(`.shopping__item[data-id="${id}"]`);

    element.parentElement.removeChild(element);
}