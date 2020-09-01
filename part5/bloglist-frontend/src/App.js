import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Togglable from './components/togglable'
import BlogForm from './components/BlogForm'

const Notification = ({ message, messageClass }) => {
  if(message === null)
    return null

  return (
    <div className={'message ' + messageClass}>
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState('info')

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showMessage = (message, messageClass) => {
    setMessage(message)
    setMessageClass(messageClass)
    setTimeout(() => {
      setMessage(null)
    }, 2000)
  }

  const notify = (message) => {
    showMessage(message, 'info')
  }

  const error = (message) => {
    showMessage(message, 'error')
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      notify('Login successful')
    } catch (exeption) {
      error('Invalid username or password', 'error')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    notify('Logged out successfully')
  }

  const addBlog = (blogData) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogData)
      .then(newBlog => {
        setBlogs(blogs.concat(newBlog))
        notify(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      })
  }

  const handleLike = (blog) => {
    const blogData = {
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1
    }
    blogService
      .update(blog.id, blogData)
      .then(updatedBlog => {
        setBlogs(blogs.map(b => b.id !== blog.id ? b : updatedBlog))
      })
  }

  const handleDelete = (blog) => {
    if(window.confirm(`Remove blog ${blog.title}`))
      blogService.remove(blog.id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== blog.id))
        })
  }

  if(user === null) {
    return (
      <div>
        <Notification message={message} messageClass={messageClass} />
        <form id='loginForm' onSubmit={handleLogin}>
          <div>
            username
            <input
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button id="loginButton" type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification message={message} messageClass={messageClass} />
      <h2>blogs</h2>
      <p>
        logged in as {user.name}
        <button onClick={logout}>logout</button>
      </p>
      <Togglable buttonLabel="new note" ref={blogFormRef}>
        <BlogForm createBlog={addBlog}/>
      </Togglable>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog)} handleDelete={() => handleDelete(blog)} />
      )}
    </div>
  )
}

export default App