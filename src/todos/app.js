import html from './app.html?raw';
import todoStore from '../store/todo.store';
import { renderTodos } from './use-cases';

const HTMLIds = {
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
};

/**
 *
 * @param {String} elementId
 */
export const App = (elementId) => {
  const displayTodos = () => {
    const todos = todoStore.getTodos(todoStore.getCurrentFilter());
    renderTodos(HTMLIds.TodoList, todos);
  };

  (() => {
    const app = document.createElement('div');
    app.innerHTML = html;
    document.querySelector(elementId).append(app);
    displayTodos();
  })();

  //HTML references (They go under the render)
  const newDescrInput = document.querySelector(HTMLIds.NewTodoInput);

  //Listeners
  newDescrInput.addEventListener('keyup', (event) => {
    if (event.keyCode !== 13) return; //If the key isn't 'Enter', don't continue.
    if (event.target.value.trim().length === 0) return; //If the description is empty, don't continue

    //If the task already exists...
    todoStore.getTodos().map((todo) => {
      if (
        todo.description.toLowerCase() ===
        event.target.value.trim().toLowerCase()
      ) {
        throw new Error(`The task ${event.target.value.trim()} already exists`);
      }
    });

    //Adding the task (1st mayus - rest minus)
    todoStore.addTodo(
      event.target.value.trim().charAt(0).toUpperCase() +
        event.target.value.trim().toLowerCase().slice(1)
    );
    //Re-render
    displayTodos();
    //Cleaning the input
    event.target.value = '';
  });
};
