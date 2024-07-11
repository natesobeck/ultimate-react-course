import styles from "./AppLayout.module.css"
import Sidebar from "../components/Sidebar"
import Map from "../components/Map"
import User from "../components/User"
import { useAuth } from "../contexts/FakeAuthContext"

const AppLayout = () => {
  const {user} = useAuth()

  return (
    <div className={styles.app}>
      {user && <User />}
      <Sidebar />
      <Map />
    </div>
  )
}

export default AppLayout
