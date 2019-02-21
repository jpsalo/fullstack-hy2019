import { useState } from 'react'

export const useField = (type) => { // highlighl-line
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  const input = {
    type,
    value,
    onChange,
  }

  return {
    reset,
    input,
  }
}
