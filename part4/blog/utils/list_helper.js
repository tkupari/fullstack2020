const totalLikes = (blogs) => {
  const likeReducer = (sum, blog) => sum + blog.likes
  const sum = blogs.reduce(likeReducer, 0)
  return sum
}

const favoriteBlog = (blogs) => {
  if(blogs.length === 0)
    return null
  const maxLikesReducer = (top, blog) => {
    return top.likes > blog.likes ? top : blog
  }
  const topBlog = blogs.reduce(maxLikesReducer, blogs[0])
  return {
    title: topBlog.title,
    author: topBlog.author,
    likes: topBlog.likes
  }
}

module.exports = {
  totalLikes,
  favoriteBlog,
}
