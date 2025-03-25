// script.js
document.addEventListener("DOMContentLoaded", () => {
    const todoForm = document.getElementById("todo-form");
    const todoInput = document.getElementById("todo-input");
    const todoList = document.getElementById("todo-list");
    const downloadBtn = document.getElementById("download-btn");

    let todos = [];

    // Load existing todos from local storage
    function loadTodos() {
        const storedTodos = JSON.parse(localStorage.getItem("todos"));
        if (storedTodos) {
            todos = storedTodos;
            renderTodos();
        }
    }

    // Save todos to local storage
    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    // Render todos
    function renderTodos() {
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${todo}
                <button onclick="editTodo(${index})">Edit</button>
                <button onclick="deleteTodo(${index})">Delete</button>
            `;
            todoList.appendChild(li);
        });
    }

    // Add a new todo
    todoForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const newTodo = todoInput.value;
        if (newTodo) {
            todos.push(newTodo);
            todoInput.value = "";
            saveTodos();
            renderTodos();
        }
    });

    // Edit a todo
    window.editTodo = (index) => {
        const newTodo = prompt("Edit your task:", todos[index]);
        if (newTodo) {
            todos[index] = newTodo;
            saveTodos();
            renderTodos();
        }
    };

    // Delete a todo
    window.deleteTodo = (index) => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
    };

    // Download todos as CSV
    downloadBtn.addEventListener("click", () => {
        const csvContent = "data:text/csv;charset=utf-8," + 
            todos.map(todo => `${todo}`).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "todos.csv");
        document.body.appendChild(link);
        link.click();
    });

    // Load initial todos
    loadTodos();
});
