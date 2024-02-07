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

export default PersonForm