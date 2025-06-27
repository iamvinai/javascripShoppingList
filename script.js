// ======================
// DOM ELEMENTS
// ======================
const form = document.getElementById("item-form");
const itemList = document.getElementById("item-list");
const inputbox = document.getElementById("item-input");
const frmbtn = document.querySelector(".btn");

// ======================
// STATE
// ======================
let isEditMode = false;

// ======================
// DOM MANIPULATION FUNCTIONS
// ======================

/**
 * Creates an icon element with specified classes
 * @param {string[]} classes - Array of CSS classes to apply
 * @returns {HTMLElement} - The created icon element
 */
function createIcon(classes) {
  const icon = document.createElement("i");
  icon.classList.add(...classes);
  return icon;
}

/**
 * Creates a close button with specified classes
 * @param {string[]} classes - Array of CSS classes to apply
 * @returns {HTMLElement} - The created button element
 */
function createCloseButton(classes) {
  const button = document.createElement("button");
  button.setAttribute("name", "remove-item");
  button.classList.add(...classes);
  button.appendChild(createIcon(["fa-solid", "fa-xmark"]));
  return button;
}

/**
 * Creates a new list item with text and a close button
 * @param {string} name - The name of the item
 * @returns {HTMLElement} - The created list item element
 */
function createItem(name) {
  const li = document.createElement("li");
  li.setAttribute("name", "item");
  li.textContent = name;
  li.appendChild(createCloseButton(["remove-item", "btn-link", "text-red"]));
  return li;
}

// ======================
// LOCAL STORAGE FUNCTIONS
// ======================

/**
 * Retrieves items from local storage
 * @returns {string[]} - Array of item names
 */
function getItemsFromStorage() {
  return JSON.parse(localStorage.getItem("items") || "[]");
}

/**
 * Saves items to local storage
 * @param {string[]} items - Array of item names to save
 */
function saveItemsToStorage(items) {
  localStorage.setItem("items", JSON.stringify(items));
}

/**
 * Adds an item to local storage
 * @param {string} name - Name of the item to add
 */
function addItemToLocalStorage(name) {
  const items = getItemsFromStorage();
  items.push(name);
  saveItemsToStorage(items);
}

/**
 * Removes an item from local storage
 * @param {string} name - Name of the item to remove
 */
function removeItemFromLocalStorage(name) {
  const items = getItemsFromStorage().filter((item) => item !== name);
  saveItemsToStorage(items);
}

// ======================
// UI UPDATE FUNCTIONS
// ======================

/**
 * Updates the UI based on current state
 */
function updateUI() {
  const hasItems = itemList.children.length > 0;
  document.getElementById("clear").style.display = hasItems ? "block" : "none";
  document.getElementById("filter").style.display = hasItems ? "block" : "none";
}

/**
 * Resets the form to its initial state
 */
function resetForm() {
  form.reset();
  isEditMode = false;
  frmbtn.innerHTML = "<i class='fa-solid fa-plus'></i> Add Item";
  frmbtn.classList.remove("update-mode");
  frmbtn.classList.add("add-mode");
  itemList
    .querySelectorAll(".edit-mode")
    .forEach((el) => el.classList.remove("edit-mode"));
}

// ======================
// EVENT HANDLERS
// ======================

/**
 * Handles form submission for adding/updating items
 * @param {Event} e - The form submit event
 */
function handleSubmit(e) {
  e.preventDefault();
  const name = inputbox.value.trim();

  if (!name) {
    alert("Please enter an item name to add");
    return;
  }

  if (isEditMode) {
    const item = itemList.querySelector(".edit-mode");
    if (item.textContent !== name) {
      removeItemFromLocalStorage(item.textContent);
      addItemToLocalStorage(name);
      item.textContent = name;
      item.appendChild(
        createCloseButton(["remove-item", "btn-link", "text-red"])
      );
    }
    resetForm();
  } else {
    if (
      localStorage.getItem("items") &&
      localStorage.getItem("items").includes(name)
    ) {
      alert("Item already exists");
      return;
    } else {
      const item = createItem(name);
      itemList.appendChild(item);
      addItemToLocalStorage(name);
      form.reset();
    }
  }

  updateUI();
}

/**
 * Handles click events on list items or remove buttons
 * @param {Event} e - The click event
 */
function handleItemClick(e) {
  if (isEditMode) {
    alert("Please finish editing the current item before adding a new one");
  } else if (e.target.parentElement.classList.contains("remove-item")) {
    e.stopPropagation();
    if (confirm("Are you sure you want to remove this item?")) {
      const item = e.target.closest("li");
      removeItemFromLocalStorage(item.textContent);
      item.remove();
      updateUI();
    }
  } else {
    editItem(e.target.closest("li"));
  }
}

/**
 * Enables edit mode for an item
 * @param {HTMLElement} item - The list item element to edit
 */
function editItem(item) {
  isEditMode = true;
  itemList
    .querySelectorAll("li")
    .forEach((li) => li.classList.remove("edit-mode"));
  item.classList.add("edit-mode");
  frmbtn.innerHTML = "<i class='fa-solid fa-pen'></i> Update Item";
  frmbtn.classList.remove("add-mode");
  frmbtn.classList.add("update-mode");
  inputbox.value = item.textContent;
  inputbox.focus();
}

/**
 * Clears all items from the list
 */
function clearItems() {
  if (confirm("Are you sure you want to clear all items?")) {
    localStorage.removeItem("items");
    itemList.innerHTML = "";
    updateUI();
  }
}

/**
 * Filters items based on search input
 * @param {Event} e - The input event
 */
function filterItems(e) {
  const searchTerm = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll("li");

  items.forEach((item) => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(searchTerm) ? "flex" : "none";
  });
}

/**
 * Initializes the application
 */
function init() {
  const items = getItemsFromStorage();
  items.forEach((item) => itemList.appendChild(createItem(item)));
  updateUI();

  // Ensure the button is in add mode when the app starts
  frmbtn.classList.add("add-mode");
}

// ======================
// EVENT LISTENERS
// ======================
form.addEventListener("submit", handleSubmit);
itemList.addEventListener("click", handleItemClick);
document.getElementById("clear").addEventListener("click", clearItems);
document.getElementById("filter").addEventListener("input", filterItems);
document.addEventListener("DOMContentLoaded", init);
