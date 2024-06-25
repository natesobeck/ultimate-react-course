const Button = ({ children, onClick, disabled }) => {
  return <button className="btn" onClick={onClick} disabled={disabled}>{children}</button>
}

export default Button
