import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, removeBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const putBlog = (event) => {
    const addedLike = blog.likes + 1
    event.preventDefault()
    updateBlog(blog.id, {
      user: blog.user,
      likes: addedLike,
      title: blog.title,
      author: blog.author,
      url: blog.url
    })
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)){
      removeBlog(blog.id)
    }
  }

  return(
    <div style={blogStyle} className='blog'>

      {blog.title} {blog.author}<Togglable buttonLabel='view' cancelButtonLabel="hide" staticButton>
        <div style={{ whiteSpace: 'pre-wrap' }} className='toggledBlog'>
          {blog.url}{'\n'}
          likes {blog.likes} <button onClick={putBlog} className='like'>like</button>{'\n'}
          {blog.author}
          {user.username === blog.user.username ? <button onClick={deleteBlog} className='remove'>remove</button> : null}
        </div>
      </Togglable>
    </div>
  )

}

Blog.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog