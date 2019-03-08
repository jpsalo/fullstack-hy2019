import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'GOOD'
    }
    const state = initialState

    deepFreeze(state)
    let newState = counterReducer(state, action)
    deepFreeze(newState)
    newState = counterReducer(newState, action)

    expect(newState).toEqual({
      good: 2,
      ok: 0,
      bad: 0
    })
  })

  test('bad is incremented', () => {
    const action = {
      type: 'BAD',
    }
    const state = initialState

    deepFreeze(state)
    let newState = counterReducer(state, action)
    deepFreeze(newState)
    newState = counterReducer(newState, action)

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 2,
    })
  })

  test('ok is incremented', () => {
    const action = {
      type: 'OK',
    }
    const state = initialState

    deepFreeze(state)
    let newState = counterReducer(state, action)
    deepFreeze(newState)
    newState = counterReducer(newState, action)

    expect(newState).toEqual({
      good: 0,
      ok: 2,
      bad: 0,
    })
  })

  test('should return a proper initial state when called with zero', () => {
    const state = initialState

    const okAction = {
      type: 'OK',
    }


    let newState = counterReducer(state, okAction)
    deepFreeze(newState)

    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    })

    const zeroAction = {
      type: 'ZERO',
    }

    newState = counterReducer(newState, zeroAction)

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    })
  })
})
