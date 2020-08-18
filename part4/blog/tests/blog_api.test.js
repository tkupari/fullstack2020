const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async() => {
  await Blog.deleteMany({})

  for(let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('the first blog is about React patterns', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].title).toBe('React patterns')
})

test('blog has id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('posting to api creates a new blog post', async () => {
  const newBlog = {
    title: 'A new blog',
    author: 'Test User',
    url: 'http://www.example.com/blog/1',
    likes: 0
  }
  let response = await api
    .post('/api/blogs')
    .send(newBlog)
  expect(response.status).toBe(201)
  expect(response.body.title).toBe('A new blog')

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
})

test('new blog likes defaults to 0', async () => {
  const newBlog = {
    title: 'A new blog',
    author: 'Test User',
    url: 'http://www.example.com/blog/1'
  }
  const response = await api
    .post('/api/blogs')
    .send(newBlog)
  expect(response.body.likes).toBe(0)
})

test('returns error if title is missing', async () => {
  const newBlog = {
    author: 'Test User',
    url: 'http://www.example.com/blog/1'
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const blogs = await helper.blogsInDb()
  expect(blogs).toHaveLength(helper.initialBlogs.length)
})


afterAll(() => {
  mongoose.connection.close()
})
