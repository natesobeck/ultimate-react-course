// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react"

function App() {
  const [amount, setAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("USD")
  const [toCurrency, setToCurrency] = useState("EUR")
  const [output, setOutput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleCurrencyInput = (e) => {
    const numInputValue = Number(e.target.value)

    setAmount(
      isNaN(numInputValue) ? amount : numInputValue === 0 ? "" : numInputValue
    )
  }

  const handleCurrencySelect = (e) => {
    if (e.target.classList.contains("from-currency")) {
      setFromCurrency(e.target.value)
    }
    if (e.target.classList.contains("to-currency")) {
      setToCurrency(e.target.value)
    }
  }

  useEffect(() => {
    async function convertCurrency() {
      setIsLoading(true)
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      )
      const data = await res.json()
      setOutput(data.rates[toCurrency])
      setIsLoading(false)
    }
    if (amount !== "") {
      convertCurrency()
    }
  }, [amount, fromCurrency, toCurrency])

  return (
    <div>
      <input type="text" onChange={handleCurrencyInput} value={amount} />
      <select
        value={fromCurrency}
        onChange={(e) => handleCurrencySelect(e)}
        className="from-currency"
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select
        value={toCurrency}
        className="to-currency"
        onChange={(e) => handleCurrencySelect(e)}
        disabled={isLoading}
      >
        {fromCurrency !== "USD" && <option value="USD">USD</option>}
        {fromCurrency !== "EUR" && <option value="EUR">EUR</option>}
        {fromCurrency !== "CAD" && <option value="CAD">CAD</option>}
        {fromCurrency !== "INR" && <option value="INR">INR</option>}
      </select>
      {amount && (
        <p>
          {amount} in {fromCurrency} is {output} in {toCurrency}
        </p>
      )}
    </div>
  )
}

export default App
