import { Todo } from '../todos/models/todo.model';

const Filters = {
  All: 'all',
  Completed: 'completed',
  Pending: 'pending',
};

//Initial global state
const state = {
  todos: [
    /* new Todo('Water'),
    new Todo('Milk'),
    new Todo('Eggs'),
    new Todo('Chocolate'),
    new Todo('Apples'), */
  ],
  filter: Filters.All,
};

const initStore = () => {
  loadState();
};

const loadState = () => {
  if (!localStorage.getItem('state')) return;
  const { todos = [], filter = Filters.All } = JSON.parse(
    localStorage.getItem('state')
  );
  state.todos = todos;
  state.filter = filter;
};

const saveStateToLocalStorage = () => {
  localStorage.setItem('state', JSON.stringify(state));
};

const getTodos = (filter = Filters.All) => {
  loadState();
  switch (filter) {
    case Filters.All:
      return [...state.todos];
    case Filters.Completed:
      return state.todos.filter((todo) => todo.done);
    case Filters.Pending:
      return state.todos.filter((todo) => !todo.done);

    default:
      throw new Error(`Option ${filter} is not allowed`);
  }
};

//Format the task string (1st mayus - rest minus)
const formatTodo = (todo) => {
  const newTodo =
    todo.trim().charAt(0).toUpperCase() + todo.trim().toLowerCase().slice(1);
  return newTodo;
};

const addTodo = (description) => {
  if (!description) throw new Error('Description is required');
  state.todos.push(new Todo(formatTodo(description)));
  saveStateToLocalStorage();
};

const markTodo = (todoId) => {
  if (!todoId) throw new Error('Id is required');
  state.todos.map((todo) => {
    todo.id === todoId && (todo.done = !todo.done);
    saveStateToLocalStorage();
    return todo;
  });
};

const editTodo = (todoId, description) => {
  if (!todoId) throw new Error('Id is required');
  if (!description) throw new Error('description is required');
  state.todos.map((todo) => {
    todo.id === todoId && (todo.description = formatTodo(description));
    saveStateToLocalStorage();
    return todo;
  });
};

const todoExists = (description) => {
  if (!description) throw new Error('description is required');
  let exists = false;
  getTodos().map((todo) => {
    if (
      todo.description.trim().toLowerCase() === description.trim().toLowerCase()
    ) {
      exists = true;
    }
  });
  return exists;
};

const deleteTodo = (todoId) => {
  if (!todoId) throw new Error('Id is required');
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
  saveStateToLocalStorage();
};

/* const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => todo.done);
  saveStateToLocalStorage();
}; */
const deleteCompleted = () => {
  let notDoneTodos = state.todos.filter((todo) => 
    !todo.done
  );
  /* state.todos = state.todos.filter((todo) => {
    if(todo.done) {}
  }); */
  state.todos = notDoneTodos;
  saveStateToLocalStorage();
};

const markAllCompleted = () =>{
  state.todos.map(todo => todo.done = true)
  saveStateToLocalStorage();
}

const markAllNotCompleted = () =>{
  state.todos.map(todo => todo.done = false)
  saveStateToLocalStorage();
}

const setFilter = (newFilter = Filters.All) => {
  if (!Object.keys(Filters).includes(newFilter))
    throw new Error(`The filter doesn't exist`);
  state.filter = newFilter;
  saveStateToLocalStorage();
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  initStore,
  getTodos,
  addTodo,
  markTodo,
  editTodo,
  deleteTodo,
  deleteCompleted,
  setFilter,
  getCurrentFilter,
  todoExists,
  markAllCompleted,
  markAllNotCompleted,
};
