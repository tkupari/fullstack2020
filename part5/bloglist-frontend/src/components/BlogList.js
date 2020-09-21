import React from 'react'
import { Link } from 'react-router-dom'
const BlogList = ({ blogs }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {blogs.map(blog => {
        return (
          <div key={blog.id} className='blog' style={blogStyle}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} - {blog.author}
            </Link>
          </div>
        )
      })}
    </div>
  )
}

export default BlogList
