import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [newAuthor, authorSetter] = useState('')
  const [newTitle, titleSetter] = useState('')
  const [newUrl, urlSetter] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    authorSetter('')
    titleSetter('')
    urlSetter('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title
          <input
            type="text"
            value={newTitle}
            name="Title"
            onChange={({ target }) => titleSetter(target.value)}
            placeholder="input title here"
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newAuthor}
            name="Author"
            onChange={({ target }) => authorSetter(target.value)}
            placeholder="input author here"
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={newUrl}
            name="Url"
            onChange={({ target }) => urlSetter(target.value)}
            placeholder="input url here"
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm