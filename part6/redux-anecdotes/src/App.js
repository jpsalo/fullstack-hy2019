import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = (props) => {
  useEffect(() => {
    props.initializeAnecdotes()
  }, [])

  return (
    <>
      <h1>Programming anecdotes</h1>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </>
  )
}

export default connect(null, { initializeAnecdotes })(App)
