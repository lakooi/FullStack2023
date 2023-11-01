import { useState, useEffect } from 'react'
import Finder from './components/Finder'
import CountryList from './components/Countrylist'
import countryService from './services/countries'


const App = () => {

  const [countries, setCountries] = useState(null) 
  const [filter, setFilter] = useState("")


  useEffect(() => {
    countryService
      .getAll()
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  if (!countries) { 
    return null 
  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }
  const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div>
      <Finder filterHandler={handleFilterChange} filterValue={filter}/>
      <CountryList countries={countriesToShow} setFilter={setFilter} />
    </div>
  )

}

export default App
