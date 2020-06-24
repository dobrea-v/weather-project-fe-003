const API_KEY = '0ffd416aff3105ed18298e35a8ffaf0c';

export function getWeatherByCity(city) {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&&appid=${API_KEY}`).then(rsp => rsp.json())
}
