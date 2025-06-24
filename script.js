// DOM Elements
const form = document.getElementById("item-form");
const itemList = document.getElementById("item-list");

// ======================
// HELPER FUNCTIONS
// ======================

/**
 * Creates an icon element with specified classes
 * @param {Array<string>} classes - Array of CSS classes to apply
 * @returns {HTMLElement} - The created icon element
 */
function createIcon(classes) {
  const icon = document.createElement("i");
  classes.forEach((cls) => {
    icon.classList.add(cls);
  });
  return icon;
}

/**
 * Creates a close button with specified classes
 * @param {Array<string>} classes - Array of CSS classes to apply
 * @returns {HTMLElement} - The created button element
 */
function createCloseButton(classes) {
  const button = document.createElement("button");
  button.setAttribute("name", "remove-item");
  classes.forEach((cls) => {
    button.classList.add(cls);
  });

  const iconClasses = ["fa-solid", "fa-xmark"];
  const icon = createIcon(iconClasses);
  button.appendChild(icon);

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
  const text = document.createTextNode(name);
  li.appendChild(text);

  const buttonClasses = ["remove-item", "btn-link", "text-red"];
  const button = createCloseButton(buttonClasses);
  li.appendChild(button);

  return li;
}

// ======================
// EVENT HANDLERS
// ======================

/**
 * Handles form submission to add new items
 * @param {Event} e - The form submit event
 */
function addItem(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const name = formData.get("item");

  if (!name.trim()) {
    alert("Please enter an item name to add");
    return;
  }

  const item = createItem(name);
  itemList.appendChild(item);
  form.reset();
  checkUI();
}

/**
 * Handles click events on remove buttons
 * @param {Event} e - The click event
 */
function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.stopPropagation();
    const parentItem = e.target.parentElement.parentElement;
    parentItem.remove();
    checkUI();
  }
}

/**
 * Clears all items from the list
 */
function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkUI();
}

function checkUI() {
  if (itemList.children.length === 0) {
    document.getElementById("clear").style.display = "none";
    document.getElementById("filter").style.display = "none";
  } else {
    document.getElementById("clear").style.display = "block";
    document.getElementById("filter").style.display = "block";
  }
}

// ======================
// EVENT LISTENERS
// ======================
form.addEventListener("submit", addItem);
itemList.addEventListener("click", onClickItem);
document.getElementById("clear").addEventListener("click", clearItems);
checkUI();
