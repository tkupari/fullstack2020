const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const token = getTokenFrom(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if(!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog(request.body)
  blog.user = user._id
  const result = await blog.save()
  user.blogs = user.blogs.concat(blog._id)
  await user.save()


  response.status(201).json(result)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
    .populate('user', {username: 1, name: 1, id: 1})
  if(blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter
