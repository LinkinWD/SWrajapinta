let tulos 

/* functio, joka lisää pisteen aina kolmen luvun jälkeen isommissa luvuissa */
function muunna(mikamuunnetaan) {
    return mikamuunnetaan.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/* Tarvitaa henkilönkohdalla */
const haeKotiplaneetta = async(osoite) => {
    try {
        let res = await axios.get(osoite)
        let vastaus =  await res.data.name
        tulos = vastaus
        
    } catch(err) {
        console.log(err.message)
    }
}

const yhdenTiedot = (idx) => {
    
if(nykyinenLuokka === 'people/'){
    let planeetta = nykyinenLista[idx].homeworld
    haeKotiplaneetta(planeetta).then( () => {
        kirjoitaTiedot()
    })
    const kirjoitaTiedot = () => {
    tiedotYhdestä.innerHTML = ''
    tiedotYhdestä.innerHTML = `
    <h5>Name: ${nykyinenLista[idx].name}</h5>
    <p>Height: ${nykyinenLista[idx].height}cm</p>
    <p>Weight: ${nykyinenLista[idx].mass}kg</p>
    <p>Eye color: ${nykyinenLista[idx].eye_color}</p>
    <p>Skin Color: ${nykyinenLista[idx].skin_color}</p>
    <p>Gender: ${nykyinenLista[idx].gender}</p>
    <p>Homeworld: ${tulos}</p>`
    }
} else if(nykyinenLuokka === 'planets/') {
    tiedotYhdestä.innerHTML = ''
    const lisääPisteet = muunna(nykyinenLista[idx].population)
    tiedotYhdestä.innerHTML = `
    <h5>Name: ${nykyinenLista[idx].name}</h5>
    <p>Climate: ${nykyinenLista[idx].climate}</p>
    <p>Population: ${lisääPisteet}</p>
    <p>Terrain: ${nykyinenLista[idx].terrain}</p>
    <p>Diameter: ${nykyinenLista[idx].diameter}km`
    
} else if(nykyinenLuokka === 'vehicles/') {
    const muokkaaCreditit = muunna(nykyinenLista[idx].cost_in_credits)
    const muokkaaCargo =  muunna(nykyinenLista[idx].cargo_capacity)
    tiedotYhdestä.innerHTML = ''
    tiedotYhdestä.innerHTML = `
    <h5>Name: ${nykyinenLista[idx].name}</h5>
    <p>Crew: ${nykyinenLista[idx].crew}</p>
    <p>Passengers: ${nykyinenLista[idx].passengers}</p>
    <p>Manufacturer: ${nykyinenLista[idx].manufacturer}</p>
    <p>Class: ${nykyinenLista[idx].vehicle_class}</p>
    <p>Max atmosphering speed: ${nykyinenLista[idx].max_atmosphering_speed}km/h</p>
    <p>Cost: ${muokkaaCreditit} credits</p>
    <p>Max Cargo: ${muokkaaCargo}kg</p>
    `
} else if(nykyinenLuokka === 'starships/') {
    const muokkaaCargo =  muunna(nykyinenLista[idx].cargo_capacity)
    const muokkaaCreditit = muunna(nykyinenLista[idx].cost_in_credits)
    const muokkaaCrew = muunna(nykyinenLista[idx].crew)
    const muokkaaPassangers = muunna(nykyinenLista[idx].passengers)
    tiedotYhdestä.innerHTML = ''
    tiedotYhdestä.innerHTML = `
    <h5>Name: ${nykyinenLista[idx].name}</h5>
    <p>Crew: ${muokkaaCrew}</p>
    <p>Passengers: ${muokkaaPassangers}</p>
    <p>Class: ${nykyinenLista[idx].starship_class}</p>
    <p>Model: ${nykyinenLista[idx].model}</p>
    <p>Manufacturer: ${nykyinenLista[idx].manufacturer}</p>
    <p>Cargo: ${muokkaaCargo}</p>
    <p>Cost: ${muokkaaCreditit} credits</p>`
}
}