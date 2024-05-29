import "./App.css"
import { useState } from "react"

function App() {
  const [bill, setBill] = useState(Number(0).toFixed(2))
  const [yourTip, setYourTip] = useState(0.2)
  const [friendTip, setFriendTip] = useState(0.2)

  return (
    <main className="app">
      <BillInput bill={bill} setBill={setBill} />
      <ServiceInput value={yourTip} onChange={setYourTip}>
        <p>How did you like the service?</p>
      </ServiceInput>
      <ServiceInput value={friendTip} onChange={setFriendTip}>
        <p>How did your friend like the service?</p>
      </ServiceInput>
      <Message bill={bill} yourTip={yourTip} friendTip={friendTip} />
      <Reset />
    </main>
  )
}

function BillInput({ bill, setBill }) {
  return (
    <div className="bill-input-container">
      <p>How much was the bill?</p>
      <input
        type="number"
        value={bill.toString()}
        min="1"
        onChange={(e) =>
          setBill(
            isNaN(parseFloat(e.target.value)) ? Number(0).toFixed(2) : parseFloat(e.target.value).toFixed(2)
          )
        }
      />
    </div>
  )
}

function ServiceInput({ children, onChange, value }) {
  return (
    <div className="service-input-container">
      {children}
      <select
        name="tip"
        onChange={(e) => onChange(parseFloat(e.target.value))}
        value={value}
      >
        <option value={0.1}>It was bad (10%)</option>
        <option value={0.15}>It was okay (15%)</option>
        <option value={0.2}>It was good (20%)</option>
        <option value={0.25}>It was excellent (25%)</option>
      </select>
    </div>
  )
}

function Message({ bill, yourTip, friendTip }) {
  const tip = (bill * (yourTip + friendTip)/2)
  const total = Number(bill) + tip

  return <h2>You pay ${total} (${bill} + ${tip} tip)</h2>
}

function Reset() {
  return <button>Reset</button>
}

export default App
