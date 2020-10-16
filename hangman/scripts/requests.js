const getCountry = async () => {
    const response = await fetch('//restcountries.eu/rest/v2/all')
    if (response.status===200){
        const data = await response.json()
        return data[parseInt(Math.random() * 250)].name
    }else{
        throw new Error('unable to get puzzle')
    }
}



