import React from 'react';
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { messageChange } from '../reducers/messageReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    props.createAnecdote(content)
    event.target.anecdote.value = ''

    // const anecdote = props.anecdotes.find(a => a.content === content)

    props.messageChange(`You created '${content}'`)
    setTimeout(() => {
      props.messageChange(null)
    }, 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </>
  )
}

// const mapStateToProps = (state) => {
//   return {
//     anecdotes: state.anecdotes,
//   }
// }

const mapDispatchToProps = {
  createAnecdote,
  messageChange,
}

export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(AnecdoteForm)
