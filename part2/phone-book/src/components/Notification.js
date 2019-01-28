import React from 'react'

const Notification = ({ message }) => {
  if (message === undefined) {
    return null
  }

  return (
    <div className={message.type}>
      {message.text}
    </div>
  )
}

export default Notification
