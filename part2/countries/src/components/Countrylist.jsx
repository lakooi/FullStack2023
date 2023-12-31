import { useState } from 'react'
import Country from './Country'


const CountryList = ({countries, setFilter}) => {
    if(countries.length > 10){
        return(
        <div>
            Too many matches specify another filter
        </div>
        )
    }else if(countries.length !== 1){
        return (
            <div>
                {countries.map(country => {
                    return <div key={country.name.common}>
                        {country.name.common}
                        <button onClick={() => setFilter(country.name.common)}>show</button>
                    </div>
                })}
            </div>
        )
    }else{
        return <Country country={countries[0]} />
    }

}

export default CountryList
