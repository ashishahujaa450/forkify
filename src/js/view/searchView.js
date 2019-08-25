import {domData} from './base';


//getting query from ui
export const getQuery = () => domData.searchQuery.value;


// clear the search result
export const clearResult = () => {
    domData.searchQuery.value = '';
}

export const clearList = () => {
    domData.searchListing.innerHTML = '';
    domData.buttonWrapper.innerHTML = '';
}



//title length formatter
export const titleFormat = (title, length = 17) => {
    const titleArr = [];

    if(title.length > length){
        title.split(' ').reduce((acc, curr) => {
            if(acc + curr.length <= length){
                titleArr.push(curr);
            }

            return (acc + curr.length);
        }, 0)

        return `${titleArr.join(' ')}...`
    }


    return title;
}


//render indivudal item
const renderItem = (recipeObj) => {
    const markup = `
    <li>
        <a class="results__link" href="#${recipeObj.recipe_id}">
            <figure class="results__fig">
                <img src="${recipeObj.image_url}" alt="${recipeObj.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${titleFormat(recipeObj.title)}</h4>
                <p class="results__author">${recipeObj.publisher}</p>
            </div>
        </a>
    </li>
    `;

    domData.searchListing.insertAdjacentHTML('beforeend', markup);
}

//button rendering
const renderButton = (page, recPerPage, totalItems) => {

    const pages = totalItems / recPerPage;


    let markup = '';

    if(page === 1){
        //show only next button
        markup = createButton('next', page)
    } else if(page < pages && pages > 1){

        //show both buttons
        markup = `${createButton('prev', page)} ${createButton('next', page)}`
    } else if(page === pages && pages > 1){
        //show only prev button
        markup = createButton('prev', page)
    }


    domData.buttonWrapper.insertAdjacentHTML('beforeend', markup)

}


const createButton = (type, page) => {
    return `
    <button class="btn-inline results__btn--${type === 'prev' ? 'prev' : 'next'}" data-goto="${type === 'prev' ? (page - 1) : (page + 1)}">
    <span>Page ${type === 'prev' ? (page - 1) : (page + 1)}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
        </svg>
    </button>
    `;
}


//render search query and listing to side menu
export const renderSearch = (recipeArr, page = 1, recPerPage = 10) => {
    const start = (page - 1) * recPerPage;
    const end = (page) * recPerPage;

    recipeArr.slice(start, end).forEach((item) => {
        renderItem(item)
    });

    //render buttons
    renderButton(page, recPerPage, recipeArr.length)
}