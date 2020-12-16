export default class ToDoList {
    constructor() {
        this._list = [];

    }

    getList() {
        return this._list;

    }

    clearList() {
        this._list = [];
    }

    addItemToList(itemObj) {
        this.list.push(itemObj);
    }

    removeItemFromList(id) {
        const list = this.list;
        for(let i = 0; i < list.lenght; i++){
            if (list[i]._id == id) {
                list.splice(i, 1);
                break;
            }
        }
    }
}