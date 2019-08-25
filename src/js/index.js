import {domData, renderLoader, clearLoader} from './view/base';

import Search from './model/Search';
import Recipe from './model/Recipe';
import List from './model/List';
import Like from './model/Like';


import * as searchView from './view/searchView';
import * as recipeView from './view/recipeView';
import * as listView from './view/listView';
import * as likeView from './view/likeView';




/**
 * app state
 */

 const state = {}



/**
 * search controller
 */
domData.searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    controlSearch();
})

const controlSearch = async () => {
    //get query from view
    const query = searchView.getQuery();


    if(query){
        //create query object and push it into state 
        state.search = new Search(query)

        //prepare ui and clear results
        searchView.clearResult();
        searchView.clearList();


        renderLoader(domData.resultWrapper);

        //get query using ajax
        await state.search.SearchQuery()

        //update ui to show results
        clearLoader();
        searchView.renderSearch(state.search.result);
        
    }
}


/**
 * event delegation for next prev buttons
 */

 domData.resultWrapper.addEventListener('click', (e) => {

    //prev, next button clicked
     if(e.target.closest('.btn-inline')){

        //get goto page
        const goToPage = e.target.closest('.btn-inline').dataset.goto;
      
        //clearing lists
        searchView.clearList();
        searchView.clearResult();

        //render updated list and buttons
        searchView.renderSearch(state.search.result, parseInt(goToPage))
     }
 })


/**
 * window event
 */

 //hashchange event for update specefic recipe

 window.addEventListener('hashchange', (e) => {
     //get recipe id
     const recipeId = parseInt(location.hash.replace('#', ''));

     recipeController(recipeId);

 })


 window.addEventListener('load', (e) => {
     //create like object into state
    state.like = new Like();

    //get data from local storage
    state.like.getStorage();

    //setting toggle icon
    toggleLike();

    //add like items to view
    state.like.likes.forEach((elm) => {
        likeView.addLikeItemView(elm.title, elm.author, elm.img, elm.id);
    })


 })

 /**
  * toggle like icon
  */
const toggleLike = () => {
    if(state.like.getLength() === 0){
        //show heart icon
        likeView.toggleIcon(true)
    } else {
        //remove hear icon
        likeView.toggleIcon(false)
    }
}




 /**
  * recipe controller
  */

  const recipeController = async (recipeId) => {
     //create recipe object and update it into state
     state.recipe = new Recipe(recipeId);
 
      //prepare ui and clearrecipe
        recipeView.clearListing();
      renderLoader(domData.recipeWrapper);
 
 
      //get recipe using ajax & parse recpies
      await state.recipe.getRecipe();
      state.recipe.parseIngredients();
      state.recipe.calcTime()

      //clear loader
      clearLoader();
 
      //update ui
      recipeView.renderRecipe(state.recipe, state.like.isLiked(state.recipe.id));
      
  } 


//recipe event delegation for servings
domData.recipeWrapper.addEventListener('click', (e) => {



    //seriving updates event
    if(e.target.matches('.btn-decrease, .btn-decrease *')){
        if(state.recipe.servings > 1){
            //update serving into object
            state.recipe.updateServings('dec')

            //update serving view
            recipeView.updateServingView(state.recipe)
        }

    } else if(e.target.matches('.btn-increase, .btn-increase *')){
        //update servings into object
        state.recipe.updateServings('inc')

        //update serving view
        recipeView.updateServingView(state.recipe)
    }

    //add to shopping list event listenere
    if(e.target.matches('.recipe__btn, .recipe__btn *')){
        //create list object
        if(!state.list){
            state.list = new List();
        } 

        state.recipe.ingredients.forEach((elm) => {
            //update item into state
            const item = state.list.addItems(elm.count, elm.unit, elm.ingredient)

            //update item to ui
            listView.additemView(item)
        })
    } else if(e.target.matches('.recipe__love, .recipe__love *')){
        console.log('clck')
        likeController();      
    }
})  


/**
 * like controller
 */

 const likeController = () => {
     //recipe love button events
    //create like object and push it into state
    if(!state.like){
        state.like = new Like();
    }


    const id = state.recipe.id;

    //if user has not liked any recipe
    if(!state.like.isLiked(id)){
        //add to state
        state.like.addLikes(state.recipe.title, state.recipe.publisher, state.recipe.imgUrl, id);

        //toggle like button
        likeView.toggleLikeButton(true);
        
        //update ui
        likeView.addLikeItemView(state.recipe.title, state.recipe.publisher, state.recipe.imgUrl, id)
    } else {
        //remove like from the state
        state.like.removeItem(id)
        //toggle the like btn
        likeView.toggleLikeButton(false)

        //remove like from the ui 
        likeView.removeLikeItemView(id);
    }

    //toggle like heart button
    toggleLike()
    
 }


//adding listnere to shopping list

domData.shoppingList.addEventListener('click', (e) => {
    if(e.target.matches('.shopping__delete, .shopping__delete *')){
        //get clicked item id
        const id = e.target.closest('.shopping__item').dataset.id;

        //delete item from state
        state.list.removeItem(id)


        //remote item form ui
        listView.removeItemView(id);
    }
})







  //testing