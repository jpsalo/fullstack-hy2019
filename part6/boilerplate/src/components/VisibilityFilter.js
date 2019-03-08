import React from 'react'
import { filterChange } from '../reducers/filterReducer'

const VisibilityFilter = (props) => {

  const filterClicked = (value) => {
    props.store.dispatch(filterChange(value))
  }

  return (
    <div>
      kaikki
      <input
        type="radio"
        name="filter"
        onChange={() => filterClicked('ALL')}
      />
      tärkeät
      <input
        type="radio"
        name="filter"
        onChange={() => filterClicked('IMPORTANT')}
      />
      elintärkeät
      <input
        type="radio"
        name="filter"
        onChange={() => filterClicked('NONIMPORTANT')}
      />
    </div>
  )
}

export default VisibilityFilter
