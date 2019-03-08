import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'

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

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState()
  const sortedAnecdotes = anecdotes.sort((a, b) => b.votes - a.votes)

  return (
    sortedAnecdotes.map(anecdote =>
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleClick={() =>
          store.dispatch(voteAnecdote(anecdote.id))
        }
      />
    )
  )
}

export default AnecdoteList
