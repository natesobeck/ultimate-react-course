import { Link } from "react-router-dom"
import styles from "./CityItem.module.css"
import { useCities } from "../contexts/CitiesContext"

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date))

const CityItem = ({ city }) => {
  const { currentCity, deleteCity } = useCities()
  const { cityName, emoji, date, id, position } = city

  function handleDeleteCity(e) {
    e.preventDefault()
    deleteCity(id)
  }

  return (
    <li>
      <Link
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h2 className={styles.name}>{cityName}</h2>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  )
}

export default CityItem
