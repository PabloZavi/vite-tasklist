import html from './app.html?raw';
import todoStore, { Filters } from '../store/todo.store';
import { renderTodos, pendingCount, markCurrentFilter } from './use-cases';

const HTMLIds = {
  TodoList: '.todo-list',
  NewTodoInput: '#new-todo-input',
  ClearCompleted: '.clear-completed',
  MarkAllCompleted: '#mark-all-completed',
  MarkAllNotCompleted: '#mark-all-not-completed',
  LiFilters: '.filter',
  PendingCount: '#pending-count',
};

export const App = (elementId) => {
  const displayTodos = () => {
    const filter = localStorage.getItem('state')
      ? JSON.parse(localStorage.getItem('state')).filter
      : Filters.All;
    const todos = todoStore.getTodos(filter);

    renderTodos(HTMLIds.TodoList, todos);
    markCurrentFilter(HTMLIds.LiFilters);
    pendingCount(HTMLIds.PendingCount);
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
  const clearCompleted = document.querySelector(HTMLIds.ClearCompleted);
  const markAllCompleted = document.querySelector(HTMLIds.MarkAllCompleted);
  const markAllNotCompleted = document.querySelector(
    HTMLIds.MarkAllNotCompleted
  );
  const liFilters = document.querySelectorAll(HTMLIds.LiFilters);

  //Listeners
  //!Click over a todo....
  //When we do click over an element inside the ul list...
  todoListUL.addEventListener('click', (event) => {
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
    if (todoStore.todoExists(event.target.value)) {
      window.alert(`The task ${event.target.value.trim()} already exists`);
      throw new Error(`The task ${event.target.value.trim()} already exists`);
    }

    //Adding the task (1st mayus - rest minus)
    todoStore.addTodo(event.target.value);
    //Re-render
    displayTodos();
    //Cleaning the input
    event.target.value = '';
  });

  //!Delete all completed todos
  clearCompleted.addEventListener('click', () => {
    todoStore.deleteCompleted();
    displayTodos();
  });

  //!Mark all completed
  markAllCompleted.addEventListener('click', () => {
    todoStore.markAllCompleted();
    displayTodos();
  });

  //!Mark all NOT completed
  markAllNotCompleted.addEventListener('click', () => {
    todoStore.markAllNotCompleted();
    displayTodos();
  });

  //!When we click a filter...
  liFilters.forEach((element) => {
    element.addEventListener('click', (elem) => {
      liFilters.forEach((el) => el.classList.remove('selected'));
      elem.target.classList.add('selected');
      switch (elem.target.textContent) {
        case 'All':
          todoStore.setFilter(Filters.All);
          break;
        case 'Pending':
          todoStore.setFilter(Filters.Pending);
          break;
        case 'Completed':
          todoStore.setFilter(Filters.Completed);
          break;
        default:
          throw new Error('Not valid option');
      }
      displayTodos();
    });
  });
};
