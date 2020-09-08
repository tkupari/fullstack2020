import anecdoteService from '../services/anecdotes'

const sortByVotes = anecdotes => anecdotes.sort((a, b) => b.votes - a.votes)

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'VOTE':
      return sortByVotes(state.map(anecdote => {
        if(anecdote.id === action.data.id) {
          return action.data
        }
        return anecdote
      }))
    case 'CREATE':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return sortByVotes(action.data)
    default:
      return state
  }
}

export const voteFor = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }

}

export const createAnecdote = (anecdote) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'CREATE',
      data: newAnecdote
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
