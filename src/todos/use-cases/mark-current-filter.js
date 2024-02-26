import todoStore from '../../store/todo.store';

/**
 * Brings the filter saved into the store and mark it every time the page is opened or reloaded
 * @param {String} HTMLId Which elements will be analyzed (in this case -> The Li filters)
 */
export const markCurrentFilter = (HTMLId) => {
  const currentFilter = todoStore.getCurrentFilter();
  document.querySelectorAll(HTMLId).forEach((el) => {
    if (el.textContent.toLowerCase() === currentFilter.toLowerCase()) {
      el.classList.add('selected');
    }
  });
};
