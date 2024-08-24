// Import our custom CSS
import '../scss/styles.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
// Importar componenetes
import { Card } from "./components/card";

const menuRegiones = document.querySelector('#regiones-menu')
const menuSubRegiones1 = document.querySelector('#subregiones-menu-1')
const menuSubRegiones2 = document.querySelector('#subregiones-menu-2')
const cardCountries1 = document.querySelector('#card-countries-1')
const cardCountries2 = document.querySelector('#card-countries-2')
const cardCountries3 = document.querySelector('#card-countries-3')
const cardCountries4 = document.querySelector('#card-countries-4')
const cardCountries5 = document.querySelector('#card-countries-5')

function main() {
    const countriesAll = request('https://restcountries.com/v3.1/all')

    countriesAll
    .then((data) => {
        rendererMenuRegion(data)
        rendererMenuSubregion(data)
        rendererCardCountries(data)
    })
    .catch((error) => console.error(error))
}

Array.prototype.clean = function() {
    for (let i = 0; i < this.length; i++) {
        if (this[i] === undefined ) {
            this.splice(i, 1)
        }
        
        return this
    }
}

async function request(url) {
    const response = await fetch(url)

    if (response.ok) {
        const data = await response.json()

        return data
    } else {
        throw new Error('Falló la conexión...')
    }
}

function rendererMenuRegion(data) {
    //console.log(data)
    const regiones = data.map((item) => item.region)
    //console.log(regiones)
    regiones.sort((a, b) => a.localeCompare(b))
    //console.log(regiones)
    const regionesOnly = new Set(regiones)
    //console.log(regionesOnly)
    
    regionesOnly.forEach((item) => {
        menuRegiones.innerHTML += `
            <li><a class="dropdown-item" href="#">${item}</a></li>
        `
    })
}

function rendererMenuSubregion(data) {
    //console.log(data)
    const subregiones = data.map((item) => item.subregion)
    //console.log(subregiones)
    subregiones.sort((a, b) => a.localeCompare(b))
    //console.log(subregiones)
    const subregionOnly = new Set(subregiones.filter((item) => item != undefined))
    //console.log(subregionOnly)
    const subregionesArray = [...subregionOnly]
    //console.log(`subregionesArray: ${subregionesArray[11]}`)

    subregionesArray.forEach((item, index) => {
        //console.log(`Indice: ${index}`)
        if (index <= 11) {
            menuSubRegiones1.innerHTML += `
                <li><a class="dropdown-item" href="#">${item}</a></li>
            `
        } else {
            menuSubRegiones2.innerHTML += `
                <li><a class="dropdown-item" href="#">${item}</a></li>
            `
        }
    })
}

function rendererCardCountries(data) {
    //console.log(`Cantidad de paises: ${data.length}`)
    //console.log(data[0])
    const countCountries = 25

    for (let i = 0; i < countCountries; i++) {
        if (i <= 4) {
            cardCountries1.innerHTML += Card(data[i].name.common, data[i].name.official, data[i].flags.png)
        } else if (i > 4 && i <= 9) {
            cardCountries2.innerHTML += Card(data[i].name.common, data[i].name.official, data[i].flags.png)
        } else if (i > 9 && i <= 14) {
            cardCountries3.innerHTML += Card(data[i].name.common, data[i].name.official, data[i].flags.png)
        } else if (i > 14 && i <= 19) {
            cardCountries4.innerHTML += Card(data[i].name.common, data[i].name.official, data[i].flags.png)
        } else {
            cardCountries5.innerHTML += Card(data[i].name.common, data[i].name.official, data[i].flags.png)
        }
    }
}

document.addEventListener('DOMContentLoaded', main)