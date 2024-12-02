// Select DOM element
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Load tasks from localStorage on page load
window.addEventListener('load', () => {
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  storedTasks.forEach((task) => {
    addTask(task.text, task.completed);
  });
});

// Function to add a new task
function addTask(taskText, isCompleted = false) {
  // Create task container
  const taskItem = document.createElement('li');
  taskItem.className = 'task';

  // Task content
  const taskContent = document.createElement('span');
  taskContent.textContent = taskText;
  if (isCompleted) {
    taskContent.classList.add('completed');
  }

  // Complete button
  const completeBtn = document.createElement('button');
  completeBtn.textContent = 'Complete';
  completeBtn.addEventListener('click', () => {
    taskContent.classList.toggle('completed');
    saveTasks(); // Save updated task state
  });

  // Delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', () => {
    taskList.removeChild(taskItem);
    saveTasks(); // Save updated task list
  });

  // Append elements to task item
  taskItem.appendChild(taskContent);
  taskItem.appendChild(completeBtn);
  taskItem.appendChild(deleteBtn);

  // Add task to task list
  taskList.appendChild(taskItem);

  // Save tasks to localStorage
  saveTasks();
}

// Event listener for "Add Task" button
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    addTask(taskText);
    taskInput.value = ''; // Clear input field
  }
});

// Event listener for "Enter" key press
taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
      addTask(taskText);
      taskInput.value = ''; // Clear input field
    }
  }
});

// Function to save tasks to localStorage
function saveTasks() {
  const tasks = [];
  document.querySelectorAll('.task span').forEach((task) => {
    tasks.push({ text: task.textContent, completed: task.classList.contains('completed') });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
