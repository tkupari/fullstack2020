import anecdoteService from '../services/anecdotes'

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
      return state.concat(action.data.anecdote)
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
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE',
      data: { anecdote: newAnecdote }
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch( {
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export default reducer
