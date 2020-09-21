const blogReducer = (state = [], action) => {
  switch(action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    console.log(action)
    return action.data.sort((a, b) => b.likes - a.likes)
  default:
    return state
  }
}

export const initializeBlogs = (blogs) => {
  return {
    type: 'INIT_BLOGS',
    data: blogs
  }
}

export const createBlog = (newBlog) => {
  return {
    type: 'NEW_BLOG',
    data: newBlog
  }
}

export default blogReducer
