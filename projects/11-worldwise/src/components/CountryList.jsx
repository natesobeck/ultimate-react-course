import CountryItem from "./CountryItem"
import styles from "./CountryList.module.css"
import Spinner from "./Spinner"
import Message from "./Message"

const CountryList = ({ cities, isLoading }) => {
  if (isLoading) return <Spinner />

  if (!cities.length)
    return (
      <Message
        message={"Please add your first country by clicking on a country on the map"}
      />
    )
  
  const countries = cities.reduce((arr, city) => {
    if (!arr.map(el => el.city).includes(city.country))
      return [...arr, {country: city.country, emoji: city.emoji}]
    else return arr
  }, [])

  return (
    <div className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} />
      ))}
    </div>
  )
}

export default CountryList
