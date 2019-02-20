import React from 'react'

const Notification = ({ message }) => {
  const { text, type } = message

  if (text === null) {
    return null
  }

  return (
    <div className={type}>{text}</div>
  )
}

export default Notification
