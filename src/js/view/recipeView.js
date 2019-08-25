import {domData, renderLoader, clearLoader} from './base';
import {Fraction} from 'fractional';


//format count using fractional
const formatCount = (number) => {
    if(number){
        const count = (Math.round(number * 10000) / 10000)

        const [int, dec] = count.toString().split('.').map((el) => parseInt(el));

        if(!dec) return int;

        if(int === 0){
            const fr = new Fraction(count);
            return `${fr.numerator}/${fr.denominator}`
        } else{
            const fr = new Fraction(count-int);
            return `${int} ${fr.numerator}/${fr.denominator}`
        }
    }

    return '?';
}


//update servings into view
export const updateServingView = (recipe) => {
    //update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;

    //update ingredients
    const countsDiv = document.querySelectorAll('.recipe__count');
    Array.from(countsDiv).forEach((item, index) => item.textContent = recipe.ingredients[index].count)
}



//clear recpie list
export const clearListing = () => {
    domData.recipeWrapper.innerHTML = '';
}



const renderIngredients = (ingredientArr) => {   
    let markup = '';

    ingredientArr.forEach((item) => {
        markup += createIngredHtml(item)
    })

    return markup;
}

const createIngredHtml = (ingredient) => {
    return `
    <li class="recipe__item">
        <svg class="recipe__icon">
            <use href="img/icons.svg#icon-check"></use>
        </svg>
        <div class="recipe__count">${formatCount(ingredient.count)}</div>
        <div class="recipe__ingredient">
            <span class="recipe__unit">${ingredient.unit}</span>
            ${ingredient.ingredient}
        </div>
    </li>
    `;


}


// render recipe
export const renderRecipe = (recipeDetail, islike) => {
    const markup = `
    <figure class="recipe__fig">
                <img src="${recipeDetail.imgUrl}" alt="${recipeDetail.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipeDetail.title}</span>
                </h1>
            </figure>
            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipeDetail.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipeDetail.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart${islike ? '' : '-outlined'}"></use>
                    </svg>
                </button>
            </div>



            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                   ${renderIngredients(recipeDetail.ingredients)}
                </ul>

                <button class="btn-small recipe__btn">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipeDetail.publisher}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipeDetail.sourceUrl}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
    `

    domData.recipeWrapper.insertAdjacentHTML('beforeend', markup)
}    