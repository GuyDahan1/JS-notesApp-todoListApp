`use strict`

// Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try {
        return (notesJSON !== null) ? JSON.parse(notesJSON) : []
    } catch (e) {
        return []
    }
}

// Save the notes to localStorage
const saveNotes = (notes) => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex((note) => note.id === id)

    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
    }
}

// Generate the DOM structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('div')
    const textEl = document.createElement('a')
    const button = document.createElement('button')

    // Setup the remove note button
    button.textContent = 'x'
    noteEl.appendChild(button)
    button.addEventListener('click', function () {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes, filters)
    })
        // Setup the note title text
    textEl.textContent = note.title.length > 0 ?  note.title : 'Unnamed note'
    textEl.setAttribute('href', `/notes-app/edit.html#${note.id}`)
    noteEl.appendChild(textEl)

    return noteEl
}

const sortByFunc = (notes, sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => {
            if (a.updateAt > b.updateAt) {
                return -1
            } else if (a.updateAt < b.updateAt) {
                return 1
            } else {
                return 0
            }
        })
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => {
            if (a.createdAt > b.createdAt) {
                return -1
            } else if (a.createdAt < b.createdAt) {
                return 1
            } else {
                return 0
            }
        })

    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    }
}

// Render application notes
const renderNotes = (notes, filters) => {

    notes = sortByFunc(notes, filters.sortBy)

    const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    document.querySelector('#notes').innerHTML = ''
    filteredNotes.forEach((note) => {
        const noteEl = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}

const generateLastEdited = (timestamp) => `Last edited ${moment(timestamp).fromNow()}`
