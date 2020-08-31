import React from 'react'
import Blog from './Blog'
import { render } from '@testing-library/react'

describe('<Blog />', () => {
  let component

  beforeEach(() => {
    const blog = {
      title: 'A blog title',
      author: 'Test Author',
      user: {
        name: 'Test User'
      }
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

})
