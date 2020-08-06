import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const MostVoted = ({ votes, anecdote }) => {
  if(votes > 0) {
    return (
      <div>
      <h1>Anecdote with most votes</h1>
        <p>
          {anecdotes[anecdote]}<br />
          has {votes} votes
        </p>
      </div>
    )
  }
  return (
    <div>
      <h1>Anecdote with most votes</h1>
      No votes yet
    </div>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] =  useState({})
  const [mostVotes, setMostVotes] = useState(0)
  const [mostVoted, setMostVoted] = useState(-1)

  const vote = () => {
    const newPoints = {
      ...points
    }
    const newVotes = (newPoints[selected] || 0) + 1
    newPoints[selected] = newVotes
    console.log(newPoints)
    setPoints(newPoints)
    if(newVotes > mostVotes) {
      setMostVotes(newVotes)
      setMostVoted(selected)
    }
  }
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {props.anecdotes[selected]}<br />
        has {points[selected] || 0} votes
      </p>
      <button onClick={vote}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
      <MostVoted votes={mostVotes} anecdote={mostVoted} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)

