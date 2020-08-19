const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is a collection of blogs', () => {
  beforeEach(async() => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const user = await helper.createUser()
    for(let blog of helper.initialBlogs) {
      let blogObject = new Blog(blog)
      blogObject.user = user.id
      await blogObject.save()
    }
  })

  test('blogs are returned as json', async () => {
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

  describe('viewing a single blog post', () => {
    test('succeeds with valid id', async () => {
      const response = await api.get('/api/blogs')
      const id = response.body[0].id
      await api
        .get(`/api/blogs/${id}`)
        .expect(200)
    })

    test('fails with 404 for non-existing id', async () => {
      const id = await helper.nonExistingId()
      await api
        .get(`/api/blogs/${id}`)
        .expect(404)
    })

    test('fails with 400 for invalid id', async () => {
      const id = 'adsdsafasgagasgas'
      await api
        .get(`/api/blogs/${id}`)
        .expect(400)
    })
  })

  describe('deleting a blog post', () => {
    test('succeeds for valid id', async () => {
      const response = await api.get('/api/blogs')
      const blog = response.body[0]
      const id = blog.id
      const user = await User.findById(blog.user.id)
      const token = helper.getTokenForUser(user)
      await api
        .delete(`/api/blogs/${id}`)
        .set('Authorization', `bearer ${token}`)
        .expect(204)

      const blogs = await helper.blogsInDb()
      expect(blogs).toHaveLength(helper.initialBlogs.length - 1)
    })
  })

  describe('updating a blog post', () => {
    test('succeeds for valid id', async () => {
      let response = await api.get('/api/blogs')
      const oldData = response.body[0]
      const newData = {
        likes: oldData.likes + 1
      }

      response = await api
        .put(`/api/blogs/${oldData.id}`)
        .send(newData)
      expect(response.status).toBe(200)
      expect(response.body.likes).toBe(oldData.likes + 1)
    })
  })
})

describe('addition of new blog post', () => {
  beforeEach(async() => {
    await User.deleteMany({})
    await Blog.deleteMany({})
  })

  test('fails without token', async () => {
    const newBlog = {
      title: 'A new blog',
      author: 'Test User',
      url: 'http://www.example.com/blog/1',
      likes: 0
    }
    let response = await api
      .post('/api/blogs')
      .send(newBlog)
    expect(response.status).toBe(401)
  })

  test('succeeds with valid data', async () => {
    const token = await helper.createUserAndGetToken()
    const newBlog = {
      title: 'A new blog',
      author: 'Test User',
      url: 'http://www.example.com/blog/1',
      likes: 0
    }
    let response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
    expect(response.status).toBe(201)
    expect(response.body.title).toBe('A new blog')

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(1)
  })

  test('initializes likes to 0', async () => {
    const token = await helper.createUserAndGetToken()
    const newBlog = {
      title: 'A new blog',
      author: 'Test User',
      url: 'http://www.example.com/blog/1'
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
    expect(response.body.likes).toBe(0)
  })

  test('fails if title is missing', async () => {
    const token = await helper.createUserAndGetToken()
    const newBlog = {
      author: 'Test User',
      url: 'http://www.example.com/blog/1'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(0)
  })

  test('fails if url is missing', async () => {
    const token = await helper.createUserAndGetToken()
    const newBlog = {
      title: 'A new blogpost',
      author: 'Test User'
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(0)
  })

})

afterAll(() => {
  mongoose.connection.close()
})
