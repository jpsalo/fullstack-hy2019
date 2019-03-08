const initialState = 'render message here...'

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message
    default:
      return state
  }
}

export const messageChange = message => {
  return {
    type: 'SET_MESSAGE',
    message,
  }
}

export default messageReducer
