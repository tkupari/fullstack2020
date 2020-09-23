const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const user = await User.findById(decodedToken.id)

  const blog = new Blog(request.body)
  blog.user = user._id
  const result = await blog.save()
  user.blogs = user.blogs.concat(blog._id)
  await user.save()

  const resultUser = await result.populate('user', {username: 1, name: 1, id: 1}).execPopulate()

  response.status(201).json(resultUser)
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
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const blog = await Blog.findById(request.params.id)
  if(blog.user.toString() === decodedToken.id) {
    await blog.remove()
    response.status(204).end()
  } else {
    return response.status(401).json({
      error: 'not allowed to delete'
    })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, request.body, { new: true })
    .populate('user', {username: 1, name: 1, id: 1})
  response.json(updatedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  blog.comments = blog.comments.concat(request.body.comment)
  const updatedBlog = await blog.save()
  return response.json(updatedBlog)
})

module.exports = blogsRouter
