import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Data = ({countries, filter}) => {

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter))

  if(filter === '' || filteredCountries.length > 10) {
    return (
      <p>Too many, specify another filter</p>
    )
  } else if(filteredCountries.length > 1) {
    return (
      <div>
        {filteredCountries.map((country, index) => <p key={index}>{country.name}</p>)}
      </div>
    )
  } else {
    const country = filteredCountries[0]
    console.log(country)
    return (
      <div>
        <h1>{country.name}</h1>
        <p>
          capital {country.capital}<br/>
          population {country.population}
        </p>
        <h2>languages</h2>
        <ul>
          {country.languages.map((lang, index) => <li key={index}>{lang.name}</li>)}
        </ul>
        <img src={country.flag} height="200"/>
      </div>
    )
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    const url = 'https://restcountries.eu/rest/v2/all'
    // const url = 'http://localhost:3001/countries'
    axios.get(url).then(response => {
      setCountries(response.data)
    })
  }, [])

  const filterChanged = (event) => {
    setFilter(event.target.value)
  }


  return (
    <div>
      find countries <input value={filter} onChange={filterChanged}/>
      <Data countries={countries} filter={filter} />
    </div>
  );
}

export default App;
