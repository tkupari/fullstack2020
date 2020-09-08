import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notify, clearNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const create = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(createAnecdote(newAnecdote))
    dispatch(notify(`created '${anecdote}'`))
    setTimeout(() => dispatch(clearNotification()), 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="anecdote"/></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
