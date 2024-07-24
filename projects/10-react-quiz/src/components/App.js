// npm packages
import { useEffect } from "react"

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
import { useQuiz } from "../QuizContext"

function App() {
  const { status, dispatch } = useQuiz()

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
  }, [dispatch])

  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <Start />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <NextButton />
              <Timer />
            </Footer>
          </>
        )}
        {status === "finished" && <Finish />}
      </Main>
    </div>
  )
}

export default App
