export const createTodo = (todo) => {

  const {id, description, done} = todo;

  const html = `  
    <div class="view">
        <input class="toggle" type="checkbox" ${done && 'checked'}>
        <label>${description}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">
 `;

  //The html goes input a li element
  const li = document.createElement('li');
  //Unique id for each li (each task).
  li.setAttribute('data-id', id);
  //We add the html in the li element
  li.innerHTML = html;
  //If the task is completed, we asign the class 'completed'
  done &&= li.classList.add('completed');

  return li;
};
