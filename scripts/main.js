/* DOM elementit */
const luokka = document.querySelector('.luokka')
const kohdeLista = document.querySelector('.kohdelista')

const edellinen = document.querySelector('.edellinen')
const seuraava = document.querySelector('.seuraava')

/* yhteystiedot */
const osoite = 'https://swapi.dev/api/'
const ihmiset = 'people/'
let nykyinenOtsikko = ''
let nykyinenLista = []

const yhteys = async (luokka,nro = '') => {
    let res = await axios.get(osoite+luokka+nro)
    console.log(res.data.next)
    let lista =res.data.results
    for(let asia of lista) {
        nykyinenLista.push(asia)
    }
    nykyinenOtsikko = luokka.slice (0, -1)
}
let tämäSivu = yhteys(ihmiset)

function lisääLista() {
    luokka.innerHTML = `<h2>${nykyinenOtsikko}</h2>`
    const ul = document.createElement('ul')
    for(let asia of nykyinenLista){
        const li = document.createElement('li')
        li.innerText = asia.name
        li.addEventListener('click', function() {
            let etsi =nykyinenLista.find(nimi => nimi === this.innerText)
            console.log(etsi)
        })
        ul.append(li)

    }
    kohdeLista.append(ul)
}

