const totalLikes = (blogs) => {
  const likeReducer = (sum, blog) => sum + blog.likes
  const sum = blogs.reduce(likeReducer, 0)
  return sum
}

module.exports = {
  totalLikes
}
