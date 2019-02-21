import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({
  blog,
  like,
  isRemovable,
  removeBlog,
}) => {
  const [contentVisible, setContentVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle} className="blog">

      <div className="heading" onClick={() => setContentVisible(!contentVisible)}>
        {blog.title} {blog.author}
      </div>

      {contentVisible &&
        <div className="content">
          <div className="url">{blog.url}</div>
          <div className="likes">
            {blog.likes} likes
            <button onClick={like}>like</button>
          </div>
          <div className="owner">added by {blog.user.name}</div>
          {isRemovable &&
            <button onClick={removeBlog}>remove</button>
          }
        </div>
      }

    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  like: PropTypes.func.isRequired,
  isRemovable: PropTypes.bool.isRequired,
  removeBlog: PropTypes.func.isRequired,
}

export default Blog
