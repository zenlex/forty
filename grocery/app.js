// ****** SELECT ITEMS **********
const alert = document.querySelector('.alert');
const form = document.querySelector('.grocery-form');
const grocery = document.getElementById('grocery');
const submitBtn = document.querySelector('.submit-btn');
const container = document.querySelector('.grocery-container');
const list = document.querySelector('.grocery-list');
const clearBtn = document.querySelector('.clear-btn');

// edit option
let editElement;
let editFlag = false;
let editID = "";

// ****** EVENT LISTENERS **********
//submit form
form.addEventListener('submit', addItem);

//clear list button
clearBtn.addEventListener('click', clearList);

// ****** FUNCTIONS **********
function addItem(e) {
    e.preventDefault();

    const value = grocery.value;
    const id = new Date().getTime().toString();

    //add new list item
    if (value && !editFlag) {
        const elem = document.createElement('article');

        //add class
        elem.classList.add('grocery-item');

        //add id
        elem.setAttribute('data-id', id);

        //insert HTML for new item
        elem.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;

        //add edit and delete listeners
        const editBtn = elem.querySelector('.edit-btn');
        const deleteBtn = elem.querySelector('.delete-btn');

        editBtn.addEventListener('click', editItem);
        deleteBtn.addEventListener('click', deleteItem);

        //append item
        list.append(elem);

        //display alert
        displayAlert('item added', 'success');

        //show list
        container.classList.add('show-container');
        addToLocalStorage(id, value);
        resetDefaults();

    } else if (value && editFlag) {
        //update item
        editElement.innerHTML = value;
        displayAlert('edit successful', 'success');
        editLocalStorage(editID, value);
        resetDefaults();

    } else {
        //empty input error
        displayAlert('please enter value', 'danger');
    }
}
//reset default params
function resetDefaults() {
    grocery.value = ""
    editFlag = false;
    editID = "";
    submitBtn.textContent = "submit"
}


//display an alert
function displayAlert(txt, action) {
    alert.textContent = txt;

    alert.classList.add(`alert-${action}`);

    //remove alert
    setTimeout(function () {
        alert.textContent = '';
        alert.classList.remove(`alert-${action}`);
    }, 1000);
}

//clear list function
function clearList() {
    let items = list.querySelectorAll('.grocery-item');
    if (items.length > 0) {
        items.forEach(function (item) {
            item.remove();
        })
    }
    container.classList.remove('show-container');
    displayAlert('emptied list', 'danger');
    //localStorage.removeItem(list);
    resetDefaults();
}

//edit item
function editItem(e) {
    editFlag = true;
    const element = e.target.closest('.grocery-item')
    if (!element) return;

    editElement = element.querySelector('.title');
    editID = element.dataset.id;

    grocery.value = editElement.innerHTML;
    submitBtn.textContent = 'save';
    //localStorage.setItem(id, value)
}

//delete item
function deleteItem(e) {
    const target = e.currentTarget.closest('.grocery-item');
    console.log(`preparing to delete target:${target.classList[0]}`)
    if (target) {
        target.remove();
    }
    if (list.children.length === 0) {
        console.log('removing show-container');
        container.classList.remove('show-container');
    }
    resetDefaults();
    //localStorage.deleteItem(id);
}

// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
    const grocery = { id, value };
    console.log(grocery);
}
function editLocalStorage(id, value) {
    console.log(id, value);
}

// ****** SETUP ITEMS **********
