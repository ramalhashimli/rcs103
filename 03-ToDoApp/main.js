const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        taskItem.innerHTML = `
            <span>${taskText}</span>
            <button class="remove-btn">Sil</button>
        `;

        taskItem.querySelector('.remove-btn').addEventListener('click', () => {
            taskList.removeChild(taskItem);
        });

        taskList.appendChild(taskItem);
        taskInput.value = '';
    } else {
        alert('Lütfen bir görev girin.');
    }
}

addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});
