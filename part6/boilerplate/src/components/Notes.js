import React from 'react'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return (
    <li onClick={handleClick}>
      {note.content}
      <strong>{note.important ? 'tärkeä' : ''}</strong>
    </li>
  )
}

const Notes = ({ store }) => {
  return (
    <ul>
      {store.getState().map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() =>
            store.dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  )
}

export default Notes
