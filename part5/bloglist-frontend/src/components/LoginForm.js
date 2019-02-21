import React from 'react'
import PropTypes from 'prop-types'
import Notification from './Notification'

const LoginForm = ({
  handleSubmit,
  username,
  password,
  message,
}) => {
  return (
    <div className="login">
      <h2>log in to application</h2>

      <Notification message={message} />

      <form onSubmit={handleSubmit}>
        <div>
          käyttäjätunnus
          <input {...username} name="Username" />
        </div>
        <div>
          salasana
          <input {...password} name="Password" />
        </div>
        <button type="submit">kirjaudu</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.object.isRequired,
  password: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
}

export default LoginForm
