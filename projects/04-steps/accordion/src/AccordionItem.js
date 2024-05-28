const AccordionItem = ({ num, title, text, currentOpen, onClick }) => {

  const isOpen = num === currentOpen

  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={() => onClick(num)}
    > 
      <p className="number">{num < 9 ? `0${num}` : num}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "+" : "-"}</p>
      {isOpen && <div className="content-box">{text}</div>}
    </div>
  )
}

export default AccordionItem
