import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter,  setFilter ] =  useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }
  const personsToShow = () => {
    if(filter.length > 0)
      return persons.filter(p => p.name.toLowerCase().includes(filter))
    return persons
  }

  const addName = (event) => {
    event.preventDefault()
    if(newName.length > 0) {
      if(persons.map(p => p.name).includes(newName)) {
        alert(`${newName} is already added to phonebook`)
      } else {
        setPersons(persons.concat({name: newName, number: newNumber}))
        setNewName('')
        setNewNumber('')
      }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personsToShow().map(person => <p>{person.name} {person.number}</p>)}
    </div>
  )
}

export default App
