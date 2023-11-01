import WeatherService from '../services/weatherInfo'
import { useState, useEffect } from 'react'

const CountryInfo = ({country}) => {

    console.log(country)
    return (
        <>
            <h1>{country.name.common}</h1>
            <div>
                <p>capital {country.capital}</p>
                <p>population {country.population}</p>
            </div>
            <h3>languages</h3>
            <ul>
                {Object.values(country.languages).map((language, index) => (
                    <li key={language}>{language}</li>
                ))}
            </ul>
            <img style={{width: '30%', height: '30%'}} src={country.flags.png} alt="flag"/>
        </>
    )
}

const CountryWeatherInfo = ({country, weather}) => {

    const weatherIconBaseUrl = "https://openweathermap.org/img/wn/"
    return (
        <>
            <h3>Weather in {country.capital}</h3>
            <div>
                <p>temperature: {weather.main.temp} celcius </p> 
            </div>
            <img src={weatherIconBaseUrl+weather.weather[0].icon+"@2x.png"} alt="weather" />
            <div>
                <p>wind:{weather.wind.speed} m/s </p> 
            </div>
        </>

    )
}

const Country = ({country}) => {

    const [weatherData, setWeatherData] = useState(null)

    useEffect(() => {
        WeatherService
        .getWeather(country)
        .then(response => {
          setWeatherData(response.data)
        })
    }, [country])

    if (!weatherData) { 
        return null 
    }

    return (
        <div>
            <CountryInfo country={country}/>
            <CountryWeatherInfo country={country} weather={weatherData} />
        </div>
    )
}
  
export default Country
  