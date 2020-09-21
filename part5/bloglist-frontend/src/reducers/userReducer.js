const initialState = {
  users: [],
  current: null
}

const userReducer = (state = initialState, action) => {
  switch(action.type) {
  case 'SET_USER':
    return { ...state, current: action.data }
  case 'INIT_USERS':
    return { ...state, users: action.data }
  default:
    return state
  }
}

export const setUser = (user) => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const initializeUsers = (users) => {
  return {
    type: 'INIT_USERS',
    data: users
  }
}

export default userReducer
