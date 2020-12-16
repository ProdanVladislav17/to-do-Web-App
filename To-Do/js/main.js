import ToDoList from "./todolist.js";
import ToDoItem from "./todoitem.js";

const toDoList = new ToDoList();
document.addEventListener("readystatechange", (event) => {
    if (event.target.redyState === "complete") {
        initApp();
    }
});

const initApp = () => {
    const itemEntryForm = document.getElementById("itemEntryForm");
    itemEntryForm.addEventListener("submit",(event) => {
        event.preventDefault();
        processSubmission();
    });

   refreshThePage();
};

const refreshThePage = () => {
    clearListDisplay();
    renderList();
    clearItemEntryField();
    setFocusOnItemEntry();

};

const clearListDisplay = () => {
    const parentElement = document.getElementById("listItems");
    deleteContents(parentElement);
};

const deleteContents = (parentElement) => {
    let child = parentElement.lastElementChild;
    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }
};

const renderList = () => {
    const list = toDoList.getList();
    list.forEach((item) => {
        buildListItem(item);
    });
};

const buildListItem = (item) => {
    const div = document.createElement("div");
    div.className = "item";
    const check = document.createElement("input");
    check.type = "checkbox";
    check.id = item.getId();
    check.tabIndex = 0;
    addClickListenerToCheckbox(check);
    const label = document.createElement("label");
    label.htmlFor = item.getId();
    label.textContent = item.getItem();
    div.appendChild(check);
    div.appendChild(label);
    const container = document.getElementById("listItems");
    container.appendChild(div);
    
};

const addClickListenerTocheckbox = (checkbox) => {
    checkbox.addEventListener("click", (event) => {
        toDoList.removeItemFromList(checkbox.id);
        setTimeout(() =>{
            refreshThePage();
        }, 1000);
    });

};

const clearItemEntryField = () => {
    document.getElementById("newItem").value = "";
}

const setFocusOnItemEntry = () => {
    document.getElementById("newItem").focus();

};

const processSubmission = () => {
    const newEntryText = getNewEntry();
    if (!newEntryText.length) return;
    const nextItemId = calcNextItemId();
    const ToDoItem = createNewItem(nextItemId , newEntryText);
    toDoList.addItemToList(toDoItem);
    refreshThePage();

 };

const getNewEntry = () => {
    return document.getElementById("newItem").value.trim();

};

const calcNextItemId = () => {
    let nextItemId = 1;
    const list = toDoList.getList();
    if (list.length > 0){
        nextItemId = list[list.length - 1].getId() + 1;
    }
    return nextItemId;
};

const createNewItem = (itemId, itemText) => {
    const toDo = new ToDoItem();
    toDo.setId(itemId);
    toDo.setItem(itemText);
    return toDo;
};

