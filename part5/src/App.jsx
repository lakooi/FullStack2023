import { useState, useEffect, useRef } from 'react'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage,setErrorMessage] = useState(null)
  const [positiveMessage, setPositiveMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])


  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setPositiveMessage('Log In Successfull')
      setTimeout(() => {
        setPositiveMessage(null)
      }, 5000)
    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setPositiveMessage('Logged Out Successfully')
    setTimeout(() => {
      setPositiveMessage(null)
    }, 5000)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService.create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setPositiveMessage(`a new blog ${blogObject.title} by ${blogObject.author} has been added`)
        setTimeout(() => {
          setPositiveMessage(null)
        }, 5000)
      })
  }

  const updateBlog = (id, blogObject) => {
    blogService.update(id, blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
        setPositiveMessage(`blog ${blogObject.title} by ${blogObject.author} has been liked`)
        setTimeout(() => {
          setPositiveMessage(null)
        }, 5000)
      })
  }

  const removeBlog = (id) => {
    const blog = blogs.filter(blog => blog.id === id)[0]
    blogService.remove(id)
      .then(returnedBlog => {
        setBlogs(blogs.filter(blog => blog.id !== id))
        setPositiveMessage(`blog ${blog.title} by ${blog.author} has been removed`)
        setTimeout(() => {
          setPositiveMessage(null)
        }, 5000)
      })
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification positiveMessage={positiveMessage} errorMessage={errorMessage} />
        <LoginForm handler={handleLogin} username={username} password={password} usernameSetter={setUsername} passwordSetter={setPassword} />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification positiveMessage={positiveMessage} errorMessage={errorMessage} />
      <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      <BlogList blogs={blogs} updateBlog={updateBlog} removeBlog={removeBlog} user={user}/>
    </div>
  )

}

export default App
