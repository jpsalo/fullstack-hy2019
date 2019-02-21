import React from 'react'
import { render, waitForElement } from 'react-testing-library'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  it('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.login')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(0)

    expect(component.container).not.toHaveTextContent(
      'React patterns'
    )

    expect(component.container).not.toHaveTextContent(
      'Go To Statement Considered Harmful'
    )

    expect(component.container).not.toHaveTextContent(
      'asd'
    )
  })

  it('if user logged, blogs are rendered', async () => {
    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Teuvo Testaaja'
    }

    localStorage.setItem('loggedBloglistAppUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.container.querySelector('.blogs')
    )

    const blogs = component.container.querySelectorAll('.blog')
    expect(blogs.length).toBe(3)

    expect(component.container).toHaveTextContent(
      'React patterns'
    )

    expect(component.container).toHaveTextContent(
      'Go To Statement Considered Harmful'
    )

    expect(component.container).toHaveTextContent(
      'asd'
    )
  })
})
