const empty = null

const reducer = (state = empty, action) => {
  switch(action.type) {
    case 'NOTIFICATION':
      return action.data.message
    case 'CLEAR_NOTIFICATION':
      return empty
    default:
      return state
  }
}

export const notify = (message) => {
  return {
    type: 'NOTIFICATION',
    data: { message }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default reducer
