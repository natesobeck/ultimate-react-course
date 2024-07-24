// npm packages
import { useEffect, useReducer } from "react"

// components
import Header from "./Header"
import Main from "./Main"
import Loader from "./Loader"
import Error from "./Error"
import Start from "./Start"
import Question from "./Question"
import NextButton from "./NextButton"
import Progress from "./Progress"
import Finish from "./Finish"
import Footer from "./Footer"
import Timer from "./Timer"

//custom hooks
import { useLocalStorageState } from "../useLocalStorageState"

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null
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
        secondsRemaining: state.questions.length * SECS_PER_QUESTION
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
        questions: state.questions
      }
    }

    case 'tick': {
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status
      }
    }

    default:
      throw new Error("Action unknown")
  }
}

function App() {
  const [{ questions, status, index, answer, points, secondsRemaining }, dispatch] = useReducer(
    reducer,
    initialState
  )
  const [highScore, setHighScore] = useLocalStorageState(0, "highscore")
  const numQuestions = questions.length
  const totalPoints = questions.reduce(
    (total, question) => total + question.points,
    0
  )

  useEffect(() => {
    async function fetchQuestionData() {
      try {
        const res = await fetch("http://localhost:9000/questions")
        const data = await res.json()
        dispatch({ type: "dataRecieved", payload: data })
      } catch (error) {
        dispatch({ type: "dataFailed" })
      }
    }
    fetchQuestionData()
  }, [])

  useEffect(() => {
    if (status === "finished" && points > highScore) {
      setHighScore(points)
    }
  }, [points, status, highScore, setHighScore])

  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <Start numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <NextButton
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch}/>
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finish
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  )
}

export default App
