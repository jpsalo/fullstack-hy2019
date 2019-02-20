import React, { useState } from 'react'

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
    <div style={blogStyle}>

      <div onClick={() => setContentVisible(!contentVisible)}>
        {blog.title} {blog.author}
      </div>

      {contentVisible &&
        <>
          <div>{blog.url}</div>
          <div>
            {blog.likes} likes
            <button onClick={like}>like</button>
          </div>
          <div>added by {blog.user.name}</div>
          {isRemovable &&
            <button onClick={removeBlog}>remove</button>
          }
        </>
      }

    </div>
  )
}

export default Blog
