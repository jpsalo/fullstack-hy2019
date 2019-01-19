import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistic = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ positive, neutral, negative }) => {
  if (positive + neutral + negative === 0) {
    return (
      <div>ei yhtään palautetta annettu</div>
    )
  }

  return (
    <table>
      <tbody>
        <Statistic name={'hyvä'} value={positive} />
        <Statistic name={'neutraali'} value={neutral} />
        <Statistic name={'huono'} value={negative} />

        <Statistic 
          name={'yhteensä'} 
          value={positive + neutral + negative} 
        />

        <Statistic 
          name={'keskiarvo'} 
          value={(positive - negative) / (positive + neutral + negative)}
        />

        <Statistic 
          name={'positiivisia'} 
          value={`${positive / (positive + neutral + negative) * 100} %`} 
        />
      </tbody>
    </table>
  )
}

const App = () => {
  const [positive, doSetPositive] = useState(0)
  const [neutral, doSetNeutral] = useState(0)
  const [negative, doSetNegative] = useState(0)

  const setPositive = (newValue) => () => doSetPositive(newValue)
  const setNeutral = (newValue) => () => doSetNeutral(newValue)
  const setNegative = (newValue) => () => doSetNegative(newValue)

  return (
    <>
      <h1>anna palautetta</h1>
      <Button handleClick={setPositive(positive + 1)} text='hyvä' />
      <Button handleClick={setNeutral(neutral + 1)} text='neutraali' />
      <Button handleClick={setNegative(negative + 1)} text='huono' />

      <h1>statistiikka</h1>
      <Statistics positive={positive} neutral={neutral} negative={negative} />
    </>
  )
}

ReactDOM.render(
  <App />, 
  document.getElementById('root')
)
