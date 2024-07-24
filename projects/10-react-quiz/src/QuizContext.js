import { createContext, useContext, useEffect, useReducer } from "react"
import { useLocalStorageState } from "./useLocalStorageState"

const QuizContext = createContext()

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
}

const SECS_PER_QUESTION = 30

function reducer(state, action) {
  switch (action.type) {
    case "dataRecieved":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      }

    case "dataFailed":
      return {
        ...state,
        status: "error",
      }

    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      }

    case "newAnswer":
      const question = state.questions[state.index]

      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }

    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      }
    }

    case "finished": {
      return {
        ...state,
        status: "finished",
      }
    }

    case "restart": {
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
      }
    }

    case "tick": {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      }
    }

    default:
      throw new Error("Action unknown")
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState)
  const question = questions[index]
  const [highScore, setHighScore] = useLocalStorageState(0, "highscore")
  const numQuestions = questions.length
  const totalPoints = questions.reduce(
    (total, question) => total + question.points,
    0
  )

  useEffect(() => {
    if (status === "finished" && points > highScore) {
      setHighScore(points)
    }
  }, [points, status, highScore, setHighScore])

  return (
    <QuizContext.Provider
      value={{
        question,
        status,
        index,
        answer,
        points,
        secondsRemaining,
        numQuestions,
        totalPoints,
        highScore,
        dispatch
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined)
    throw new Error("Cities context was used outside it's provider")
  return context
}

export { useQuiz, QuizProvider }
