const getSavedTodos = function () {
    const todosJSON = localStorage.getItem('todos')

    if (todosJSON !== null) {
        return JSON.parse(todosJSON)
    } else {
        return []
    }
}

const saveTodos = function (todos) {

    localStorage.setItem('todos', JSON.stringify(todos))

}

const renderTodo = function (todos, filters) {

    let filterTodo = todos.filter(function (todo) {
        return todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    filterTodo = filterTodo.filter(function (todo) {
        if (filters.hideCompleted) {
            return !todo.completed
        } else {
            return true
        }
    })

    const incompleteTodos = filterTodo.filter(function (todo) {
        return !todo.completed
    })

    document.querySelector("#todos").innerHTML = ''

    document.querySelector("#todos").appendChild(generateSummaryDOM(incompleteTodos))


    filterTodo.forEach(function (todo) {
        document.querySelector('#todos').appendChild(generateTodoDom(todo))
    })
}

const findIndexById = function (id) {

    return todos.findIndex(function (todo) {
        return todo.id === id
    })
}

const removeTodo = function (todoId) {
    const index = findIndexById(todoId)
    if( index>- 1){
        todos.splice(index,1)
    }
}

const completedTodo = function (todoId) {
    const index = findIndexById(todoId)
    todos[index].completed = !todos[index].completed
}

const generateTodoDom = function (todo) {
    const todoEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    checkbox.setAttribute('type','checkbox')
    checkbox.checked = todo.completed
    todoEl.appendChild(checkbox)
    checkbox.addEventListener('change',function () {
        console.log(todo.completed)
        completedTodo(todo.id)
        saveTodos(todos)
        renderTodo(todos,filters)
    })

    todoText.textContent = todo.text
    todoEl.appendChild(todoText)

    //the remove button setting
    removeButton.textContent = 'x'
    removeButton.addEventListener('click',function () {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodo(todos,filters)
    })
    todoEl.appendChild(removeButton)

    return todoEl
}

const generateSummaryDOM = function (incompleteTodos) {
    const summary = document.createElement('h2')
    summary.textContent = `you have ${incompleteTodos.length} todos left`
    return summary
}