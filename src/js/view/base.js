export const domData = {
    searchForm: document.querySelector('form.search'),
    searchQuery: document.querySelector('.search__field'),
    searchListing: document.querySelector('.results__list'),
    resultWrapper: document.querySelector('.results'),
    buttonWrapper: document.querySelector('.results__pages'),
    recipeWrapper: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
    likeList: document.querySelector('.likes__list'),
    likeIconWrapper: document.querySelector('.likes__field')
}


const elmString = {
    loader: 'loader'
}

// render loader
export const renderLoader = (parent) => {
    const markup = `
    <div class="${elmString.loader}">
        <svg>
            <use href="img/icons.svg#icon-cw"></use>
        </svg>
    </div>
    `;

    parent.insertAdjacentHTML('afterbegin', markup)
};



//clearing cloader
export const clearLoader = () => {
    const loader = document.querySelector(`.${elmString.loader}`);


    //check if loader exists
    if(loader) loader.parentElement.removeChild(loader)
}