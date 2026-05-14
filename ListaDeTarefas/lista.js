const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

function addTask(){
  const taskText = taskInput.value.trim();
  if(taskText !== ''){
    const newItem = document.createElement('li');
    newItem.innerHTML = `<span>${taskText}</span>
    <button onclick="editar(this)">Editar</button>
    <button onclick="delet(this)">Remover</button>
    <button onclick="completar(this)">Feito</button>`;
  taskList.appendChild(newItem);
  taskInput.value = '';
    }
}

function delet(button){
  const itemToRemove = button.parentElement;
  taskList.removeChild(itemToRemove);
}
function completar(button){
  const itemToRemove = button.parentElement;
  itemToRemove.classList.toggle('completed');
}

function editar(button){
  const span = button.parentElement.querySelector("span");
  const novoTexto = prompt("Editar tarefa:", span.innerText);

  if(novoTexto && novoTexto.trim() !== ""){
    span.innerText = novoTexto;
  }
}