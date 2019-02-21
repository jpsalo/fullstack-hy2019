import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useField } from './hooks'

const App = () => {
  const blogFormRef = React.createRef()
  const [blogs, setBlogs] = useState([])
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({})

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const getBlogs = async () => {
    const blogs = await blogService.getAll()
    setBlogs( blogs.sort((a, b) => b.likes - a.likes) )
  }

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  })

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: username.input.value,
        password: password.input.value,
      })

      window.localStorage.setItem(
        'loggedBloglistAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      username.reset()
      password.reset()
      setUser(user)
    } catch (exception) {
      setMessage({
        text: 'käyttäjätunnus tai salasana virheellinen',
        type: 'error',
      })
      setTimeout(() => {
        setMessage({})
      }, 5000)
    }
  }

  const likeBlog = async id => {
    const blog = blogs.find(b => b.id === id)
    const changedBlog = { ...blog, likes: blog.likes + 1 }

    try {
      const returnedBlog = await blogService.update(changedBlog)
      setBlogs(blogs
        .map(blog => blog.id !== id ? blog : returnedBlog)
        .sort((a, b) => b.likes - a.likes)
      )
    } catch (error) {
      // TODO
    }
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBloglistAppUser')
  }

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    try {
      const blog = await blogService.create({
        title: title.input.value,
        author: author.input.value,
        url: url.input.value,
      })

      setBlogs( blogs.concat(blog).sort((a, b) => b.likes - a.likes) )

      title.reset()
      author.reset()
      url.reset()

      setMessage({
        text: `a new blog ${blog.title} added`,
        type: 'success',
      })
      setTimeout(() => {
        setMessage({})
      }, 5000)

    } catch (exception) {
      setMessage({
        text: 'virhe lisätessä blogia',
        type: 'error',
      })
      setTimeout(() => {
        setMessage({})
      }, 5000)
    }
  }

  const removeBlog = async id => {
    try {
      const blog = blogs.find(b => b.id === id)
      if (window.confirm(`remove blog ${blog.title}`)) {
        await blogService.remove(id)
        setBlogs( blogs
          .filter(b => b.id !== id)
          .sort((a, b) => b.likes - a.likes)
        )

        setMessage({
          text: `removed ${blog.title}`,
          type: 'success',
        })
        setTimeout(() => {
          setMessage({})
        }, 5000)

      }
    } catch (exception) {
      // TODO
    }
  }

  const heading = () => (
    <>
      <h2>blogs</h2>

      <Notification message={message} />

      <p>{user.name} logged in</p>
      <button onClick={logout}>logout</button>
    </>
  )

  const blogsList = () => {
    return (
      <div className="blogs">
        {blogs.map(blog => {
          return (
            <Blog
              key={blog.id}
              blog={blog}
              like={() => likeBlog(blog.id)}
              isRemovable={blog.user.id === user.id}
              removeBlog={() => removeBlog(blog.id)}
            />
          )
        })}
      </div>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          handleSubmit={addBlog}
          title={title.input}
          author={author.input}
          url={url.input}
        />
      </Togglable>
    )
  }

  if (user === null) {
    return (
      <LoginForm
        handleSubmit={handleLogin}
        username={username.input}
        password={password.input}
        message={message}
      />
    )
  }

  return (
    <>
      {heading()}
      {blogForm()}
      {blogsList()}
    </>
  )
}

export default App
