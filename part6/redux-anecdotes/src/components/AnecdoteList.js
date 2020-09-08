import React from 'react'
import { connect } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const anecdotesToShow = () => {
    if(props.filter.length === 0)
      return props.anecdotes
    return props.anecdotes.filter(anecdote => anecdote.content.includes(props.filter))
  }

  const vote = (anecdote) => {
    props.voteFor(anecdote)
    props.notify(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <div>
      {anecdotesToShow().map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter
  }
}

const mapDispatchToProps = {
  voteFor,
  notify
}
const ConnectedAnecdoteList = connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
export default ConnectedAnecdoteList
