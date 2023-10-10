const itemForm = document.getElementById('item-form');
const itemInput = document.getElementById('item-input');
const ul = document.getElementById('item-list');
const clearBtn = document.getElementById('clear-btn');
const filterInput = document.getElementById('item-filter');
const li = document.querySelectorAll('li');
const addItemBtn = document.getElementById('add');
let isEditMode = false;

const addItem = (e) => {
  e.preventDefault();

  const newItem = itemInput.value;

  //Validate Input
  if (newItem === '') {
    alert('Please add an item');
    return;
  }

  // Create LI
  const li = document.createElement('li');
  li.className =
    'flex justify-between items-center p-2 border-black border font-bold item';

  // Create Button
  const button = document.createElement('button');
  button.className = 'text-red-500 remove-btn';

  // Create Icon
  const icon = document.createElement('i');
  icon.className = 'fas fa-times';

  button.appendChild(icon);
  li.appendChild(document.createTextNode(newItem));
  li.appendChild(button);
  ul.appendChild(li);

  // Save to localStorage
  saveToLocalStorage(newItem);

  itemInput.value = '';

  checkUI();
};

// Remove Item
const removeItem = (e) => {
  if (e.target.parentElement.classList.contains('remove-btn')) {
    const li = e.target.parentElement.parentElement;
    const itemText = li.firstChild.textContent;
    li.remove();

    // Remove from localStorage
    removeFromLocalStorage(itemText);

    checkUI();
  }
};

// Clear All Items
const clearAllItems = () => {
  ul.innerHTML = ''; // Clear the ul element

  // Clear from localStorage
  localStorage.clear();

  checkUI();
};

//Edit Mode

const editItems = (e) => {
  isEditMode = true;
  e.target.classList.add('text-slate-400');
  addItemBtn.classList.add('bg-green-500');
  addItemBtn.innerHTML = '<i class="fa-solid fa-pen"></i>Update Item';
  itemInput.value = e.target.textContent;
};

// Save item to localStorage
const saveToLocalStorage = (item) => {
  const items = getItemsFromLocalStorage();
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
};

// Remove item from localStorage
const removeFromLocalStorage = (item) => {
  const items = getItemsFromLocalStorage();
  const updatedItems = items.filter((storedItem) => storedItem !== item);
  localStorage.setItem('items', JSON.stringify(updatedItems));
};

// Retrieve items from localStorage
const getItemsFromLocalStorage = () => {
  const items = localStorage.getItem('items');
  return items ? JSON.parse(items) : [];
};

// Load items from localStorage on page load
window.addEventListener('DOMContentLoaded', () => {
  const items = getItemsFromLocalStorage();
  items.forEach((item) => {
    const li = document.createElement('li');
    li.className =
      'flex justify-between items-center p-2 border-black border font-bold item';

    const button = document.createElement('button');
    button.className = 'text-red-500 remove-btn';

    const icon = document.createElement('i');
    icon.className = 'fas fa-times';

    button.appendChild(icon);
    li.appendChild(document.createTextNode(item));
    li.appendChild(button);
    ul.appendChild(li);
  });
});

//Check UI

const checkUI = () => {
  const li = document.querySelectorAll('li');

  if (li.length === 0) {
    clearBtn.style.display = 'none';
    filterInput.style.display = 'none';
  } else {
    clearBtn.style.display = 'block';
    filterInput.style.display = 'block';
  }
};

//Filter Items

const filterItems = () => {
  const searchTerm = filterInput.value.toLowerCase();
  const liElements = document.querySelectorAll('li');

  liElements.forEach((li) => {
    const itemText = li.textContent.toLowerCase();
    if (itemText.includes(searchTerm)) {
      li.style.display = 'flex'; // Show the matching item
    } else {
      li.style.display = 'none'; // Hide non-matching items
    }
  });
};

checkUI();
filterItems();

// Event Listeners
itemForm.addEventListener('submit', addItem);
ul.addEventListener('click', removeItem);
clearBtn.addEventListener('click', clearAllItems);
filterInput.addEventListener('input', filterItems);
ul.addEventListener('dblclick', editItems);
