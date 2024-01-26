import PropTypes from 'prop-types'

const Notification = ({ errorMessage, positiveMessage }) => {
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

Notification.propTypes = {
  errorMessage: PropTypes.string,
  positiveMessage: PropTypes.string
}

export default Notification