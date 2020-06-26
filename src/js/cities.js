import { getWeatherByCity } from './api';
import { cities } from '../data/cityPhoto';


function renderCity(data) {
    const container = document.querySelector('.cities-list');
    const cityContainer = document.createElement('div')
    const cityName = document.createElement('span');
    cityContainer.innerText = data.main.temp;
    cityContainer.append(cityName)
    cityName.innerText = `: ${data.name}`;
    container.append(cityContainer);
}

let arrayOfPromises = [];

for(let city in cities) {
    arrayOfPromises.push(getWeatherByCity(cities[city].name))
}

Promise.all(arrayOfPromises).then(data => data.map(item => renderCity(item)))
