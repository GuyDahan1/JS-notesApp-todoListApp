`use strict`

const todos = getSavedTodos()

const filters = {
    searchText: ''
    , hideCompleted: false
}

renderTodo(todos, filters)


//Action listener - searchTodo
document.querySelector("#searchTodoInput").addEventListener('input',  (e) => {
    filters.searchText = e.target.value
    renderTodo(todos, filters)
})


document.querySelector("#addTodoForm").addEventListener('submit',  (e) => {
    e.preventDefault()
    todos.push({
        id: uuidv4(),
        text: e.target.elements.addTodoInput.value,
        completed: false
    })
    saveTodos(todos)
    renderTodo(todos, filters)
    e.target.elements.addTodoInput.value = ''
})

document.querySelector("#hideCompleted").addEventListener('change',  (e) => {
    filters.hideCompleted = e.target.checked
    renderTodo(todos, filters)
})