import Togglable from "./Togglable"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}> 
      <div>
        {blog.title} {blog.author}
      </div>
      <Togglable buttonLabel='view' cancelButtonLabel="hide">
        <div style={{ whiteSpace: "pre-wrap" }}>
          {blog.url}{'\n'}
          likes {blog.likes}<button>like</button>{'\n'}
          {blog.author}
        </div>
      </Togglable>
    </div>  
  )
  
}

export default Blog