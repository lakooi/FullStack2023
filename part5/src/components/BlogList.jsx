import Blog from './Blog'
import PropTypes from 'prop-types'

const BlogList = ({ blogs, user, removeBlog, updateBlog }) => (
  <div>
    {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
      <Blog key={blog.id} blog={blog} removeBlog={removeBlog} updateBlog={updateBlog} user={user}/>
    )}
  </div>
)

BlogList.propTypes = {
  updateBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired
}

export default BlogList