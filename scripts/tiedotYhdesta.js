let vastaus
const haeKotiplaneetta = async(osoite) => {
    try {
        let res = await axios.get(osoite)
        vastaus = await res.data.name
        return vastaus
    } catch(err) {
        console.log(err.message)
    }
}

const yhdenTiedot = (idx) => {
    
if(nykyinenLuokka === 'people/'){
    let planeetta = nykyinenLista[idx].homeworld
    haku = haeKotiplaneetta(planeetta)
    tiedotYhdestä.innerHTML = `
    <h5>Name: ${nykyinenLista[idx].name}</h5>
    <p>Height: ${nykyinenLista[idx].height}cm</p>
    <p>Weight: ${nykyinenLista[idx].mass}kg</p>
    <p>Eye color: ${nykyinenLista[idx].eye_color}</p>
    <p>Skin Color: ${nykyinenLista[idx].skin_color}</p>}
    <p>Gender: ${nykyinenLista[idx].gender}</p>
    <p>Homeworld: ${haku}</p>`
    
}
}