import React from 'react';
import NewNote from './components/NewNote'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter'

// const counterReducer = (state = 0, action) => {
//   switch (action.type) {
//     case 'INCREMENT':
//       return state + 1
//     case 'DECREMENT':
//       return state - 1
//     case 'ZERO':
//       return 0
//     default:
//       return state
//   }
// }

// const store = createStore(counterReducer)

const App = (props) => {
  const store = props.store

  return (
    <>
      <NewNote store={store} />
      <VisibilityFilter store={store} />
      <Notes store={store} />
    </>
  )
}

export default App
