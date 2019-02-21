import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  const blog = {
    title: 'asd',
    author: 'foo',
    likes: 11,
  }

  const mockHandler = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )
  })

  it('renders title', () => {
    const div = component.container.querySelector('.heading')
    expect(div).toHaveTextContent('asd')
  })

  it('renders author', () => {
    const div = component.container.querySelector('.heading')
    expect(div).toHaveTextContent('foo')
  })

  it('renders number of likes', () => {
    const div = component.container.querySelector('.content')
    expect(div).toHaveTextContent(11)
  })

  it('clicking the button calls event handler once', async () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })

})
