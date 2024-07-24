import "./App.css"
import { useState } from "react"

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
]

export default function App() {
  const [step, setStep] = useState(1)
  const [isOpen, setIsOpen] = useState(true)

  const handleClickNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleClickPrev = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleToggleSteps = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button className="close" onClick={() => handleToggleSteps()}>
        &times;
      </button>

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <StepMessage className="message" step={step} >
            {messages[step - 1]}
          </StepMessage>

          <div className="buttons">
            <Button
              textColor="#fff"
              bgColor="#7950f2"
              onClick={handleClickPrev}
            >
              <span>👈</span> Previous
            </Button>
            <Button
              textColor="#fff"
              bgColor="#7950f2"
              onClick={handleClickNext}
            >
              Next <span>👉</span>
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

function StepMessage({ step, children }) {
  return (
    <div className="message">
      <h3>Step {step}: </h3>
      {children}
    </div>
  )
}

function Button({ bgColor, textColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
