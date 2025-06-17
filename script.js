// DOM Elements
const form = document.getElementById("item-form");
const itemList = document.getElementById("item-list");

// Create DOM Elements Functions
/**
 * Creates a new list item with text and a close button
 * @param {string} name - The name of the item
 * @returns {HTMLElement} - The created list item element
 */
function createItem(name) {
  const li = document.createElement("li");
  const text = document.createTextNode(name);
  li.appendChild(text);

  const buttonClasses = ["remove-item", "btn-link", "text-red"];
  const button = createCloseButton(buttonClasses);
  li.appendChild(button);

  return li;
}

/**
 * Creates a close button with specified classes
 * @param {Array<string>} classes - Array of CSS classes to apply
 * @returns {HTMLElement} - The created button element
 */
function createCloseButton(classes) {
  const button = document.createElement("button");
  classes.forEach((cls) => {
    button.classList.add(cls);
  });

  const iconClasses = ["fa-solid", "fa-xmark"];
  const icon = createIcon(iconClasses);
  button.appendChild(icon);

  return button;
}

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

// Event Handlers
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
}

/**
 * Handles click events on remove buttons
 * @param {Event} e - The click event
 */
function onClickItem(e) {
  const parentItem = e.currentTarget.parentElement;
  parentItem.remove();
}

// Initialize Event Listeners
form.addEventListener("submit", addItem);

// Add click handlers for existing remove buttons
const removeButtons = document.querySelectorAll("button[name='remove-item']");
removeButtons.forEach((button) => {
  button.addEventListener("click", onClickItem);
});

// Add click handler for clear button
const clearButton = document.getElementById("clear");
clearButton.addEventListener("click", clearItems);

/**
 * Handles click events on clear button
 * @param {Event} e - The click event
 */
function clearItems() {
  const items = document.querySelectorAll("li[name='item']");
  items.forEach((item) => {
    item.remove();
  });
}
