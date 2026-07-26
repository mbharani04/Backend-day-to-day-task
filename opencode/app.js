const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const emptyMsg = document.getElementById('empty-msg');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let currentFilter = 'all';

function save() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function render() {
  list.innerHTML = '';
  const filtered = todos.filter(t => {
    if (currentFilter === 'pending') return !t.done;
    if (currentFilter === 'completed') return t.done;
    return true;
  });

  emptyMsg.classList.toggle('visible', filtered.length === 0);

  filtered.forEach((todo, i) => {
    const li = document.createElement('li');
    if (todo.done) li.classList.add('completed');

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;
    span.addEventListener('click', () => {
      todo.done = !todo.done;
      save();
      render();
    });

    const btn = document.createElement('button');
    btn.className = 'delete-btn';
    btn.textContent = '\u00d7';
    btn.addEventListener('click', () => {
      todos = todos.filter(t => t !== todo);
      save();
      render();
    });

    li.appendChild(span);
    li.appendChild(btn);
    list.appendChild(li);
  });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, done: false });
  save();
  render();
  input.value = '';
});

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();
