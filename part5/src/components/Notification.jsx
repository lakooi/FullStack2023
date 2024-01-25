const Notification = ({errorMessage, positiveMessage}) => {
  if (errorMessage !== null){
    return(
      <div className="error">{errorMessage}</div>
    )
  } 
  if (positiveMessage !== null) {
    return(
      <div className="positive">{positiveMessage}</div>
    )
  }
}

export default Notification