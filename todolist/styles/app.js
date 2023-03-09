let addButton = document.querySelector('form button')
addButton.addEventListener('click', (e) => {
  // do something
  e.preventDefault()

  // get the form and the text
  let form = e.target.parentElement
  let todotext = form.children[0].value
  let todomonth = form.children[1].value
  let tododay = form.children[2].value

  if (todotext == '') {
    alert('Please enter a task')
    return
  }
  if (todomonth > 12 || todomonth < 1) {
    alert('月份限制 [1-12]')
    return
  }
  if (tododay > 31 || tododay < 1) {
    alert('日期限制 [1-31]')
    return
  }

  // create new todo
  let todo = document.createElement('div')
  todo.classList.add('todo')
  let todoText = document.createElement('p')
  todoText.classList.add('todo-text')
  todoText.innerText = todotext
  let todotime = document.createElement('p')
  todotime.classList.add('todo-time')
  todotime.innerText = todomonth + '/' + tododay

  // add check and trash buttons and events
  let checkButton = document.createElement('button')
  checkButton.classList.add('check')
  checkButton.innerHTML = '<i class="fa-solid fa-check"></i>'
  checkButton.addEventListener('click', (e) => {
    e.target.parentElement.classList.toggle('checked')
  })
  let trashButton = document.createElement('button')
  trashButton.classList.add('trash')
  trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
  trashButton.addEventListener('click', (e) => {
    e.target.parentElement.addEventListener('animationend', () => {
      let removeText = e.target.parentElement.children[0].innerText
      let removeList = JSON.parse(localStorage.getItem('mylist'))
      removeList.forEach((todo, index) => {
        if (todo.text == removeText) {
          removeList.splice(index, 1)
          localStorage.setItem('mylist', JSON.stringify(removeList))
        }
      })
      e.target.parentElement.remove()
    })
    e.target.parentElement.style.animation = 'scaledown 0.25s ease forwards'
  })

  // add todo to section
  let section = document.querySelector('section')
  todo.appendChild(todoText)
  todo.appendChild(todotime)
  todo.appendChild(checkButton)
  todo.appendChild(trashButton)
  todo.style.animation = 'scaleup 0.25s ease forwards'

  // save todo to local storage
  let todoObiect = {
    text: todotext,
    month: todomonth,
    day: tododay,
  }
  let mylist = JSON.parse(localStorage.getItem('mylist')) || []
  mylist.push(todoObiect)
  localStorage.setItem('mylist', JSON.stringify(mylist))

  //clear text
  form.children[0].value = ''
  form.children[1].value = ''
  form.children[2].value = ''
  section.appendChild(todo)
})

loaddata()

function loaddata() {
  // load todos from local storage
  let mylist = JSON.parse(localStorage.getItem('mylist')) || []
  mylist.forEach((todo) => {
    // create new todo
    let todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    let todoText = document.createElement('p')
    todoText.classList.add('todo-text')
    todoText.innerText = todo.text
    let todotime = document.createElement('p')
    todotime.classList.add('todo-time')
    todotime.innerText = todo.month + '/' + todo.day

    // add check and trash buttons and events
    let checkButton = document.createElement('button')
    checkButton.classList.add('check')
    checkButton.innerHTML = '<i class="fa-solid fa-check"></i>'
    checkButton.addEventListener('click', (e) => {
      e.target.parentElement.classList.toggle('checked')
    })
    let trashButton = document.createElement('button')
    trashButton.classList.add('trash')
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>'
    trashButton.addEventListener('click', (e) => {
      e.target.parentElement.addEventListener('animationend', () => {
        let removeText = e.target.parentElement.children[0].innerText
        let removeList = JSON.parse(localStorage.getItem('mylist'))
        removeList.forEach((todo, index) => {
          if (todo.text == removeText) {
            removeList.splice(index, 1)
            localStorage.setItem('mylist', JSON.stringify(removeList))
          }
        })
        e.target.parentElement.remove()
      })
      e.target.parentElement.style.animation = 'scaledown 0.25s ease forwards'
    })

    // add todo to section
    let section = document.querySelector('section')
    todoDiv.appendChild(todoText)
    todoDiv.appendChild(todotime)
    todoDiv.appendChild(checkButton)
    todoDiv.appendChild(trashButton)
    section.appendChild(todoDiv)
  })
}

let sortButton = document.querySelector('div.sort button')
sortButton.addEventListener('click', (e) => {
  console.log(sortButton)
  let mylist = JSON.parse(localStorage.getItem('mylist'))
  mylist.sort((a, b) => {
    return a.month - b.month || a.day - b.day
  })
  localStorage.setItem('mylist', JSON.stringify(mylist))
  let refresh = document.querySelectorAll('section div.todo p.todo-text')
  for (let i = 0; i < refresh.length; i++) {
    refresh[i].parentElement.remove()
  }
  loaddata()
})

// console.log(refresh)
