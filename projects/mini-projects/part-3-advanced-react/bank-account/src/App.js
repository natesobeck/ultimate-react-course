// components
import Header from "./Header"
import Main from "./Main"

// npm packages
import { useReducer } from "react"

const initialState = {
  balance: 0,
  loan: 0,
  status: "closed",
}

function reducer(state, action) {
  if (state.status !== "open" && action.type !== "openAccount") return state
    switch (action.type) {
      case "openAccount":
        return {
          ...initialState,
          status: "open",
          balance: 500,
        }

      case "deposit":
        if (state.status === "open") return state

        return {
          ...state,
          balance: state.balance + action.payload,
        }

      case "withdraw":
        return {
          ...state,
          balance:
            state.balance >= action.payload
              ? state.balance - action.payload
              : state.balance,
        }

      case "getLoan":
        return {
          ...state,
          loan: state.loan === 0 ? state.loan + action.payload : state.loan,
          balance:
            state.loan === 0 ? state.balance + action.payload : state.balance,
        }

      case "payLoan":
        const canPayLoan = state.balance >= state.loan

        return {
          ...state,
          balance: canPayLoan ? state.balance - state.loan : state.balance,
          loan: canPayLoan ? 0 : state.loan,
        }

      case "closeAccount":
        if (state.balance === 0 && state.loan === 0) {
          return initialState
        } else {
          return state
        }

      default:
        throw new Error("Action unknown")
    }
}

function App() {
  const [{ balance, loan, status }, dispatch] = useReducer(
    reducer,
    initialState
  )

  const isOpen = status === "open"

  return (
    <div className="app">
      <Header />
      <Main balance={balance} loan={loan} dispatch={dispatch} isOpen={isOpen} />
    </div>
  )
}

export default App
