import { NavLink } from "react-router-dom"
import styles from "./PageNav.module.css"
import Logo from "./Logo"
import { useAuth } from "../contexts/FakeAuthContext"
import Button from "./Button"

const PageNav = () => {
  const {user, logout} = useAuth()

  return (
    <nav className={styles.nav}>
      <Logo />

      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        {!user && <li>
          <NavLink to="/login" className={styles.ctaLink}>
            Login
          </NavLink>
        </li>}
        {user && <li>
          <Button type='primary' onClick={logout}>Logout</Button></li>}
      </ul>
    </nav>
  )
}

export default PageNav
