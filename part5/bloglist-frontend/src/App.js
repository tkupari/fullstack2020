import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import userService from './services/users'
import Togglable from './components/togglable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { showMessage, clearNotification } from './reducers/notificationReducer'
import { initializeBlogs, createBlog, updateBlog, deleteBlog } from './reducers/blogReducer'
import { initializeUsers, setUser } from './reducers/userReducer'
import {
  Switch, Route, Link,
  useRouteMatch
} from 'react-router-dom'


const Notification = () => {
  const notification = useSelector(state => state.notification)

  return notification.message
    ? (
      <div className={'message ' + notification.messageClass}>
        {notification.message}
      </div>
    )
    : null
}

const Users = () => {
  const users = useSelector(state => state.users.users)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`}>{user.name}</Link></td><td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

const User = ({ id }) => {
  const users = useSelector(state => state.users.users)
  const user = users.find(user => user.id === id)
  if(!user)
    return null
  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>{blog.title}</li>
        )}
      </ul>
    </div>
  )
}

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const blogFormRef = useRef()
  const blogs = useSelector(state => state.blogs)
  const currentUser = useSelector(state => state.users.current)
  const users = useSelector(state => state.users.users)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      dispatch(initializeBlogs(blogs))
    )
  }, [dispatch])

  useEffect(() => {
    userService.getAll().then(blogs =>
      dispatch(initializeUsers(blogs))
    )
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const notify = (message) => {
    const timeoutId = setTimeout(() => dispatch(clearNotification()), 2000)
    dispatch(showMessage(message, 'info', timeoutId))
  }

  const error = (message) => {
    dispatch(showMessage(message, 'error'))
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

      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      notify('Login successful')
    } catch (exeption) {
      error('Invalid username or password', 'error')
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(setUser(null))
    notify('Logged out successfully')
  }

  const addBlog = (blogData) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogData)
      .then(newBlog => {
        dispatch(createBlog(newBlog))
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
        dispatch(updateBlog(updatedBlog))
      })
  }

  const handleDelete = (blog) => {
    if(window.confirm(`Remove blog ${blog.title}`))
      blogService.remove(blog.id)
        .then(() => {
          dispatch(deleteBlog(blog.id))
        })
  }

  const match = useRouteMatch('/users/:id')
  const user_id = match
    ? users.find(user => user.id === match.params.id).id
    : null

  if(currentUser === null) {
    return (
      <div>
        <Notification />
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
      <Notification />
      <h2>blogs</h2>
      <p>
        logged in as {currentUser.name}
        <button onClick={logout}>logout</button>
      </p>
      <Switch>
        <Route path='/users/:id'>
          <User id={user_id} />
        </Route>
        <Route path='/users'>
          <Users />
        </Route>
        <Route path='/'>
          <Togglable buttonLabel="new note" ref={blogFormRef}>
            <BlogForm createBlog={addBlog}/>
          </Togglable>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog)} handleDelete={() => handleDelete(blog)} />
          )}
        </Route>
      </Switch>
    </div>
  )
}

export default App
