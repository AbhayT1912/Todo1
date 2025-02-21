function loadtodo () {
  //fxn will load todo's already exists
  const todos = JSON.parse(localStorage.getItem('todos')) || { todolist: [] }
  console.log(todos)
  return todos
}

function refreshTodo (todos) {
  localStorage.setItem('todos', JSON.stringify(todos))
}

function addTOdoToLocalstorage (todo) {
  const todos = loadtodo()
  todos.todolist.push({ ...todo })
  localStorage.setItem('todos', JSON.stringify(todos))
}

function executeFilter (event) {
  const todolist = document.getElementById('todolist')
  const element = event.target
  const value = element.getAttribute('data-filter')
  todolist.innerHTML = ''
  const todos = loadtodo()
  if (value == 'all') {
    console.log(todolist)
    todos.todolist.forEach(todo => {
      appendToDOinHTML(todo)
    })
  } else if (value == 'Pending') {
    todos.todolist.forEach(todo => {
      if (!todo.iscompleted) {
        appendToDOinHTML(todo)
      }
    })
  } else {
    todos.todolist.forEach(todo => {
      if (todo.iscompleted) {
        appendToDOinHTML(todo)
      }
    })
  }
}

function appendToDOinHTML (todo) {
  const todolist = document.getElementById('todolist')

  const todoitem = document.createElement('Li')

  todoitem.setAttribute('data-id', todo.id)

  const textdiv = document.createElement('div')

  if (todo.iscompleted) {
    textdiv.classList.add('completed')
  }

  textdiv.textContent = todo.text
  todoitem.classList.add('todoitem')

  const wrapper = document.createElement('div')
  wrapper.classList.add('todobuttons')

  const editbtn = document.createElement('button')
  editbtn.textContent = 'Edit'
  editbtn.classList.add('editbtn')
  editbtn.addEventListener('click', editTodo)

  const delbtn = document.createElement('button')
  delbtn.textContent = 'Delete'
  delbtn.classList.add('delbtn')
  delbtn.addEventListener('click', deletetodo)

  const coompletebtn = document.createElement('button')
  coompletebtn.textContent = todo.iscompleted ? 'Reset' : 'Complete'
  coompletebtn.classList.add('completebtn')
  coompletebtn.addEventListener('click', toggletodo)

  wrapper.appendChild(editbtn)
  wrapper.appendChild(delbtn)
  wrapper.appendChild(coompletebtn)
  todoitem.appendChild(textdiv)
  todoitem.appendChild(wrapper)

  todolist.appendChild(todoitem)
}

function resetHtmltodos (todos) {
  const todolist = document.getElementById('todolist')
  todolist.innerHTML = ''
  todos.todolist.forEach(todo => {
    appendToDOinHTML(todo)
  })
}

function toggletodo (event) {
  const todoitem = event.target.parentElement.parentElement
  const todoid = todoitem.getAttribute('data-id')
  const todos = loadtodo()
  todos.todolist.forEach(todo => {
    if (todo.id == todoid) {
      todo.iscompleted = !todo.iscompleted
    }
  })
  refreshTodo(todos)
  const todolist = document.getElementById('todolist')
  todolist.innerHTML = ''
  todos.todolist.forEach(todo => {
    appendToDOinHTML(todo)
  })
}

function deletetodo (event) {
  const todoitem = event.target.parentElement.parentElement
  const todoid = todoitem.getAttribute('data-id')
  const todos = loadtodo()
  const newtodos = todos.todolist.filter(todo => todo.id != todoid)
  todos.todolist = newtodos
  refreshTodo(todos)
  resetHtmltodos(todos)
}

function addnewtodo () {
  const todotext = todoinput.value
  if (todotext == '') {
    alert('Please write something for todo')
  } else {
    todos = loadtodo()
    const id = todos.todolist.length
    addTOdoToLocalstorage({ text: todotext, iscompleted: false, id })
    appendToDOinHTML({ text: todotext, iscompleted: false, id })
    todoinput.value = ' '
  }
}

function editTodo (event) {
  const todoitem = event.target.parentElement.parentElement //li
  const todoid = todoitem.getAttribute('data-id') //id
  const todos = loadtodo() //todos
  const newtext = prompt('Enter new text')
  todos.todolist.forEach(todo => {
    if (todo.id == todoid) {
      todo.text = newtext
    }
  })
  refreshTodo(todos)
  resetHtmltodos(todos)
}

document.addEventListener('DOMContentLoaded', () => {
  console.log(document.getElementById('todoinput'))

  const todoinput = document.getElementById('todoinput')
  const submitbutton = document.getElementById('addtodo')

  let todos = loadtodo()

  const todolist = document.getElementById('todolist')

  const filterbtns = document.getElementsByClassName('filterbtn')
  for (btns of filterbtns) {
    btns.addEventListener('click', executeFilter)
  }

  submitbutton.addEventListener('click', addnewtodo)

  todoinput.addEventListener('change', event => {
    // this is fired when there is a change in input tag

    const todotext = event.target.value
    event.target.value = todotext.trim()
    console.log(event.target.value)
  })

  todos.todolist.forEach(todo => {
    appendToDOinHTML(todo)
  })
  document.addEventListener("keypress",(event)=>{
    if(event.key == "Enter"){
      addnewtodo()
    }
  })
})
