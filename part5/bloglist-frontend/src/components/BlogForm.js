import React from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({
  handleSubmit,
  title,
  author,
  url
}) => {
  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input name="Title" {...title} />
        </div>
        <div>
          author
          <input name="Author" {...author} />
        </div>
        <div>
          url
          <input name="Url" {...url} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  url: PropTypes.object.isRequired,
}

export default BlogForm
