import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
  test('provides needed information to createBlog handler', () => {
    const createBlog = jest.fn()

    const component = render(
      <BlogForm createBlog={createBlog} />
    )

    const form = component.container.querySelector('form')
    const titleInput = component.container.querySelector('#title')
    const authorInput = component.container.querySelector('#author')
    const urlInput = component.container.querySelector('#url')

    fireEvent.change(titleInput, { target: { value: 'blog title' } } )
    fireEvent.change(authorInput, { target: { value: 'author name' } } )
    fireEvent.change(urlInput, { target: { value: 'http://www.example.com' } } )
    fireEvent.submit(form)

    const args = createBlog.mock.calls[0][0]
    expect(args.title).toBe('blog title')
    expect(args.author).toBe('author name')
    expect(args.url).toBe('http://www.example.com')
  })
})
