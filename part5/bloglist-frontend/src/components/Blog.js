import React, { useState } from 'react'
const Blog = ({ blog, handleLike, handleDelete }) => {
  if(!blog)
    return null
  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div>
        {blog.url}<br/>
        {blog.likes} likes <button onClick={handleLike}>like</button><br/>
        {blog.user.name}<br/>
        <button onClick={handleDelete}>delete</button>
      </div>
    </div>
  )
}

export default Blog
