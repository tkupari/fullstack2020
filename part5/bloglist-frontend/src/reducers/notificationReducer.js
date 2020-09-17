const empty = {
  message: null,
  messageClass: 'info',
  timeoutId: null
}

const reducer = (state = empty, action) => {
  switch(action.type) {
  case 'NOTIFICATION':
    if (state.timeoutId)
      clearTimeout(state.timeoutId)
    return action.data
  case 'CLEAR_NOTIFICATION':
    return empty
  default:
    return state
  }
}

export const showMessage = (message, messageClass, timeoutId) => {
  return {
    type: 'NOTIFICATION',
    data: {
      message,
      timeoutId,
      messageClass
    }
  }
}

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

export default reducer
