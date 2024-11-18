const inputForm = document.getElementById("inputForm");
const inputItem = document.getElementById("inputItem");
const itemList = document.getElementById("itemList");

let itemsArray = JSON.parse(localStorage.getItem("itemsArray")) || [];

function saveItemsToLocalStorage() {
    localStorage.setItem("itemsArray", JSON.stringify(itemsArray));
}

function addBook(event) {
    event.preventDefault();
    const newBookText = inputItem.value.trim();

    if (newBookText !== "") {
        const newBook = { text: newBookText, status: "available" };

        itemsArray.push(newBookText);
        console.log(itemsArray);

        const newListIteam = createListIteam(newBookText);

        itemList.appendChild(newListIteam);
        inputItem.value = "";

        updateEmptyMessage();

        saveItemsToLocalStorage();

    } else {
        alert("Du måste skriva en text");
    }

};




inputForm.addEventListener("submit", addBook);