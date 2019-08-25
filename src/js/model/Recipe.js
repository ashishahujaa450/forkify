import {key, proxy} from './../config';
import axios from 'axios';


export default class Recipe{
    constructor(id){
        this.id = id
    }

    async getRecipe(){
        try{
            const response = await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
            
            const recipe = response.data.recipe;

            //setting data to recipe object
            this.title = recipe.title;
            this.sourceUrl = recipe.source_url;
            this.recipeId = recipe.recipe_id;
            this.publisher = recipe.publisher;
            this.ingredients = recipe.ingredients;
            this.imgUrl = recipe.image_url;
            this.servings = 4;

        }catch(error){
            alert(error)
        }
    }


    parseIngredients(){
        const unitOld = ['tablespoons', 'tablespoon', 'cups', 'cup', 'ounces', 'teaspoons', 'teaspoon', 'pounds'];
        const unitNew = ['tbsp', 'tbsp', 'cup', 'cup', 'oz', 'tsp', 'tsp', 'pound']
        const allUnits = [...unitOld, 'kg', 'g']


        const newIngredient = this.ingredients.map((item) => {
            let ingred = item.toLowerCase();


            //change units to common
            unitOld.forEach((elmn, index) => {
                ingred = ingred.replace(elmn, unitNew[index])
            })


            //remmove parentheses
            ingred = ingred.replace(/ *\([^)]*\) */g, " ");


            //seperate count, unit & ing into new object
            const ingredArr = ingred.split(' ');
            const unitIndex = ingredArr.findIndex((elment) => allUnits.includes(elment));



            let objectIngredient;
            let countNum;


            if(unitIndex !== -1){
                //there is a unit
                const arrCount = ingredArr.slice(0, unitIndex);
                
                if(arrCount.length === 1){
                    countNum = eval(ingredArr[0].replace('-', '+'))
                } else{
                    countNum = eval(ingredArr.slice(0, unitIndex).join('+'))
                }

                objectIngredient = {
                    count: countNum,
                    unit: ingredArr[unitIndex],
                    ingredient: ingredArr.slice(unitIndex+1).join(' ')
                }

            } else if(parseInt(ingredArr[0], 10)){
                //there is no unit only number and ingredient
                objectIngredient = {
                    count: parseInt(ingredArr[0]),
                    unit: ' ',
                    ingredient: ingredArr.slice(1).join(' ')

                }

            } else if(unitIndex === -1) {
                //there is no unit but no number
                objectIngredient = {
                    count: 1,
                    unit: ' ',
                    ingredient: ingred

                }

            }

            return objectIngredient;
        })

        this.ingredients = newIngredient;
    }

    calcTime(){
        //assuming that we need 15 minutes for every 3 ingredients
        const numIng = this.ingredients.length;
        const period = Math.floor(numIng / 3);
        this.time = period * 15;
    }

    updateServings(type){
        const newSeving = type === 'dec' ? this.servings - 1 : this.servings + 1;

        this.ingredients.forEach((item) => {
            item.count = item.count * (newSeving / this.servings);
        })


        //update serving into object
        this.servings = newSeving;
        
    }
}