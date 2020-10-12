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

    let filterTodo = todos.filter((todo) => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()))

    filterTodo = filterTodo.filter( (todo) => {
        return filters.hideCompleted ? !todo.completed : true
    })

    const incompleteTodos = filterTodo.filter( (todo) => !todo.completed)

    document.querySelector("#todos").innerHTML = ''

    document.querySelector("#todos").appendChild(generateSummaryDOM(incompleteTodos))


    filterTodo.forEach( (todo) => document.querySelector('#todos').appendChild(generateTodoDom(todo)))
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
    const todoEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)
    checkbox.addEventListener('change',  () => {
        completedTodo(todo.id)
        saveTodos(todos)
        renderTodo(todos, filters)
    })

    todoText.textContent = todo.text
    todoEl.appendChild(todoText)

    //the remove button setting
    removeButton.textContent = 'x'
    removeButton.addEventListener('click',  () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodo(todos, filters)
    })
    todoEl.appendChild(removeButton)

    return todoEl
}

const generateSummaryDOM =  (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.textContent = `you have ${incompleteTodos.length} todos left`
    return summary
}