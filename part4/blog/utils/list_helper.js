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

const mostBlogs = (blogs) => {
  const blogCountReducer = (count, blog) => {
    count[blog.author] = (count[blog.author] || 0) + 1
    return count
  }
  const blogCount = blogs.reduce(blogCountReducer, {})
  const totalByAuthor = Object.keys(blogCount).map(author => {
    return {
      author: author,
      blogs: blogCount[author]
    }
  })
  const maxBlogsReducer = (top, author) => {
    return top.blogs > author.blogs ? top : author
  }
  return totalByAuthor.reduce(maxBlogsReducer, totalByAuthor[0])
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
}
