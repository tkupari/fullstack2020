import React, { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

const Notification = ({ message, messageClass }) => {
  if(message === null)
    return null

  return (
    <div className={'message ' + messageClass}>
      {message}
    </div>
  )
}

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

const PersonForm = ({ persons, setPersons, notify }) => {
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
      const existing = persons.find(p => p.name === newName)
      if(existing) {
        if(window.confirm(`${newName} is already added to phonebook. Do you want to update the phone number?`)) {
          const personData = {...existing, number: newNumber}
          phonebookService.update(existing.id, personData)
            .then(newPerson => {
              setPersons(persons.map(p => p.id !== existing.id ? p : newPerson))
              notify(`Updated ${newPerson.name}`)
            })
        }
      } else {
        const personData = {name: newName, number: newNumber}
        phonebookService.create(personData)
          .then(newPerson => {
            setPersons(persons.concat(newPerson))
            notify(`Added ${newPerson.name}`)
          })
      }
      setNewName('')
      setNewNumber('')
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

const Person = ({ person, deleteperson }) => {

  return (
    <div>
      {person.name} {person.number}
      <button onClick={() => deleteperson(person)}>delete</button>
    </div>
  )
}

const Persons = ({ persons, filter, setpersons, notify, error }) => {
  const deletePerson = (person) => {
    phonebookService.remove(person.id).then(_response => {
      notify(`${person.name} deleted`)
      setpersons(persons.filter(p => p.id !== person.id))
    }).catch(_response => {
      error(`${person.name} has already been deleted from server`)
      setpersons(persons.filter(p => p.id !== person.id))
    })
  }
  const personsToShow = filter.length > 0
    ? persons.filter(p => p.name.toLowerCase().includes(filter))
    : persons
  return (
    <div>
    {personsToShow.map(person => <Person key={person.name} person={person} deleteperson={deletePerson} />)}
    </div>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
  ])
  const [ filter,  setFilter ] =  useState('')
  const [ message, setMessage ] = useState(null)
  const [ messageClass, setMessageClass ] = useState('info')

  const loadData = () => {
    phonebookService.getAll().then(initialData => 
      setPersons(initialData)
    )
  }
  useEffect(loadData, [])

  const showMessage = (message, messageClass) => {
    setMessage(message)
    setMessageClass(messageClass)
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  const notify = (message) => {
    showMessage(message, 'info')
  }

  const error = (message) => {
    showMessage(message, 'error')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageClass={messageClass} />
      <Filter filter={filter} setFilter={setFilter} />
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} notify={notify}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} setpersons={setPersons} notify={notify} error={error}/>
    </div>
  )
}

export default App
