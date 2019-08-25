export default class Like{
    constructor(){
        this.likes = [];
    }

    addLikes(title, author, img, id){
        const likeItem = {
            title,
            author,
            img,
            id
        }

        this.likes.push(likeItem);

        //setting presist storage
        this.setStorage()

        return likeItem;
    }

    removeItem(id){
        const index = this.likes.findIndex((elm) => elm.id === id);
        this.likes.splice(index, 1);

        //setting presist storage
        this.setStorage()
    }

    isLiked(id){
        return this.likes.find((elm) => elm.id === id)
    }

    getLength(){
        return this.likes.length;
    }

    setStorage(){
        localStorage.setItem('like', JSON.stringify(this.likes));
    }

    getStorage(){
        const storage = JSON.parse(localStorage.getItem('like'));

        if(storage) this.likes = storage;
    }
}