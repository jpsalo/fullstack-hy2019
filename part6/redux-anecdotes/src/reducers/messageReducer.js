const initialState = 'render message here...'

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message
    default:
      return state
  }
}

export const setNotification = (message, seconds) => {
  return dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      message,
    })
    setTimeout(() => {
      dispatch({
        type: 'SET_MESSAGE',
        message: null,
      })
    }, seconds * 1000)
  }
}

export default messageReducer
