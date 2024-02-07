import axios from 'axios'

const api_key = import.meta.env.VITE_WEATHER_KEY

const getWeather = (country) => {
    return axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}&units=metric`)
}

export default { 
    getWeather: getWeather
}

