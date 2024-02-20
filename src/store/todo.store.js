import { Todo } from '../todos/models/todo.model';

const Filters = {
  All: 'all',
  Completed: 'completed',
  Pending: 'pending',
};

//Initial global state
const state = {
  todos: [new Todo('Water'), new Todo('Milk'), new Todo('Eggs')],
  filter: Filters.All,
};

const initStore = () => {
  console.log(state);
  console.log('Init Store');
};

export default {
  initStore,
};
