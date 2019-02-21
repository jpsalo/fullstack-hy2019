import React from 'react'
import { render, fireEvent } from 'react-testing-library'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'asd',
    author: 'foo',
    likes: 11,
    url: 'jp.lo',
    user: {
      name: 'jp',
    }
  }

  const mockRemoveBlogHandler = jest.fn()
  const mockLikeHandler = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <Blog
        blog={blog}
        like={mockLikeHandler}
        isRemovable={false}
        removeBlog={mockRemoveBlogHandler}
      />
    )
  })

  it('at start the heading is displayed', () => {
    const div = component.container.querySelector('.heading')

    expect(div).toHaveTextContent('asd')
    expect(div).toHaveTextContent('foo')
  })

  it('at start the content is not displayed', () => {
    const div = component.container.querySelector('.content')
    expect(div).toBeNull()
  })

  it('after clicking the heading, content is displayed', () => {
    const headingElement = component.container.querySelector('.heading')
    fireEvent.click(headingElement)

    const contentElement = component.container.querySelector('.content')
    expect(contentElement).not.toBeNull()

    const urlElement = component.container.querySelector('.url')
    expect(urlElement).toHaveTextContent(/^jp.lo$/)

    const likesElement = component.container.querySelector('.likes')
    expect(likesElement).toHaveTextContent(11)

    const ownerElement = component.container.querySelector('.owner')
    expect(ownerElement).toHaveTextContent('jp')
  })

})
