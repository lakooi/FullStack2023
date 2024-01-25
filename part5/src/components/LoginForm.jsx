

const LoginForm = ({ handler, username, password, usernameSetter, passwordSetter }) => (
  <div>
    <form onSubmit={handler}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => usernameSetter(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => passwordSetter(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  </div>
  
)

export default LoginForm