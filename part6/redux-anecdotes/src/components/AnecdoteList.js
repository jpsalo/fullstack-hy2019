import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/messageReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = (props) => {

  const vote = (id) => {
    props.voteAnecdote(id)
    const votedAnecdote = props.anecdotesToShow.find(a => a.id === id)
    props.setNotification(`you voted '${votedAnecdote.content}'`, 10)
  }

  return (
    props.anecdotesToShow.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() => vote(anecdote.id)}
      />
    )
  )
}

const anecdotesToShow = ({ filter, anecdotes }) => {
  let filteredAnecdotes
  if ( filter === '' ) {
    filteredAnecdotes = anecdotes
  } else {
    const stringToCompare = filter.toLowerCase()
    filteredAnecdotes = anecdotes.filter(a => a.content.toLowerCase().includes(stringToCompare))
  }

  return filteredAnecdotes.sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    anecdotesToShow: anecdotesToShow(state),
  }
}

const mapDispatchToProps = {
  voteAnecdote,
  setNotification,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)
