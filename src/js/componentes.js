import { Todo } from "../classes";
import { todoList } from '../index.js';

//referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnRemoveCompletados = document.querySelector('.clear-completed');
const filters = document.querySelector('.filters');
const anchorFilters = document.querySelectorAll('.filtro');

export const crearTodoHtml = ({ tarea, completado, id }) => {

  const htmlTodo = `
  <li class="${completado ? 'completed' : ''}" data-id="${id}">
    <div class="view">
      <input class="toggle" type="checkbox" ${completado ? 'checked' : ''} >
      <label>${tarea}</label>
      <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
  </li>
  `;

  const div = document.createElement('div');
  div.innerHTML = htmlTodo;

  divTodoList.append(div.firstElementChild);

  return div;
}

//Eventos
txtInput.addEventListener('keyup', (event) => {
  // console.log(event);
  if (event.keyCode === 13 && txtInput.value.length > 0) {
    const todo = new Todo(txtInput.value);
    todoList.nuevoTodo(todo);
    crearTodoHtml(todo);
    txtInput.value = '';
  }

});

divTodoList.addEventListener('click', (event) => {

  const elemento = event.target.localName; //input, label, button
  const todoElemento = event.target.parentElement.parentElement; //<li>
  const todoId = todoElemento.getAttribute('data-id');

  if (elemento.includes('input')) {  //click en el check
    todoList.marcarCompletado(todoId);
    todoElemento.classList.toggle('completed');
  }

  if (elemento.includes('button')) {
    todoList.eliminarTodo(todoId);
    divTodoList.removeChild(todoElemento);
  }

});

btnRemoveCompletados.addEventListener('click', () => {
  todoList.eliminarCompletados();

  for (let i = divTodoList.children.length - 1; i >= 0; i--) {

    const elemento = divTodoList.children[i];

    if (elemento.classList.contains('completed')) {
      divTodoList.removeChild(elemento);
    }

  };

});

filters.addEventListener('click', (event) => {

  const filtro = event.target.text;
  if (!filtro) {
    return;
  }

  anchorFilters.forEach(anchor => anchor.classList.remove('selected'));
  event.target.classList.add('selected');


  for (const elemento of divTodoList.children) {
    elemento.classList.remove('hidden');
    const completado = elemento.classList.contains('completed');
    switch (filtro) {
      case 'Pendientes':
        if (completado) {
          elemento.classList.add('hidden');
        }
        break;

      case 'Completados':
        if (!completado) {
          elemento.classList.add('hidden');
        }
        break;

      default:
        break;
    }
  }

  // console.log(event.target.text);
})