import {key, proxy} from './../config';
import axios from 'axios';


export default class Search{
    constructor(query){
        this.query = query;
    }

    async SearchQuery(){
        try{
            const response = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            this.result = response.data.recipes;

        }catch(error){
            console.log(error)
        }
    }


}