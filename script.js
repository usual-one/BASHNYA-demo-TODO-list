const containerElement = document.getElementsByTagName('main')[0];

async function loadTodos() {
  const response = await fetch('https://dummyjson.com/todos');
  const responseJson = await response.json();
  return responseJson.todos;
}

function renderTodos(todos) {
  for (const todo of todos) {
    const todoElement = createTodoElement(todo);
    containerElement.appendChild(todoElement);
  }
}

function createTodoElement(todo) {
  const todoContainer = document.createElement('div');
  todoContainer.classList = 'todo-container';
  todoContainer.setAttribute('id', 'todo-container-' + todo.id);

  const completedCheckbox = document.createElement('input');
  completedCheckbox.setAttribute('type', 'checkbox');
  completedCheckbox.classList = 'todo-completed-checkbox';
  if (todo.completed) {
    completedCheckbox.setAttribute('checked', todo.completed);
  }

  const nameInput = document.createElement('input');
  nameInput.classList = 'todo-name-input';
  nameInput.value = todo.todo;

  const deleteButton = document.createElement('button');
  deleteButton.classList = 'todo-delete-button material-symbols-outlined';
  deleteButton.innerHTML = 'delete';

  deleteButton.addEventListener('click', () => onDeleteClick(todoContainer));

  todoContainer.appendChild(completedCheckbox);
  todoContainer.appendChild(nameInput);
  todoContainer.appendChild(deleteButton);
  return todoContainer;
}

loadTodos().then(todos => renderTodos(todos));

const addButton = document.getElementById('add-button');
addButton.addEventListener('click', onAddClick);

function onAddClick() {
  const element = createTodoElement({ completed: false, todo: '', id: containerElement.children.length + 1});
  const input = element.getElementsByClassName('todo-name-input')[0];

  containerElement.insertBefore(element, containerElement.firstChild);
  input.focus();
}

function onDeleteClick(element) {
  containerElement.removeChild(element);
}

function onNameChange(element) {
}

function onCompletedChange(element) {
}
