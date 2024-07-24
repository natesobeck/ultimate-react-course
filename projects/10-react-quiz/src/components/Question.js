import { useQuiz } from "../QuizContext"
import Options from "./Options"

const Question = () => {
  const { question } = useQuiz()

  return (
    <div>
      <h4>{question.question}</h4>

      <div className="options">
        <Options />
      </div>
    </div>
  )
}

export default Question
