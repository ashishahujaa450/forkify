import {domData, renderLoader, clearLoader} from './base';
import {titleFormat} from './searchView';


export const addLikeItemView = (title, author, img, id) => {
    const markup = `
    <li>
        <a class="likes__link" href="#${id}">
            <figure class="likes__fig">
                <img src="${img}" alt="${title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${titleFormat(title)}</h4>
                <p class="likes__author">${author}</p>
            </div>
        </a>
    </li>
    `;

    domData.likeList.insertAdjacentHTML('beforeend', markup)
}


//toggle heart icon
export const toggleIcon = (arg) => {
    if(arg){
        domData.likeIconWrapper.style.visibility = 'hidden';
    } else {
        domData.likeIconWrapper.style.visibility = 'visible';
    }
}


//delete item from view
export const removeLikeItemView = (id) => {
    const element = document.querySelector(`a.likes__link[href="#${id}"]`);
    element.parentElement.removeChild(element);
}

export const toggleLikeButton = (isLike) => {
    const iconName = isLike ? 'icon-heart' : 'icon-heart-outlined';

    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconName}`)
}