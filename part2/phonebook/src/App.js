import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

const Filter = ({ filter, setFilter }) => {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  return (
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange}/>
      </div>
  )
}

const PersonForm = ({ persons, setPersons }) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const addName = (event) => {
    event.preventDefault()
    if(newName.length > 0) {
      if(persons.map(p => p.name).includes(newName)) {
        alert(`${newName} is already added to phonebook`)
      } else {
        const personData = {name: newName, number: newNumber}
        phonebookService.create(personData)
          .then(newPerson => {
            setPersons(persons.concat(newPerson))
            setNewName('')
            setNewNumber('')
          })
      }
    }
  }
  return (
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Persons = ({ persons, filter }) => {
  const personsToShow = filter.length > 0
    ? persons.filter(p => p.name.toLowerCase().includes(filter))
    : persons
  return (
    <div>
    {personsToShow.map(person => <p>{person.name} {person.number}</p>)}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
  ])
  const [ filter,  setFilter ] =  useState('')

  const loadData = () => {
    phonebookService.getAll().then(initialData => 
      setPersons(initialData)
    )
  }
  useEffect(loadData, [])


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App
