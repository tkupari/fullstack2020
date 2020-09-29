import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'
import { useSubscription, useApolloClient } from '@apollo/client'
import { BOOK_ADDED } from './queries'

const Notify = ({ errorMessage }) => {
  if (!errorMessage)
    return null

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 2000)
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    notify('logged out')
    setPage('authors')
    client.resetStore()
  }

  useEffect(() => {
    const oldtoken = localStorage.getItem('library-user-token')
    setToken(oldtoken)
  }, [])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      notify(`Book ${subscriptionData.data.bookAdded.title} added`)
    }
  })

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Notify errorMessage={errorMessage} />

        <Authors
          show={page === 'authors'}
          setError={notify}
        />

        <Books
          show={page === 'books'}
        />

        <LoginForm
          show={page === 'login'}
          setError={notify}
          setToken={setToken}
        />
      </div>
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={logout}>logout</button>
      </div>

      <Notify errorMessage={errorMessage} />

      <Authors
        show={page === 'authors' || page === 'login'}
        setError={notify}
      />

      <Books
        show={page === 'books'}
      />

      <Recommended
        show={page === 'recommend'}
      />

      <NewBook
        show={page === 'add'}
        setError={notify}
      />

    </div>
  )
}

export default App
