import { faqs } from "./App"
import AccordionItem from "./AccordionItem"

const Accordion = () => {
  return (
    <div className="accordion">
      {faqs.map((faq, i) => (
        <AccordionItem key={faq.title} num={i + 1} title={faq.title} text={faq.text}/>
      ))}
    </div>
  )
}

export default Accordion
