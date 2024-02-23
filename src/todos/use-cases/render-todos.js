import { Todo } from '../models/todo.model';
import { createTodo } from './create-todo-html';

let element;

/**
 *
 * @param {String} HTMLId
 * @param {Todo} todos
 */
export const renderTodos = (HTMLId, todos = []) => {
  //We do this in order not to call the DOM every time, only the first one.
  //On the first render, element is undefined, so, we assing the HTMLId to it,
  //after that we don't call the DOM every more.
  element || (element = document.querySelector(HTMLId));
  if (!element) throw new Error(`HTML Id ${HTMLId}not found`);

  //We clean the element to prevent tasks staking (every time we render the app)
  element.innerHTML = '';

  todos.map((todo) => {
    element.append(createTodo(todo));
  });
};
