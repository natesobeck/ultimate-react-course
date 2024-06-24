const NextButton = ({ dispatch, answer, index, numQuestions }) => {
  if (answer === null) return null

  if (index + 1 < numQuestions)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "nextQuestion" })}
      >
        Next
      </button>
    )

  if (index + 1 === numQuestions) {
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finished" })}
      >
        Finish
      </button>
    )
  }
}

export default NextButton
