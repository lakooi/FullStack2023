import { useState } from 'react'

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  
  const all = good + neutral + bad
  const average = (good - bad)/all
  const positive = (good/all)*100

  return (
    <div>
      <h1>statistics</h1>
      {all === 0 ? (
        <p>No Feedback Given</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={neutral}/>
            <StatisticLine text="bad" value={bad}/>
            <StatisticLine text="all" value={all}/>
            <StatisticLine text="average" value={average}/>
            <StatisticLine text="positive" value={positive}/>
          </tbody>
        </table>
      )}
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleClick = (setter, getter) => {
    setter(getter + 1)
  }


  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <div>
          <button onClick={() => handleClick(setGood, good)}>good</button>
          <button onClick={() => handleClick(setNeutral, neutral)}>neutral</button>
          <button onClick={() => handleClick(setBad, bad)}>bad</button>
        </div>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
