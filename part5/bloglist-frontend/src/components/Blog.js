import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

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
        {blog.likes} likes <Button size="sm" onClick={handleLike}>like</Button><br/>
        {blog.user.name}<br/>
        <Button size="sm" variant="danger" onClick={handleDelete}>delete</Button>
      </div>
      <h3>comments</h3>
      <form onSubmit={handleSumbit}>
        <input
          value={comment}
          id="comment"
          onChange={({ target }) => setComment(target.value)}
        />
        <Button variant="success" size="sm">comment</Button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => <li key={index}>{comment}</li>)}
      </ul>
    </div>
  )
}

export default Blog
