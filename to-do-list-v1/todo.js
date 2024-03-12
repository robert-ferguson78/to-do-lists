let todoItems = [];
let doneItems = [];

// Generate a unique id for each todo item
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// create the todo item in the todo table
function renderTodo(todo) {
  const table = document.getElementById("todo-table");
  const row = table.insertRow(-1);
  const textCell = row.insertCell(0);
  textCell.innerText = todo.text;
  const dateCell = row.insertCell(1);
  dateCell.innerText = todo.textDate;
  const deleteCell = row.insertCell(2);
  deleteCell.innerHTML = `<a onClick="markDone('${todo.id}')" class="button">Mark Done</a>`;
}

// create the done item in the done table
function renderDone(doneItem) {
  const table = document.getElementById("done-table");
  const row = table.insertRow(-1);
  const textCell = row.insertCell(0);
  textCell.innerText = doneItem.text;
  const dateCell = row.insertCell(1);
  dateCell.innerText = doneItem.textDate;
  const deleteCell = row.insertCell(2);
  deleteCell.innerHTML = `<a onClick="deleteTodo('${doneItem.id}')" class="button">Delete</a>`;
}

// render all the todo items in the todo table
function renderAllTodos() {
  for (let i = 0; i < todoItems.length; i++) {
    renderTodo(todoItems[i]);
  }
}

// render all the done items in the done table
function addTodo() {
  const todoText = document.getElementById("todo-id").value;
  const todo = {
    text: todoText,
    textDate: new Date().toLocaleString("en-IE"),
    id: uuidv4()
  };
  todoItems.push(todo);
  renderTodo(todo);
}

// add the todo item to the done table
function addToDone(doneItem) {
  doneItems.push(doneItem);
  renderDone(doneItem);
}

// mark the todo item as done and move it to the done table
function markDone(id) {
  deleteAllTodos();
  const found = todoItems.findIndex((todo) => todo.id == id);
  const doneItem = todoItems.splice(found, 1)[0];
  addToDone(doneItem);
  renderAllTodos();
}

// delete the todo item from the done table
function deleteTodo(id) {
  deleteAllDone();
  const found = doneItems.findIndex((todo) => todo.id == id);
  doneItems.splice(found, 1);
  doneItems.forEach(renderDone);
}

// delete all the todo items from the todo table
function deleteAllTodos() {
  let table = document.getElementById("todo-table");
  for (let i = 0; i < todoItems.length; i++) {
    table.deleteRow(-1);
  }
}

//  delete all the done items from the done table
function deleteAllDone() {
  let table = document.getElementById("done-table");
  for (let i = 0; i < doneItems.length; i++) {
    table.deleteRow(-1);
  }
}