import React, { useState, useEffect } from 'react';
import axios from 'axios'

const Filter = ({ personsFilter, handleFilterChange }) => {
  return (
    <div>
      rajaa näytettäviä: <input
        value={personsFilter}
        onChange={handleFilterChange}
      />
    </div>
  )
}

const PersonForm = ({ addPerson, name, handleNameChange, number, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        nimi: <input
          value={name}
          onChange={handleNameChange}
          required
        />
      </div>
      <div>
        numero: <input
          value={number}
          onChange={handleNumberChange}
          required
        />
      </div>
      <div>
        <button type="submit">lisää</button>
      </div>
    </form>
  )
}

const Persons = ({ persons }) => {
  const rows = () =>
    persons.map(person =>
      <div key={person.id}>{person.name} {person.number}</div>
    )

  return (
    rows()
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ personsFilter, setNewFilter ] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:4200/persons')
      .then((response) => {
        setPersons(response.data)
      })
  }
  useEffect(hook, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find( person => person.name === newName )) {
      alert(`${newName} on jo olemassa`)
      return
    }

    const nameObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }

    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const filterPersonsToShow = () => {
    if (personsFilter) {
      const stringToCompare = personsFilter.toLowerCase()
      return persons.filter(person => person.name.toLowerCase().includes(stringToCompare))
    } else {
      return persons
    }
  }

  return (
    <>
      <h1>Puhelinluettelo</h1>

      <Filter personsFilter={personsFilter} handleFilterChange={handleFilterChange} />

      <h2>Lisää uusi</h2>
      <PersonForm 
        addPerson={addPerson} 
        name={newName} 
        handleNameChange={handleNameChange} 
        number={newNumber} 
        handleNumberChange={handleNumberChange}
      />

      <h2>Numerot</h2>
      <Persons persons={filterPersonsToShow()} />
    </>
  )
}

export default App
