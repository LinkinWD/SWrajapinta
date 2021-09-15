/* DOM elementit */
const luokka = document.querySelector('.luokka')
const kohdeLista = document.querySelector('.kohdelista')



/* navbarin kuuntelija */
const navElementit = document.querySelectorAll('.navlistaelementit')

navElementit.forEach(kohde => 
    kohde.addEventListener('click', function() {
        nykyinenLuokka = this.dataset.id
        yhteys(nykyinenLuokka)
    }))
/* yhteystiedot ja niihin liittyvät muutujat */
const osoite = 'https://swapi.dev/api/'
const ihmiset = 'people/'
let nykyinenOtsikko = ''
let nykyinenLista = []
let nykyinenLuokka = ''
let edellinenNappi = ''
let seuraavaNappi = ''

/* Yhteys function, luodaan listat kohteista sivulle */
/* ensinluodaan yhteys axios get ja tyhjennetään nykyinen lista muutuja, mihin aina sivujen sisältö työnnetään seuraavaksi. Tehdään otsikko ja asennetaan napeille osoitteet mitkää saadaan verkkosivulta vastauksena. Tyhjennetäänn lista DOM:ista ja lisätään lista ja napit functioilla */
const yhteys = async (luokka) => {
    let res = await axios.get(osoite+luokka)
    nykyinenLista = []
    let lista =res.data.results
    for(let asia of lista) {
        nykyinenLista.push(asia)
    }
    nykyinenOtsikko = luokka.slice (0, -1)
    edellinenNappi = res.data.previous
    seuraavaNappi = res.data.next
    kohdeLista.innerHTML = ''
    lisääLista()
    lisääNapit()
}
const vaihdaSivua= async (nappi) => {
    let res = await axios.get(nappi)
    nykyinenLista = []
    let lista =res.data.results
    for(let asia of lista) {
        nykyinenLista.push(asia)
    }
    edellinenNappi = res.data.previous
    seuraavaNappi = res.data.next
    kohdeLista.innerHTML = ''
    lisääLista()
    lisääNapit()
}


/* Etsitään nykyisestä listasta sen indeksi, jolla on sama name kuin tässä lista elementissä on teksti */
function näytäTiedot() {
    const etsi = nykyinenLista.findIndex(kohde => kohde.name === this.innerText )
    console.log(etsi)
}
/* Luodaan lista elementti ja liitetään siihen kaikki nimet nykyiseltälistalta */
function lisääLista() {
    luokka.innerHTML = `<h2>${nykyinenOtsikko}</h2>`
    const ul = document.createElement('ul')
    for(let asia of nykyinenLista){
        const li = document.createElement('li')
        li.innerText = asia.name
        li.addEventListener('click', näytäTiedot)
        ul.append(li)

    }
    kohdeLista.append(ul)
}
const lisääNapit = () => {
    if(edellinenNappi) {
        let nappi = document.createElement('button')
        nappi.innerText = "Edellinen"
        nappi.addEventListener('click', function() {
            vaihdaSivua(edellinenNappi)
        })
        luokka.append(nappi)
    }
    if(seuraavaNappi) {
        let nappi = document.createElement('button')
        nappi.innerText = "Seuraava"
        nappi.addEventListener('click', function(){ vaihdaSivua(seuraavaNappi)})
        luokka.append(nappi)
    }
}
