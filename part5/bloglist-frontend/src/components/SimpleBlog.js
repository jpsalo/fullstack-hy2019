import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <>
  <div className="heading">
    {blog.title} {blog.author}
  </div>
  <div className="content">
    blog has {blog.likes} likes
    <button onClick={onClick}>like</button>
  </div>
  </>
)

export default SimpleBlog
