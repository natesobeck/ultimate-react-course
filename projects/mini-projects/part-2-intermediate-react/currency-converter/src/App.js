// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useState } from "react"

function App() {
  const [currencyInput, setCurrencyInput] = useState("")
  const [state, setState] = useState('State test')

  const handleChange = (e) => {
    setCurrencyInput(e.target.value)
  }

  return (
    <div>
      <input type="text" onChange={handleChange} value={currencyInput}/>
      <select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>OUTPUT</p>
    </div>
  )
}

export default App
