import React, { useState, useEffect } from 'react';
import personService from './services/persons'
import Notification from './components/Notification'

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

const Persons = ({ persons, removePerson }) => {
  const rows = () =>
    persons.map(person =>
      <div key={person.id}>
        {person.name} {person.number}
        <button onClick={() => removePerson(person.id)}>poista</button>
      </div>
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
  const [ message, setMessage ] = useState()

  const getPersons = () => {
    personService.getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }
  useEffect(getPersons, [])

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

    const lowerCaseName = newName.toLowerCase()
    const existingPerson = persons.find( person => 
      person.name.toLowerCase() === lowerCaseName 
    )

    if (existingPerson) {
      if (window.confirm(`${newName} on jo olemassa. Korvataanko vanha numero uudella?`)) {
        const changedPerson = {...existingPerson, number: newNumber}
        personService.update(changedPerson.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person =>
              person.id !== returnedPerson.id ? person : returnedPerson
            ))
            setNewName('')
            setNewNumber('')
            setMessage({
              text: `Muokattiin ${returnedPerson.name}`,
              type: 'success',
            })
            setTimeout(() => {
              setMessage({})
            }, 5000)
          })
          .catch(error => {
            setMessage({
              text: `Henkilö ${existingPerson.name} oli jo poistettu`,
              type: 'error',
            })
            setTimeout(() => {
              setMessage({})
            }, 5000)
          })
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber,
    }

    personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setMessage({
          text: `Lisättiin ${returnedPerson.name}`,
          type: 'success',
        })
        setTimeout(() => {
          setMessage({})
        }, 5000)
      })
  }

  const removePerson = id => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Poistetaanko ${person.name}?`)) {
      personService.remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage({
            text: `Poistettiin ${person.name}`,
            type: 'success',
          })
          setTimeout(() => {
            setMessage({})
          }, 5000)
        })
    }
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

      <Notification message={message} />

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
      <Persons persons={filterPersonsToShow()} removePerson={removePerson} />
    </>
  )
}

export default App
