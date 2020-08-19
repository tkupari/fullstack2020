const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willBeRemoved', author: 'test run', url: 'www.example.com' })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const createUser = async () => {
  const newUser = {
    username: 'test',
    name: 'Test User',
    password: 'sekret',
  }
  const user = await new User(newUser).save()
  return user
}

const getTokenForUser = (user) => {
  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)
  return token
}
const createUserAndGetToken = async () => {
  const user = await createUser()
  return getTokenForUser(user)
}

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
  usersInDb,
  createUser,
  getTokenForUser,
  createUserAndGetToken,
}
