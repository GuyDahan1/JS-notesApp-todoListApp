const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const removeElement = document.querySelector('#remove-note')
const noteId = location.hash.substring(1)
let notes = getSavedNotes()

let note = notes.find(function (note) {
    return note.id === noteId
})

if (note === undefined){
    location.assign('/notes-app')
}

titleElement.value = note.title
bodyElement.value = note.body

titleElement.addEventListener('input',function (e) {
    note.title = e.target.value
    saveNotes(notes)
})

bodyElement.addEventListener('input',function (e) {
    note.body = e.target.value
    saveNotes(notes)
})

removeElement.addEventListener('click',function (e) {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/notes-app')
})

window.addEventListener('storage',function (e) {
    console.log(e.key)
    if(e.key==='notes'){
        notes = JSON.parse(e.newValue)
    }

    note = notes.find(function (note) {
        return note.id === noteId
    })

    if (note === undefined){
        location.assign('/notes-app')
    }

    titleElement.value = note.title
    bodyElement.value = note.body
})