import { useQuiz } from "../QuizContext"

function Start() {
  const { numQuestions, dispatch } = useQuiz()
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button className='btn' onClick={() => dispatch({ type: "start" })}>Let's start</button>
    </div>
  )
}

export default Start
