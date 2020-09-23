import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleLike, handleDelete }) => {
  if(!blog)
    return null
  return (
    <div>
      <h2>{blog.title} {blog.author}</h2>
      <div>
        <Link to={blog.url}>{blog.url}</Link><br/>
        {blog.likes} likes <button onClick={handleLike}>like</button><br/>
        {blog.user.name}<br/>
        <button onClick={handleDelete}>delete</button>
      </div>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default Blog
