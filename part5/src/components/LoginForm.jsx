import PropTypes from 'prop-types'


const LoginForm = ({ handler, username, password, usernameSetter, passwordSetter }) => (
  <div>
    <form onSubmit={handler}>
      <div>
        username
        <input
          type="text"
          value={username}
          data-cy="username"
          name="Username"
          onChange={({ target }) => usernameSetter(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          data-cy="password"
          name="Password"
          onChange={({ target }) => passwordSetter(target.value)}
        />
      </div>
      <button type="submit" data-cy="login-button">log in</button>
    </form>
  </div>
)


LoginForm.propTypes = {
  handler: PropTypes.func.isRequired,
  usernameSetter: PropTypes.func.isRequired,
  passwordSetter: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}
export default LoginForm