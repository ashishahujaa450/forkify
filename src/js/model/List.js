import uniqid from 'uniqid';

export default class List{
    constructor(){
        this.items = []
    }

    addItems(count, unit, ingredient){
        const item = {
            count,
            unit,
            ingredient,
            id : uniqid()
        }

        //push object into item array
        this.items.push(item)

        return item;
    }

    removeItem(id){
        const index = this.items.findIndex((elm) => elm.id === id)

        this.items.splice(index, 1);
    }

    updateItemCount(id, newvalue){
        this.item.find((elm) => elm.id === id).count = newvalue;
    }
}