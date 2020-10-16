`use strict`

const getSavedTodos = () => {
    const todosJSON = localStorage.getItem('todos')
    try{
        return todosJSON !== null ?  JSON.parse(todosJSON) :  []
    }catch (e) {
        return []
    }
}

const saveTodos = (todos) => localStorage.setItem('todos', JSON.stringify(todos))

const renderTodo = (todos, filters) => {

    let filterTodos = todos.filter((todo) => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()))

    filterTodos = filterTodos.filter( (todo) => {
        return filters.hideCompleted ? !todo.completed : true
    })

    const incompleteTodos = filterTodos.filter( (todo) => !todo.completed)

    document.querySelector("#todos").innerHTML = ''

    document.querySelector("#todos").appendChild(generateSummaryDOM(incompleteTodos))

    if(filterTodos.length<0){
        filterTodos.forEach( (todo) => document.querySelector('#todos').appendChild(generateTodoDom(todo)))
    }else{
        const messageEl = document.createElement('p')
        messageEl.classList.add('empty-message')
        messageEl.textContent = 'No to-dos to show'
        document.querySelector('#todos').appendChild(messageEl)
    }
}

const findIndexById =  (id) => {
    return todos.findIndex( (todo) => todo.id === id)
}

const removeTodo =  (todoId) => {
    const index = findIndexById(todoId)
    if (index > -1) {
        todos.splice(index, 1)
    }
}

const completedTodo =  (todoId) => {
    const index = findIndexById(todoId)
    todos[index].completed = !todos[index].completed
}

const generateTodoDom = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change',  () => {
        completedTodo(todo.id)
        saveTodos(todos)
        renderTodo(todos, filters)
    })

    //setup the tod-o text
    todoText.textContent = todo.text
    containerEl.appendChild(todoText)


    //setup container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)


    //the remove button setting
    removeButton.textContent = 'Remove'
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click',  () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodo(todos, filters)
    })


    return todoEl
}

const generateSummaryDOM =  (incompleteTodos) => {
    const summary = document.createElement('h2')
    let singularPluralText
    summary.classList.add('list-title')
    singularPluralText = todos.length===1 ? 'todo' : 'todos'

    summary.textContent = `you have ${incompleteTodos.length} ${singularPluralText} left`
    return summary
}