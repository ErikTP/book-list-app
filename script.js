const inputForm = document.getElementById("inputForm");
const inputTitle = document.getElementById("inputTitle");
const inputAuthor = document.getElementById("inputAuthor");
const inputGenre = document.getElementById("inputGenre");
const itemList = document.getElementById("itemList");

let itemsArray = JSON.parse(localStorage.getItem("itemsArray")) || [];

function saveItemsToLocalStorage() {
    localStorage.setItem("itemsArray", JSON.stringify(itemsArray));
}

function addButtonsToItem(item, index) {
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "✖";
    removeButton.addEventListener("click", (event) => {
        removeItem(index);
    });

    const editButton = document.createElement("button");
    editButton.classList.add("edit-button");
    editButton.textContent = "✎";
    editButton.addEventListener("click", () => startEdit(index));

    buttonContainer.appendChild(removeButton);
    buttonContainer.appendChild(editButton);

    item.appendChild(buttonContainer);
}

function addItem(event) {
    event.preventDefault();
    const newTitle = inputTitle.value.trim();
    const newAuthor = inputAuthor.value.trim();
    const newGenre = inputGenre.value.trim();

    if (newTitle !== "" && newAuthor !== "" && newGenre !== "") {

        const newItem = {
            title: newTitle,
            author: newAuthor,
            genre: newGenre,
            status: "Tillgänglig"
        };

        itemsArray.push(newItem);

        renderItems();

        saveItemsToLocalStorage();

        inputTitle.value = "";
        inputAuthor.value = "";
        inputGenre.value = "";
    } else {
        alert("Alla fält måste fyllas i!");
    }
}

function renderItems() {
    itemList.innerHTML = "";

    itemsArray.forEach((item, index) => {
        const listItem = createListItem(item, index);
        itemList.appendChild(listItem);
    });

    updateEmptyMessage();
}

function createListItem(itemObject, index) {
    const listItem = document.createElement("li");

    let statusClass = "";
    switch (itemObject.status) {
        case "Tillgänglig":
            statusClass = "status-available";
            break;
        case "Reserverad":
            statusClass = "status-reserved";
            break;
        case "Utlånad":
            statusClass = "status-borrowed";
            break;
    }

    listItem.classList.add(statusClass);

    listItem.textContent = `Boktitel: ${itemObject.title} Författare: ${itemObject.author} Genre på boken: ${itemObject.genre} (${itemObject.status})`;


    addButtonsToItem(listItem, index);

    return listItem;
}


function removeItem(index) {
    itemsArray.splice(index, 1);

    saveItemsToLocalStorage();

    renderItems();
}

function startEdit(index) {
    const item = itemsArray[index];

    const newTitle = prompt("Ange ny titel:", item.title);
    const newAuthor = prompt("Ange ny författare:", item.author);
    const newGenre = prompt("Ange ny genre:", item.genre);
    const newStatus = prompt("Ange ny status (Tillgänglig, Utlånad, Reserverad):", item.status);

    const validStatuses = ["Tillgänglig", "Utlånad", "Reserverad"];


    if (newTitle && newAuthor && newGenre) {

        if (validStatuses.includes(newStatus.trim())) {
            item.title = newTitle.trim();
            item.author = newAuthor.trim();
            item.genre = newGenre.trim();
            item.status = newStatus.trim();
        } else {
            // Om statusen inte är giltig, sätt den till "Tillgänglig" (eller ett annat standardvärde)
            alert("Ogiltig status! Standardstatus 'Tillgänglig' kommer att användas.");
            item.title = newTitle.trim();
            item.author = newAuthor.trim();
            item.genre = newGenre.trim();
            item.status = "Tillgänglig";
        }

        saveItemsToLocalStorage();
        renderItems();
    } else {
        alert("Alla fält måste fyllas i!");
    }
}

function updateEmptyMessage() {
    let emptyMessage = document.getElementById("emptyMessage");

    const hasItems = Array.from(itemList.children).some(child => child.tagName === "LI");

    if (!hasItems) {
        if (!emptyMessage) {
            emptyMessage = document.createElement("p");
            emptyMessage.id = "emptyMessage";
            emptyMessage.textContent = "Listan är tom, börja lägga till böcker till din lista!";
            itemList.appendChild(emptyMessage);
        }
    } else {
        if (emptyMessage) {
            emptyMessage.remove();
        }
    }
}

function loadItemsFromLocalStorage() {
    renderItems();
}

function loadAndDisplayBooks() {
    const savedBooks = localStorage.getItem("booksArray");

    if (savedBooks) {
        booksArray = JSON.parse(savedBooks);
    } else {
        booksArray = []; 
    }

    renderBooks();
}

inputForm.addEventListener("submit", addItem);

loadItemsFromLocalStorage();

document.addEventListener("DOMContentLoaded", () => {
    loadAndDisplayBooks(); 
});
