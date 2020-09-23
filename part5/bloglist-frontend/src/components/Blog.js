import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog, handleLike, handleDelete, handleComment }) => {
  const [comment, setComment] = useState('')

  const handleSumbit = (event) => {
    event.preventDefault()
    handleComment(comment)
    setComment('')
  }

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
      <form onSubmit={handleSumbit}>
        <input
          value={comment}
          id="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <button>comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default Blog
