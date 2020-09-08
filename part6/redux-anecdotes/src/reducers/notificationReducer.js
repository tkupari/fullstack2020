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

export const notify = (message, timeOut) => {
  return async dispatch => {
    dispatch({
      type: 'NOTIFICATION',
      data: { message }
    })
    setTimeout(() => dispatch(clearNotification()), timeOut * 1000)
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default reducer
