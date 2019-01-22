import React, { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

const Search = ({ text, onTextChange }) => {
  return (
    <div>
      find countries
      <input
        value={text}
        onChange={onTextChange}
      />
    </div>
  )
}

const Display = ({ message }) => <div>{message}</div>

const Countries = ({ countries, showCountry }) => 
  countries.map((country) => (
    <div key={country.numericCode}>
      {country.name}
      <button onClick={showCountry(country.name)}>show</button>
    </div>)
  )

const Weather = ({ city }) => {
  const [weather, setWeather] = useState({})
  const key = 'd5b8acaa04514579aeb143032192101'
  const baseUrl = `http://api.apixu.com/v1/current.json?key=${key}&q=`

  const hook = () => {
    axios
    .get(`${baseUrl}${city}`)
    .then((response) => {
      setWeather(response.data)
    })
  }
  useEffect(hook, [])

  return (
    <>
      <h2>Weather in {city}</h2>
      {weather.current &&
        <>
          <div>
            <strong>temperature:</strong> 
            {weather.current && weather.current.temp_c} Celcius
          </div>
          <div className="parent">
            <img alt={weather.current.condition.text} src={weather.current.condition.icon} />
          </div>
          <div>
            <strong>wind</strong> {weather.current.wind_kph} kph 
            direction {weather.current.wind_dir}
          </div>
        </>
      }
    </>
  )
}

const Country = ({ country }) => {

  const languages = () => 
    country.languages.map((language) => <li key={language.name}>{language.name}</li>)

  return (
    <>
      <h1>{country.name}</h1>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h2>languages</h2>
      <ul>
        {languages()}
      </ul>
      <div className="parent">
        <img alt={country.name} src={country.flag}/>
      </div>
      <Weather city={country.capital} />
    </>
  )
}

const Results = ({ searchText, countries, changeSearchText }) => {
  if (!searchText) {
    return <Display message={'search for countries'} />
  }

  if (countries.length === 0) {
    return <Display message={'no countries found'} />
  } else if (countries.length === 1) {
    return <Country country={countries[0]} />
  } else if (countries.length < 10) {
    return <Countries countries={countries} showCountry={changeSearchText} />
  } else {
    return <Display message={'Too many matches, specify another filter'} />
  }
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchText, setSearchText] = useState('')

  const hook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        setCountries(response.data)
      })
  }
  useEffect(hook, [])

  const onSearchTextChange = (event) => {
    setSearchText(event.target.value)
  }

  const changeSearchText = (text) => () => {
    setSearchText(text)
  }

  const criteria = searchText.toLowerCase()
  const filteredCountries = criteria
    ? countries.filter((country) => country.name.toLowerCase().includes(criteria))
    : countries

  return (
    <>
      <Search text={searchText} onTextChange={onSearchTextChange} />
      <Results 
        searchText={searchText} 
        countries={filteredCountries} 
        changeSearchText={changeSearchText}
      />
    </>
  )
}

export default App
