import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux'
import App from './App';
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

// store.dispatch({
//   type: 'NEW_NOTE',
//   data: {
//     content: 'sovelluksen tila talletetaan storeen',
//     important: true,
//     id: 1,
//   }
// })
//
// store.dispatch({
//   type: 'NEW_NOTE',
//   data: {
//     content: 'tilanmuutokset tehdään actioneilla',
//     important: false,
//     id: 2,
//   }
// })

const renderApp = () => {
  ReactDOM.render(
    <App store={store}/>,
    document.getElementById('root')
  )
}

renderApp()
store.subscribe(renderApp)
