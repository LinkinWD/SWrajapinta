/* DOM elementit */
const esittelyAlue = document.querySelector('.esittelyalue')
const luokka = document.querySelector('.luokka')
const kohdeLista = document.querySelector('.kohdelista')
const vasenNappi = document.querySelector('.vasennappi')
const oikeaNappi = document.querySelector('.oikeanappi')
const tiedotYhdestä = document.querySelector('.tiedotyhdestä')


/* navbarin kuuntelija. Kun painat haluttua listaaa(ihmiset, planeetat....), tämä function hakee html osaan data-id:nä tallennetun luokka osoitteen ja tallentaa sen nykyiseksi luokaksi*/
const navElementit = document.querySelectorAll('.navlistaelementit')

navElementit.forEach(kohde => 
    kohde.addEventListener('click', function() {
        nykyinenLuokka = this.dataset.id
        yhteys(nykyinenLuokka)
    }))
/* Sivuun liittyvät muutujat. Otsikko, lista mihin tallennetaan saadut tiedot, nykyinen luokka ja nappien osoitteet, että osaavat vaihtaa sivuja*/
let nykyinenOtsikko = ''
let nykyinenLista = []
let nykyinenLuokka = ''
let edellinenNappi = ''
let seuraavaNappi = ''


/* Yhteys function, luodaan listat kohteista sivulle */
/* Haetaan tiedot axioksen avulla määrätystä luokasta, joka on valittu navbarista, luodaan otsikko ja käynnistetään päivitäLista function 'responsella' mikä on saatu rajapinnasta */
const yhteys = async (luokka) => {
    try {
    let res = await axios.get('https://swapi.dev/api/'+luokka)
    nykyinenOtsikko = luokka.slice (0, -1)
    päivitäLista(res)
    muutaTaustakuva()
    } catch(err) {
        console.log(err.message)
    }
}
/* vähän sama kuin yläpuolella, mutta nyt käytetään edellinenNappi ja seuraavaNappiin tallennettuja haku osoittetita */
const vaihdaSivua= async (nappi) => {
    try {
    let res = await axios.get(nappi)
    päivitäLista(res)
    } catch(err) {
        console.log(err.message)
    }
}


/* Etsitään nykyisestä listasta sen indeksi, jolla on sama name kuin tässä lista elementissä on teksti */
function näytäTiedot() {
    const etsi = nykyinenLista.findIndex(kohde => kohde.name === this.innerText )
    console.log(nykyinenLista[etsi])
    yhdenTiedot(etsi)
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
/* Luodaan napit listalle ja lisätään niihin kuuntelija, jos haluaa vaihtaa sivua */
const lisääNapit = () => {
    /* jos arvo on null, eli napilla ei ole osoitetta, sitä ei luoda */
    if(edellinenNappi) {
        vasenNappi.innerHTML = ''
        let nappi = document.createElement('button')
        nappi.innerText = "Edellinen"
        nappi.addEventListener('click', function() {
            vaihdaSivua(edellinenNappi)
        })
        vasenNappi.append(nappi)
    }
    if(seuraavaNappi) {
        oikeaNappi.innerHTML = ''
        let nappi = document.createElement('button')
        nappi.innerText = "Seuraava"
        nappi.addEventListener('click', function(){ vaihdaSivua(seuraavaNappi)})
        oikeaNappi.append(nappi)
    }
}

/* nykyinen lista muuttuja tyhjennetään ja täytetään. Asetetaan nappi muutujille osoitteet. tyhjennetään dom lista ja käynnistetään function lisäälista ja napit */ 
const päivitäLista = (res) => {
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
const muutaTaustakuva = () => {
    if(nykyinenOtsikko === 'people') {
        esittelyAlue.style.backgroundImage = "url('img/darth.jpg')"
    } else if(nykyinenOtsikko === 'planets') {
        esittelyAlue.style.backgroundImage = "url('img/tatooine.jpg')"
    } else if (nykyinenOtsikko === 'vehicles') {
        esittelyAlue.style.backgroundImage = "url('img/at.jpg')"
    } else if(nykyinenOtsikko === 'starships') {
        esittelyAlue.style.backgroundImage = "url('img/deathstar.jpg')"
    }
}
