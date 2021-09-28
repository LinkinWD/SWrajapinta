/* Kaikista elokuvista tehdään arrayhyn oma objecti, joka sisältää sen nimen image kansiossa ja hakusanat joilla se haetaan rajapinnasta */

const ElokuvienPosterit = [
    {osoite: 'osa1',
    hakusanat: '+phantom+menace'},
    {osoite: 'osa2',
    hakusanat: '+attack+of+the+clones'},
    {osoite: 'osa3',
    hakusanat: '+revenge+of+the+sith'},
    {osoite: 'osa4',
    hakusanat: 'star wars'},
    {osoite: 'osa5',
    hakusanat: '+empire+strikes+back'},
    {osoite: 'osa6',
    hakusanat: '+return+of+the+jedi'},
    {osoite: 'osa7',
    hakusanat: '+force+awakens'},
    {osoite: 'osa8',
    hakusanat: '+last+jedi'},
    {osoite: 'osa9',
    hakusanat: '+rise+skywalker'}
    ]

/* async ja await ovat uusimpia synkronoituja javascript komentoja, ne siirtävät tehtävät selaimen hoidettavaksi ja toteuttavat ne vasta kun ne ovat tapahtuneet, koska esimerkiksi tietojen haku netin kautta vie aikaa */
const haeVideot = async (hakusana) => {
    try {
    let res = await axios.get(`https://www.omdbapi.com/?t=${hakusana}&apikey=cbb99747`)
    /* modernia tapaa otta tiedot vastauksesta, ottaa joukon eritietoja vastauksesta ja muuttaa ne käytettäviksi muuttujiksi. Javascript deconstruction. Silloin kun syötetään suoraan muutujia html tekstin sekaan, käytetään väärinpäin olevia yläpilkkuja */
    const {Title, Actors, BoxOffice, Director, Metascore, Released, Writer, Plot} = res.data
    tiedotYhdestä.innerHTML = ''
    tiedotYhdestä.innerHTML = `
    <h5>${Title}</h5>
    <p>Director: ${Director}</p>
    <p>Writter: ${Writer}</p>
    <p>Actors: ${Actors}</p>
    <br>
    <p>Boxoffice: ${BoxOffice}</P>
    <p>Released: ${Released}</p>
    <p>Metascore: ${Metascore}</p>
    <br>
    <p>Plot: ${Plot}</p>
    `

    } catch(err) {
        console.log(err.message)
    }
}

/* Luodaan domiin divi ja sen sisälle Image. Kuvan dataan tallenneteen hakusanat ja sen sijainti etsitään img kansiosta. Nämä tiedot saadaan kun käydään kaikki 'osa' kohdat läpi elokuvaposterista. Kaikkiin imageihin tallennetaan PerformanceEventTiming, kun sitä painaa se laukaisee haevideot function omilla data asetuksillaan */
const laitaPosteritDomiin = () => {
    for(let osa of ElokuvienPosterit) {
        const div = document.createElement('div')
        const img = document.createElement('img')
        img.src = `img/${osa.osoite}.jpg`
        img.dataset.hakusanat = osa.hakusanat
        img.addEventListener('click', function()  {
        haeVideot(this.dataset.hakusanat)
        })

        div.append(img)
        kuvaSektio.append(div)
    }
    const div = document.createElement('div')
    div.innerText = 'copyright: kohtuullinen käyttö opetukseen'
    kuvaSektio.append(div)
}
/* laitetaan elokuvat(niiden kuvat) suoraan domiin */
laitaPosteritDomiin()
