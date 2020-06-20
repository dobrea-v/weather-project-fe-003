// const API_KEY = '.....you api key';

export function getByCity(city) {
    return fetch(`api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}`)
}