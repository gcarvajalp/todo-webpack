import './styles.css';
import { Todo, TodoList } from './classes/index';
import { crearTodoHtml } from './js/componentes';


export const todoList = new TodoList();

/* Ejemplo creacion de todo

const tarea = new Todo('Aprender javascript');
todoList.nuevoTodo(tarea);
crearTodoHtml(tarea);
 */

todoList.todos.forEach(crearTodoHtml);
