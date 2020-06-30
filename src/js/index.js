import { cities } from '../data/cityPhoto.js';
import { getWeatherByCity, getForecast } from './api';


function renderSelectedCity(cityKey) {
    let cityImage = cities[cityKey].url;
    let image = document.getElementById('image-placeholder');
    image.setAttribute('src', cityImage);
    getWeatherByCity(cities[cityKey].name).then(data => renderCityInfoBox(data))
}


function createCityDropdown(cities) {
    let select = document.createElement('select');
    let target = document.querySelector('.locations');
    select.setAttribute('name', 'city-selector');
    select.setAttribute('id', 'city-selector');
    select.setAttribute('class', 'locations__select');

    let emptyOption = document.createElement('option');
    emptyOption.setAttribute('value', 'none');
    emptyOption.innerText = '--select--';
    select.append(emptyOption);
    
    for (const city in cities) {
        let option = document.createElement('option');
        option.setAttribute('value', city)
        option.setAttribute('id', city)
        option.innerText = cities[city].name;
        select.append(option);
    }
    select.addEventListener('change', (event) => {
        let cityKey = event.target.value;
        renderSelectedCity(cityKey);
        localStorage.setItem('selectedCity', cityKey);
       
    })
    target.append(select);
}

function renderCityInfoBox(data) {
    const {name, main} = data;
    const container = document.createElement('div');
    let target = document.querySelector('.locations');

    container.classList.add('city-info-box');

    const cityName = document.createElement('div');
    cityName.innerText = `${name}: ${main.temp}`

    const celsius = document.createElement('span')
    celsius.innerHTML = '&#x2103;'

    
    cityName.append(celsius)
    container.append(cityName)
    target.append(container);
}

createCityDropdown(cities);


const selectedCity = localStorage.getItem('selectedCity');


if(selectedCity) {
    getForecast(cities[selectedCity].name).then(data => {

        return data.list.reduce((accumulator, item) => {
            const dateKey = new Date(item.dt_txt).getDate();
            if(!accumulator[dateKey]) {
                accumulator[dateKey] = [];
            }
            accumulator[dateKey].push(item);
            return accumulator;
        }, {})

    }).then(result => {
        for(let day in result) {
            console.log(result[day])
        }
    })

    let selectedCityElement = document.getElementById(selectedCity)
    if(selectedCityElement){
        selectedCityElement.selected = true
        renderSelectedCity(selectedCity);
    } 
} else {
    console.log('...simple flow');
}
