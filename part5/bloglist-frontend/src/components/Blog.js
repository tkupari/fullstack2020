import React, { useState } from 'react'
const Blog = ({ blog, handleLike }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)

  const toggleShowDetails = () => {
    setShowDetails(!showDetails)
  }
  const displayStyle = { display: showDetails ? '' : 'none' }

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleShowDetails}>{showDetails ? 'hide details' : 'show details'}</button>
      <div style={displayStyle}>
        {blog.url}<br/>
        likes {blog.likes}<button onClick={handleLike}>like</button><br/>
        {blog.user.name}
      </div>
    </div>
  )
}

export default Blog
