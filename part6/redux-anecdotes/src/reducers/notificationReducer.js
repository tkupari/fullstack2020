const empty = {
  message: null,
  timeoutId: null
}

const reducer = (state = empty, action) => {
  switch(action.type) {
    case 'NOTIFICATION':
      if(state.timeoutId)
        clearTimeout(state.timeoutId)
      return action.data
    case 'CLEAR_NOTIFICATION':
      return empty
    default:
      return state
  }
}

export const notify = (message, timeOut) => {
  return async dispatch => {
    const timeoutId = setTimeout(() => dispatch(clearNotification()), timeOut * 1000)
    dispatch({
      type: 'NOTIFICATION',
      data: {
        message,
        timeoutId
      }
    })
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default reducer
