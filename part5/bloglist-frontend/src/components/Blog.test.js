import React from 'react'
import Blog from './Blog'
import { render, fireEvent } from '@testing-library/react'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'A blog title',
      author: 'Test Author',
      user: {
        name: 'Test User'
      },
      url: 'http:/www.example.com',
      likes: 5
    }
    component = render(
      <Blog blog={blog} />
    )
  })

  test('displays title and author', () => {

    expect(component.container).toHaveTextContent('A blog title')
    expect(component.container).toHaveTextContent('Test Author')
  })

  test('hides details by default', () => {
    const details = component.container.querySelector('.blog-details')
    expect(details).toHaveStyle('display: none')
  })

  test('url and number of likes are displayed when details button has been clicked', () => {

    const button = component.getByText('show details')
    fireEvent.click(button)

    const details = component.container.querySelector('.blog-details')

    expect(details).not.toHaveStyle('display: none')

    expect(details).toHaveTextContent('example.com')
    expect(details).toHaveTextContent('likes 5')

  })

})
