const blogReducer = (state = [], action) => {
  const sortByLikes = (blogs) => blogs.sort((a, b) => b.likes - a.likes)

  switch(action.type) {
  case 'NEW_BLOG':
    return state.concat(action.data)
  case 'INIT_BLOGS':
    console.log(action)
    return sortByLikes(action.data)
  case 'UPDATE_BLOG':
    return sortByLikes(state.map(b => b.id !== action.data.id ? b : action.data))
  case 'DELETE_BLOG':
    return state.filter(b => b.id !== action.data)
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

export const updateBlog = (updatedBlog) => {
  return {
    type: 'UPDATE_BLOG',
    data: updatedBlog
  }
}

export const deleteBlog = (id) => {
  return {
    type: 'DELETE_BLOG',
    data: id
  }
}

export default blogReducer
