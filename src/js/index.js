import '../styles/style.scss';
import { cities } from '../data/cityPhoto.js';
import { getByCity } from './api';

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
        option.innerText = cities[city].name;
        select.append(option);
    }
    select.addEventListener('change', (event) => {
        let cityKey = event.target.value;
        let cityImage = cities[cityKey].url;
        let image = document.getElementById('image-placeholder');
        image.setAttribute('src', cityImage);
        // CALL API FOR CITY DATA
        //getByCity(cities[cityKey].name).then().then()....
    })
    target.append(select);
}

createCityDropdown(cities);
