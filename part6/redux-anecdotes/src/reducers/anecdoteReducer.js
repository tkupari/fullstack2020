const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortByVotes = anecdotes => anecdotes.sort((a, b) => b.votes - a.votes)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      return sortByVotes(state.map(anecdote => {
        if(anecdote.id === action.data.id) {
          return {...anecdote, votes: anecdote.votes + 1}
        }
        return anecdote
      }))
    case 'CREATE':
      const newAnecdote = asObject(action.data.anecdote)
      return state.concat(newAnecdote)
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export const voteFor = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export const createAnecdote = (anecdote) => {
  return {
    type: 'CREATE',
    data: { anecdote }
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes
  }
}

export default reducer
