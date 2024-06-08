document.addEventListener('DOMContentLoaded', loadTasks);
document.querySelector('#task-form').addEventListener('submit', addTask);

function addTask(e) {
    e.preventDefault();
    const taskInput = document.querySelector('#task-input');
    const prioritySelect = document.querySelector('#priority-select');
    const taskText = taskInput.value.trim();
    const priority = prioritySelect.value;
    if (taskText !== '' && priority !== '') {
        const taskList = document.querySelector('#task-list');
        const li = document.createElement('li');
        li.className = priority;
        li.appendChild(document.createTextNode(`${taskText} (${priority})`));
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteTask);
        li.appendChild(deleteBtn);
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', completeTask);
        li.appendChild(completeBtn);
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', editTask);
        li.appendChild(editBtn);
        taskList.appendChild(li);
        saveTask(taskText, priority);
        taskInput.value = '';
        prioritySelect.selectedIndex = 0;  // Reset priority select to placeholder
    }
}

function deleteTask(e) {
    const li = e.target.parentElement;
    const taskText = li.firstChild.textContent.split(' (')[0];
    li.remove();
    removeTask(taskText);
}

function completeTask(e) {
    const li = e.target.parentElement;
    li.classList.toggle('complete');
}

function editTask(e) {
    const li = e.target.parentElement;
    const taskText = li.firstChild.textContent.split(' (')[0];
    const priority = li.className;
    document.querySelector('#task-input').value = taskText;
    document.querySelector('#priority-select').value = priority;
    deleteTask(e);
}

function saveTask(task, priority) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push({ text: task, priority: priority });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const taskList = document.querySelector('#task-list');
        const li = document.createElement('li');
        li.className = task.priority;
        li.appendChild(document.createTextNode(`${task.text} (${task.priority})`));
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', deleteTask);
        li.appendChild(deleteBtn);
        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.addEventListener('click', completeTask);
        li.appendChild(completeBtn);
        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.addEventListener('click', editTask);
        li.appendChild(editBtn);
        taskList.appendChild(li);
    });
}

function removeTask(task) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(t => t.text !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
