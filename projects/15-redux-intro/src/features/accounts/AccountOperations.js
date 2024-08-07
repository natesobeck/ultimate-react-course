import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deposit, withdraw, payLoan, requestLoan } from "./accountSlice"

function AccountOperations() {
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawalAmount, setWithdrawalAmount] = useState("")
  const [loanAmount, setLoanAmount] = useState("")
  const [loanPurpose, setLoanPurpose] = useState("")
  const [currency, setCurrency] = useState("USD")
  const dispatch = useDispatch()
  const loan = useSelector((store) => store.account.loan)
  const isLoading = useSelector((store) => store.account.isLoading)

  function handleDeposit() {
    if (!depositAmount) return
    dispatch(deposit(depositAmount, currency))
    setDepositAmount("")
  }

  function handleWithdrawal() {
    if (!withdrawalAmount) return
    dispatch(withdraw(withdrawalAmount))
    setWithdrawalAmount("")
  }

  function handleRequestLoan() {
    if (!loanAmount) return
    dispatch(requestLoan(loanAmount, loanPurpose))
    setLoanAmount("")
    setLoanPurpose("")
  }

  function handlePayLoan() {
    if (loan === 0) return
    dispatch(payLoan())
  }

  return (
    <div>
      <h2>Your account operations</h2>
      <div className="inputs">
        <div>
          <label>Deposit</label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(+e.target.value)}
            disabled={isLoading}
          />
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            disabled={isLoading}
          >
            <option value="USD">US Dollar</option>
            <option value="EUR">Euro</option>
            <option value="GBP">British Pound</option>
          </select>

          <button onClick={handleDeposit}>{isLoading ? 'Converting...' : `Deposit ${depositAmount}`}</button>
        </div>

        <div>
          <label>Withdraw</label>
          <input
            type="number"
            value={withdrawalAmount}
            onChange={(e) => setWithdrawalAmount(+e.target.value)}
          />
          <button onClick={handleWithdrawal}>
            Withdraw {withdrawalAmount}
          </button>
        </div>

        <div>
          <label>Request loan</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(+e.target.value)}
            placeholder="Loan amount"
          />
          <input
            value={loanPurpose}
            onChange={(e) => setLoanPurpose(e.target.value)}
            placeholder="Loan purpose"
          />
          <button onClick={handleRequestLoan}>Request loan</button>
        </div>

        {loan > 0 && (
          <div>
            <span>Pay back ${loan}</span>
            <button onClick={handlePayLoan}>Pay loan</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AccountOperations
