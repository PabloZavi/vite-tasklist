import todoStore, { Filters } from '../../store/todo.store';

/**
 * Count and shows the pending tasks to do.
 * @param {String} HTMLId Where the pending count will be showed
 */
export const pendingCount = (HTMLId) => {
  document.querySelector(HTMLId).innerText = todoStore.getTodos(
    Filters.Pending
  ).length;
};
