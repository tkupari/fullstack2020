const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [ {  title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, }, {  title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5}, {  title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12 }, {  title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10}, {  title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0 }, {  title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2} ]


beforeEach(async() => {
  await Blog.deleteMany({})

  let blog = new Blog(initialBlogs[0])
  await blog.save()

  blog = new Blog(initialBlogs[1])
  await blog.save()
})

test('notes are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
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

  response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(3)

})

afterAll(() => {
  mongoose.connection.close()
})
