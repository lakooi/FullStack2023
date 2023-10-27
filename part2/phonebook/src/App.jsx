import { useState, useEffect } from 'react'
import phonebookService from './services/phonebook'

const Filter = ({handleFilterChange}) => {
  return (
    <div>
      filter shown with <input onChange={handleFilterChange}></input>
    </div>
  )
}

const Persons = ({persons, handleDelete}) => {
  return (
    <div>
       {persons.map(person =>
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={()=> handleDelete(person.id)}>delete</button>
        </div>
      )}
    </div>
  )
}

const PersonForm = ({addPerson, newName, newNumber, handleNameFormChange, handleNumberFormChange}) => {
  return (
    <form onSubmit={addPerson}>
        <div> name: 
          <input value={newName} onChange={handleNameFormChange} /> 
        </div>
        <div>number: 
          <input value={newNumber} onChange={handleNumberFormChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 

  useEffect(() => {
    phonebookService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  const findPersonByName = name => persons.find(person => person.name === name);

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

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
            setNewName("")
            setNewNumber("")
          })
      }
    }else{
      phonebookService
        .create(personObject)
        .then(response => {
          personObject.id=persons.length+1
          setPersons(persons.concat(personObject))
          setNewName("")
          setNewNumber("")
        })
    }
    

  }

  const handleNameFormChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberFormChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleDelete = id => {
    console.log("deleting " + id)
    const personName = persons.filter(person => person.id === id)[0].name
    const deleteBoolean = confirm(`Delete ${personName}?`)
    if (deleteBoolean){
      phonebookService
        .remove(id)
        .then(response => 
          setPersons(persons.filter(person => person.id !== id))
        )
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} newNumber={newNumber} handleNameFormChange={handleNameFormChange} handleNumberFormChange={handleNumberFormChange}/>
      <h3>Numbers</h3>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
  </div>
  )
}

export default App