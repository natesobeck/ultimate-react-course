import { faqs } from "./App"
import AccordionItem from "./AccordionItem"
import { useState } from "react"

const Accordion = () => {
  const [currentOpen, setCurrentOpen] = useState(null)
  
  function handleClick(num) {
    setCurrentOpen(num)
  }

  return (
    <div className="accordion">
      {faqs.map((faq, i) => (
        <AccordionItem
          currentOpen={currentOpen}
          onCurrentOpen={setCurrentOpen}
          key={faq.title}
          num={i + 1}
          title={faq.title}
          text={faq.text}
          onClick={handleClick}
        />
      ))}
    </div>
  )
}

export default Accordion
