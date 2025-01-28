// script.js
document.addEventListener('DOMContentLoaded', () => {
    const addTaskButton = document.getElementById('addTaskButton');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Load tasks from localStorage
    loadTasks();

    // Add task
    addTaskButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const task = {
                id: Date.now(),
                text: taskText,
                completed: false
            };
            saveTask(task);
            addTaskToDOM(task);
            taskInput.value = '';
        }
    });

    // Toggle task completion
    taskList.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
            const taskId = event.target.dataset.id;
            toggleTaskCompletion(taskId);
        } else if (event.target.classList.contains('delete')) {
            const taskId = event.target.parentElement.dataset.id;
            deleteTask(taskId);
        }
    });

    // Add task to DOM
    function addTaskToDOM(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id;
        if (task.completed) {
            li.classList.add('completed');
        }
        li.innerHTML = `${task.text} <button class="delete">Delete</button>`;
        taskList.appendChild(li);
    }

    // Save task to localStorage
    function saveTask(task) {
        const tasks = getTasksFromLocalStorage();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Get tasks from localStorage
    function getTasksFromLocalStorage() {
        const tasks = localStorage.getItem('tasks');
        return tasks ? JSON.parse(tasks) : [];
    }

    // Load tasks on page load
    function loadTasks() {
        const tasks = getTasksFromLocalStorage();
        tasks.forEach(task => {
            addTaskToDOM(task);
        });
    }

    // Toggle task completion
    function toggleTaskCompletion(taskId) {
        const tasks = getTasksFromLocalStorage();
        const task = tasks.find(t => t.id === parseInt(taskId));
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));

        const taskElement = document.querySelector(`[data-id="${taskId}"]`);
        taskElement.classList.toggle('completed');
    }

    // Delete task
    function deleteTask(taskId) {
        let tasks = getTasksFromLocalStorage();
        tasks = tasks.filter(task => task.id !== parseInt(taskId));
        localStorage.setItem('tasks', JSON.stringify(tasks));

        const taskElement = document.querySelector(`[data-id="${taskId}"]`);
        taskElement.remove();
    }
});
