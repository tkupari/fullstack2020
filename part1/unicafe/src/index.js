import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistics = ({ good, bad, neutral }) => {
  const all = good + neutral + bad
  const weighted = good - bad
  if(all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <div>No feedback given</div>
      </div>
    )
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <tr>
            <td> good </td><td> {good} </td>
          </tr>
          <tr>
            <td> neutral </td><td> {neutral} </td>
          </tr>
          <tr>
            <td> bad </td><td> {bad} </td>
          </tr>
          <tr>
            <td> all </td><td> {all} </td>
          </tr>
          <tr>
            <td> average </td><td> {weighted / all} </td>
          </tr>
          <tr>
            <td> positive </td><td> {good / all * 100 } % </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const Button = ({ clickHandler, text }) => <button onClick={clickHandler}>{text}</button>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandler={() => setGood(good + 1)} text='good' />
      <Button clickHandler={() => setNeutral(neutral + 1)} text='neutral' />
      <Button clickHandler={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)

