import React from 'react';
import { createNote } from '../reducers/noteReducer'

const NewNote = (props) => {
  const addNote = (event) => {
    event.preventDefault()
    props.store.dispatch(
      createNote(event.target.note.value)
    )
    event.target.note.value = ''
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">lisää</button>
    </form>
  )
}

export default NewNote
