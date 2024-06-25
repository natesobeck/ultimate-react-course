// components
import Button from "./Button"


const Main = ({ dispatch, loan, balance, isOpen }) => {
  const loanEligible = isOpen && loan === 0
  const canPayLoan = isOpen && balance <= loan && loan !== 0
  const canCloseAccount = isOpen && balance === 0 && loan === 0

  return (
    <>
      <p>Balance: {balance}</p>
      <p>Loan: {loan}</p>
      <Button onClick={() => dispatch({ type: "openAccount" })} disabled={isOpen}>
        Open Account
      </Button>
      <Button onClick={() => dispatch({ type: "deposit" })} disabled={!isOpen}>Deposit 150</Button>
      <Button onClick={() => dispatch({ type: "withdraw" })} disabled={!isOpen}>
        Withdraw 50
      </Button>
      <Button onClick={() => dispatch({ type: "getLoan" })} loan={loan} disabled={!loanEligible}>
        Request 5000 loan
      </Button>
      <Button onClick={() => dispatch({ type: "payLoan" })} loan={loan} disabled={!canPayLoan}>
        Pay loan
      </Button>
      <Button onClick={() => dispatch({ type: "closeAccount" })} disabled={!canCloseAccount}>
        Close account
      </Button>
    </>
  )
}

export default Main
