// Import our custom CSS
import '../scss/styles.scss'
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'
// Importar estilos CSS
import '../css/style.css'
// Importar componenetes
import { Card } from "./components/card";
import { Pagination } from "./components/pagination";

const menuRegiones = document.querySelector('#regiones-menu')
const menuSubRegiones1 = document.querySelector('#subregiones-menu-1')
const menuSubRegiones2 = document.querySelector('#subregiones-menu-2')
const cardCountries1 = document.querySelector('#card-countries-1')
const cardCountries2 = document.querySelector('#card-countries-2')
const cardCountries3 = document.querySelector('#card-countries-3')
const cardCountries4 = document.querySelector('#card-countries-4')
const cardCountries5 = document.querySelector('#card-countries-5')
const paginacion = document.querySelector('#pagination-selector')

function main() {
    const countriesAll = request('https://restcountries.com/v3.1/all')
    
    countriesAll
    .then((data) => {
        rendererMenuRegion(data)
        rendererMenuSubregion(data)
        rendererCardCountries({data:data, numberCountries:25, index:0})
        rendererPagination(data)
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

function rendererCardCountries({data, numberCountries, index}) {
    //console.log(`Cantidad de paises: ${data.length}`)
    //console.log(data[0])

    for (let i = index; i < numberCountries; i++) {
        if (i <= 4 + index) {
            cardCountries1.innerHTML += Card(data[i].name.common, data[i].name.official, data[i].flags.png)
        } else if (i > 4 + index && i <= 9 + index) {
            cardCountries2.innerHTML += Card(data[i].name.common, data[i].name.official, data[i].flags.png)
        } else if (i > 9 + index && i <= 14 + index) {
            cardCountries3.innerHTML += Card(data[i].name.common, data[i].name.official, data[i].flags.png)
        } else if (i > 14 + index && i <= 19 + index) {
            cardCountries4.innerHTML += Card(data[i].name.common, data[i].name.official, data[i].flags.png)
        } else {
            cardCountries5.innerHTML += Card(data[i].name.common, data[i].name.official, data[i].flags.png)
        }
    }
}

function rendererPagination(data) {
    paginacion.innerHTML = Pagination({numberPage: 10, activePage: 0})

    let countries = [
        {'data': data, 'numberCountries': 25, 'index': 0},
        {'data': data, 'numberCountries': 25, 'index': 0},
        {'data': data, 'numberCountries': 50, 'index': 25},
        {'data': data, 'numberCountries': 75, 'index': 50},
        {'data': data, 'numberCountries': 100, 'index': 75},
        {'data': data, 'numberCountries': 125, 'index': 100},
        {'data': data, 'numberCountries': 150, 'index': 125},
        {'data': data, 'numberCountries': 175, 'index': 150},
        {'data': data, 'numberCountries': 200, 'index': 175},
        {'data': data, 'numberCountries': 225, 'index': 200},
        {'data': data, 'numberCountries': 250, 'index': 225},
        {'data': data, 'numberCountries': 250, 'index': 225},
    ]

        // Selecciona todos los enlaces de paginación
        const paginationLinks = document.querySelectorAll('.pagination .page-link');
        //console.log(paginationLinks)
        const paginationPageItems = document.querySelectorAll('.pagination .page-item');
        console.log(paginationPageItems)

        // Agrega un event listener a cada enlace
        paginationLinks.forEach((link) => {
            link.addEventListener('click', function(event) {
                event.preventDefault(); // Evita el comportamiento por defecto
        
                // Obtén el número de página desde el texto del enlace
                const pageNumber = this.textContent;
                console.log(`Clic en la página: ${pageNumber}`);
        
                // Aquí puedes agregar la lógica para manejar la paginación
                // Por ejemplo, cargar nuevos datos o actualizar el contenido de la página
                cardCountries1.innerHTML = ''
                cardCountries2.innerHTML = ''
                cardCountries3.innerHTML = ''
                cardCountries4.innerHTML = ''
                cardCountries5.innerHTML = ''
                
                if (pageNumber === 'Primero') {
                    rendererCardCountries(countries[0])
                    handlePageItemActive(paginationPageItems)
                    paginationPageItems[1].classList.add('active')
                } else if (pageNumber === 'Último') {
                    rendererCardCountries(countries[11])
                    handlePageItemActive(paginationPageItems)
                    paginationPageItems[10].classList.add('active')
                } else {
                    rendererCardCountries(countries[pageNumber])
                    handlePageItemActive(paginationPageItems)
                    paginationPageItems[pageNumber].classList.add('active')
                }
            });
        }); 
}

function handlePageItemActive(pageItem) {
    pageItem.forEach((item) => {
        item.classList.remove('active')
    }) 
}

document.addEventListener('DOMContentLoaded', main)