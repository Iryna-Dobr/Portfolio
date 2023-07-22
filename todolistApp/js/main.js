function InitToDoList() {
    const newElem = document.querySelector('.new_todo')
    const saveButton = document.querySelector('.btn_save');
    const list = document.querySelector('.list');
    const clearButton = document.querySelector('.btn_clear');

    let todoList = [];
    let isEdit = false;
    let editIndex;

    saveButton.addEventListener('click', () => {
        if (newElem.value.trim() != '') {

            const localTodo = JSON.parse(localStorage.getItem('todo'));
            if (!isEdit) {

                todoList = localTodo === null ? [] : localTodo;

                const newTodo = {
                    todo: newElem.value,
                    checked: false
                };

                todoList.push(newTodo);
            } else {

                isEdit = false;
                todoList[editIndex].todo = newElem.value.trim();
            }


            localStorage.setItem('todo', JSON.stringify(todoList));
        }

        addTodo();

        newElem.value = '';
    })

    function addTodo() {
        const localTodo = JSON.parse(localStorage.getItem('todo'));

        if (localTodo === null) {
            todoList = [];
        } else {
            todoList = localTodo;
        }

        let template = '';

        todoList.forEach((item, i) => {
            template += `
            <li class="element_todo" id=${i}>
                <p class="element ${item.checked ? 'check' : ''}" id="${i}-edit">${item.todo}</p>
                <img class="edit" data-toggle-id="${i}-edit" src="./img/making-notes-green-16.png">
                <img class="delete" src="./img/icons8-16.png">
            </li>`
        });
        list.innerHTML = template;

    }

    addTodo();

    list.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete')) {
            const i = event.target.parentNode.id;

            deleteTodo(i);
        }

        if (event.target.classList.contains('edit')) {
            const i = event.target.parentNode.id;
            const id = event.target.dataset.toggleId;
            const val = document.getElementById(id).textContent;

            editTodo(i, val);
        }

        if (event.target.classList.contains('element')) {
            const i = event.target.parentNode.id;

            checkTodo(i);
        }

        addTodo();
    })

    function deleteTodo(index) {
        todoList.splice(index, 1);
        localStorage.setItem('todo', JSON.stringify(todoList));

        addTodo();
    }

    function checkTodo(index) {
        todoList[index].checked = !todoList[index].checked;
        localStorage.setItem('todo', JSON.stringify(todoList));

        addTodo();
    }

    function editTodo(index, elementName) {
        editIndex = index;
        isEdit = true;
        newElem.value = elementName;

        addTodo();
    }

    clearButton.addEventListener('click', () => {
        localStorage.clear();

        addTodo();
    })
}

document.addEventListener("DOMContentLoaded", InitToDoList);
