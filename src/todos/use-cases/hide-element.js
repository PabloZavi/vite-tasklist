export const hideElement = (HTMLId, isHidden) => {
  const elem = document.querySelector(HTMLId);
  elem.disabled = isHidden;
  isHidden
    ? elem.classList.add('element-disabled')
    : elem.classList.remove('element-disabled');
};
