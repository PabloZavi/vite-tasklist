import { Todo } from '../todos/models/todo.model';

const Filters = {
  All: 'all',
  Completed: 'completed',
  Pending: 'pending',
};

//Initial global state
const state = {
  todos: [
    new Todo('Water'),
    new Todo('Milk'),
    new Todo('Eggs'),
    new Todo('Chocolate'),
    new Todo('Apples'),
  ],
  filter: Filters.All,
};

const initStore = () => {
  console.log(state);
  console.log('Init Store');
};

const loadStore = () => {
  throw new Error('Not implemented');
};

const getTodos = (filter = Filters.All) => {
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

const addTodo = (description) => {
  if (!description) throw new Error('Description is required');
  state.todos.push(new Todo(description));
};

const toggleTodo = (todoId, description, done) => {
  if (!todoId) throw new Error('Id is required');
  state.todos.map((todo) => {
    if (todo.id === todoId) {
      description && (todo.description = description);
      done && (todo.done = done);
    }
    return todo;
  });

  /*
  state.todos = state.todos.map( todo => {
    if (todo.id === todoId){
      todo.done= !todo.done;
    }
      return todo
  })
  */
};

const deleteTodo = (todoId) => {
  if (!todoId) throw new Error('Id is required');
  state.todos = state.todos.filter((todo) => todo.id !== todoId);
};

const deleteCompleted = () => {
  state.todos = state.todos.filter((todo) => todo.done);
};

const setFilter = (newFilter = Filters.All) => {
  if (!Object.keys(Filters).includes(newFilter))
    throw new Error(`The filter doesn't exist`);
  state.filter = newFilter;
};

const getCurrentFilter = () => {
  return state.filter;
};

export default {
  initStore,
  loadStore,
  getTodos,
  addTodo,
  toggleTodo,
  deleteTodo,
  deleteCompleted,
  setFilter,
  getCurrentFilter,
};
