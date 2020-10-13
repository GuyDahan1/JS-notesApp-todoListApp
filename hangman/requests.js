const getPuzzle = (callback) => {
    const request = new XMLHttpRequest()

    request.addEventListener('readystatechange', (e) => {
        if (e.target.readyState === 4 && e.target.status === 200) {
            const data = JSON.parse(e.target.responseText)
            callback(undefined,data[parseInt(Math.random()*250)].name)
        } else if (e.target.readyState === 4) {
            callback('an error has occurred',undefined)
        }
    })

    request.open('GET', 'https://restcountries.eu/rest/v2/all')
    request.send()
}

