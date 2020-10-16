const puzzleEl = document.querySelector('#puzzle')
const guessesEl = document.querySelector('#guesses')
let game1 = new Hangman('randomCountry', 2)

puzzleEl.textContent = game1.getPuzzle()
guessesEl.textContent = game1.getStatusMessage()

window.addEventListener('keypress', (e) => {
    const guess = String.fromCharCode(e.charCode)
    game1.makeGuess(guess)
    render()
})

const render = () =>{
    puzzleEl.innerHTML = ''
    guessesEl.textContent = game1.getStatusMessage()

    game1.getPuzzle().split('').forEach((letter)=>{
        let letterEl = document.createElement("span")
        letterEl.textContent = letter
        puzzleEl.appendChild(letterEl)
    })

}

// puzzleEl.innerHTML = ''
// guessesEl.textContent = game1.getStatusMessage()
//
// game1.word.split('').forEach((letter)=>{
//     const letterEl =document.createElement('span')
//     letterEl.textContent = letterEl
//     puzzleEl.appendChild(letterEl)
// })

const startGame = async () => {
    const country = await getCountry()
    console.log(country)
    game1 = new Hangman(country,5)
    render()
}


document.querySelector('#resetButton').addEventListener('click',startGame)

startGame()
