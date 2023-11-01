import { useState } from 'react'

const Finder = ({filterValue, filterHandler}) => {

  return (
    <div>
      find countries <input value={filterValue} onChange={filterHandler} />
    </div>
  )

}

export default Finder
