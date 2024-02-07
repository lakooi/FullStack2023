import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import './index.css'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [positiveMessage, setPositiveMessage] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  const findPersonByName = name => persons.find(person => person.name === name)

  const addPerson = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }

    const existingPerson = findPersonByName(newName)

    if(existingPerson){
      if (existingPerson.number === newNumber) {
        alert(`${newName} is already in the phonebook with this number`)
        return
      }
    
      const updateBoolean = confirm(`${existingPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if(updateBoolean){
        phonebookService
          .update(existingPerson.id, personObject)
          .then(response => {
            setPersons(
              persons.map(item => {
                if(item.id === existingPerson.id){
                  return response.data
                }
                return item
              })
            ),
            setPositiveMessage(`${newName} had their number changed`)
            setTimeout(() => {
              setPositiveMessage(null)
            }, 5000)
            setNewName("")
            setNewNumber("")
          })
          .catch(error => {
            setErrorMessage(`Information on ${newName} has already been removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
      }
    }else{
      phonebookService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setPositiveMessage(`Added ${newName}`)
          setTimeout(() => {
            setPositiveMessage(null)
          }, 5000)
          setNewName("")
          setNewNumber("")

        })
    }
    

  }

  const handleFilterChange = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  const handleNameFormChange = (event) => {
    event.preventDefault()
    setNewName(event.target.value)
  }

  const handleNumberFormChange = (event) => {
    event.preventDefault()
    setNewNumber(event.target.value)
  }

  const handleDelete = id => {
    const personName = persons.filter(person => person.id === id)[0].name
    const deleteBoolean = confirm(`Delete ${personName}?`)
    if (deleteBoolean){
      phonebookService
        .remove(id)
        .then(response => 
          setPersons(persons.filter(person => person.id !== id))
        )
        .catch(error => {
          setErrorMessage(`Information on ${personName} has already been removed from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} className="error"/>
      <Notification message={positiveMessage} className="positive"/>
      <Filter handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameFormChange={handleNameFormChange} handleNumberFormChange={handleNumberFormChange}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
  </div>
  )
}

export default App