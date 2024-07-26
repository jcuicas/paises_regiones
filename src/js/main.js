// Import our custom CSS
import '../scss/styles.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

const menuRegiones = document.querySelector('#regiones-menu')
const menuSubRegiones = document.querySelector('#subregiones-menu')

function main() {
    const countriesAll = request('https://restcountries.com/v3.1/all')

    countriesAll
    .then((data) => {
        rendererMenuRegion(data)
        rendererMenuSubregion(data)
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

    subregionOnly.forEach((item) => {
        menuSubRegiones.innerHTML += `
            <li><a class="dropdown-item" href="#">${item}</a></li>
        `
    })
}

document.addEventListener('DOMContentLoaded', main)