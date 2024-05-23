import "./App.css"
import { useState } from "react"

function App() {
  return <Counter />
}

function Counter() {
  const [step, setStep] = useState(1)
  const [count, setCount] = useState(0)
  const [countInput, setCountInput] = useState(0)
  const date = new Date()
  date.setDate(date.getDate() + count)
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  }

  function handleChangeStep(e) {
    setStep(Number(e.target.value))
  }

  function handleChangeCountInput(e) {
    setCountInput(e.target.value)
    setCount(Number(e.target.value))
  }

  function handleReset() {
    setCount(0)
    setStep(1)
  }

  return (
    <div className="container">
      <div className="step">
        <input type="range" min="1" max="10" onChange={handleChangeStep} value={step} />
        <span>{step}</span>
      </div>
      <div className="count">
        <button
          className="btn"
          onClick={() => setCount((count) => count - step)}
        >
          -
        </button>
        <input type="text" value={count} onChange={(e) => handleChangeCountInput(e)}/>
        <button
          className="btn"
          onClick={() => setCount((count) => count + step)}
        >
          +
        </button>
      </div>
      <div className="message">
        {count === 0 &&
          `Today is ${date.toLocaleDateString(undefined, options)}`}
        {count < 0 &&
          `${Math.abs(count)} day${
            Math.abs(count) === 1 ? "" : "s"
          } ago was ${date.toLocaleDateString(undefined, options)}`}
        {count > 0 &&
          `${Math.abs(count)} day${
            Math.abs(count) === 1 ? "" : "s"
          } from today is ${date.toLocaleDateString(undefined, options)}`}
      </div>
      <button className="btn" onClick={handleReset}>Reset</button>
    </div>
  )
}

export default App
