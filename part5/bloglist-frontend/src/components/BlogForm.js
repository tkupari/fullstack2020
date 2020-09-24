import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogSumbit = (event) => {
    event.preventDefault()
    createBlog({ title, author, url })
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={handleBlogSumbit}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            id='title'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
          <Form.Label>author:</Form.Label>
          <Form.Control
            id='author'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
          <Form.Label>url:</Form.Label>
          <Form.Control
            id='url'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
          <Button id="submitButton" type="submit">create</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default BlogForm
