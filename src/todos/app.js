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
  const todoListUL = document.querySelector(HTMLIds.TodoList);

  //Listeners
  //!Click over a todo....
  //When we do click over an element inside the ul list...
  todoListUL.addEventListener('click', (event) => {
    console.log(event.target.getAttribute('class'));
    //Witch 'closest' we search the nearest parameter going up
    //We extract the id of the element we did click
    const idTodo = event.target.closest(`[data-id]`).getAttribute('data-id');
    //!Mark a todo
    //If we click a checkbox, we mark/unmark the element
    if (event.target.getAttribute('type') === 'checkbox') {
      todoStore.markTodo(idTodo);
      displayTodos();
    }

    //!Edit a todo
    //If we click a label, we can edit the label, and if we press enter, we store the element edited
    if (event.target.tagName === 'LABEL') {
      event.target.addEventListener('keyup', (event2) => {
        if (event2.keyCode === 13) {
          const labelContent = event.target.textContent;
          todoStore.editTodo(idTodo, labelContent);
          displayTodos();
        }
      });
    }

    //!Delete a todo
    if (event.target.getAttribute('class') === 'destroy') {
      todoStore.deleteTodo(idTodo);
      displayTodos();
    }
  });

  //!New todo
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
    todoStore.addTodo(event.target.value);
    //Re-render
    displayTodos();
    //Cleaning the input
    event.target.value = '';
  });
};
