const AccordionItem = ({ children, num, title, currentOpen, onCurrentOpen }) => {
  const isOpen = num === currentOpen
  function handleClick(e) {
    onCurrentOpen(isOpen ? null : num)
  }

  return (
    <div
      className={`item ${isOpen ? "open" : ""}`}
      onClick={(e) => handleClick(e)}
    > 
      <p className="number">{num < 9 ? `0${num}` : num}</p>
      <p className="title">{title}</p>
      <p className="icon">{isOpen ? "+" : "-"}</p>
      {isOpen && <div className="content-box">{children}</div>}
    </div>
  )
}

export default AccordionItem
