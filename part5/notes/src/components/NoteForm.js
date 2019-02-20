import React from 'react'

const NoteForm = ({ onSubmit, handleChange, value }) => {
  return (
    <>
      <h2>Luo uusi muistiinpano</h2>

      <form onSubmit={onSubmit}>
        <input
          value={value}
          onChange={handleChange}
        />
        <button type="submit">tallenna</button>
      </form>
    </>
  )
}

export default NoteForm
