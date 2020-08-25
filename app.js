//Define UI vars
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const filter = document.querySelector("#filter");
const taskInput = document.querySelector("#task");

//load all event listeners call
loadEventListeners();

//load all event listeners declare
function loadEventListeners() {
  //DOM load even
  document.addEventListener("DOMContentLoaded", getTasks);
  //add task event
  form.addEventListener("submit", addTask);
  //remove task event
  taskList.addEventListener("click", removeTask);
  //clear task event
  clearBtn.addEventListener("click", clearTasks);
  //filter tasks
  filter.addEventListener("keyup", filterTasks);
}

//get tasks from local storage
function getTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(function (task) {
    //create li element
    const li = document.createElement("li");
    //add class
    li.className = "collection-item";
    //create text node and append to li
    li.appendChild(document.createTextNode(task));
    //create new link element
    const link = document.createElement("a");
    //add class
    link.className = "delete-item secondary-content";
    // add icon html
    link.innerHTML = "<i class='fa fa-remove'></i>";
    //append link to li
    li.appendChild(link);

    //apend li to ul
    taskList.appendChild(li);
  });
}

//add task
function addTask(event) {
  if (taskInput.value === "") {
    alert("Add a task!!");
  }

  //create li element
  const li = document.createElement("li");
  //add class
  li.className = "collection-item";
  //create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  //create new link element
  const link = document.createElement("a");
  //add class
  link.className = "delete-item secondary-content";
  // add icon html
  link.innerHTML = "<i class='fa fa-remove'></i>";
  //append link to li
  li.appendChild(link);

  //apend li to ul
  taskList.appendChild(li);

  //store in local storage
  storeTaskInLocalStorage(taskInput.value);

  //clear input
  taskInput.value = "";

  event.preventDefault();
}

//Store task
function storeTaskInLocalStorage(task) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Remove task
function removeTask(event) {
  if (event.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Remove this task item?")) {
      event.target.parentElement.parentElement.remove();

      //remove from local storage
      removeTaskFromLocalStorage(event.target.parentElement.parentElement);
    }
  }
}

//remove task from local storage
function removeTaskFromLocalStorage(taskItem) {
  console.log(taskItem);
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach(function (task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Clear tasks
function clearTasks() {
  //tasklist.innerHTML = "";
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }

  if (confirm("Clear all tasks from this list?")) {
    //clear from local storage
    clearTasksFromLocalStorage();
  }
  //https://jsperf.com/innerhtml-vs-removechild
}

//clear task from local storage
function clearTasksFromLocalStorage() {
  localStorage.clear();
}

//filter tasks
function filterTasks(event) {
  const text = event.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(function (task) {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
