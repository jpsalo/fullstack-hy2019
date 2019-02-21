import React, { useState } from 'react'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange,
  }
}

const BoilerplateForm = () => {
  const name = useField('text')
  const born = useField('born')
  const length = useField('length')

  return (
    <div>
      <form>
        nimi:
        <input {...name} />
        <br/>
        syntymäaika:
        <input {...born} />
        <br />
        pituus:
        <input {...length} />
      </form>
      <div>
        {name.value} {born.value} {length.value}
      </div>
    </div>
  )
}

export default BoilerplateForm
