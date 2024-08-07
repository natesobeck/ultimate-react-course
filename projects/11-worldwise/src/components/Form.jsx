// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react"

import styles from "./Form.module.css"
import Button from "./Button"
import BackButton from "./BackButton"
import useURLPosition from "../hooks/useURLPosition"
import Message from "./Message"
import Spinner from "./Spinner"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { useCities } from "../contexts/CitiesContext"
import { useNavigate } from "react-router-dom"

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client"

function Form() {
  const [cityName, setCityName] = useState("")
  const [country, setCountry] = useState("")
  const [emoji, setEmoji] = useState("")
  const [date, setDate] = useState(new Date())
  const [notes, setNotes] = useState("")
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false)
  const [geocodingError, setGeocodingError] = useState(null)
  const [lat, lng] = useURLPosition()
  const {createCity, isLoading} = useCities()
  const navigate = useNavigate()

  useEffect(() => {
    if (!lat || !lng) return

    async function fetchCityData() {
      try {
        setGeocodingError(null)
        setIsLoadingGeocoding(true)
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`)
        const cityData = await res.json()
        if (!cityData.countryCode)
          throw new Error(
            "This location is not within a country or city boundary, click somewhere else."
          )
        setCityName(cityData.city || cityData.locality || "")
        setCountry(cityData.countryName)
        setEmoji(convertToEmoji(cityData.countryCode))
      } catch (error) {
        setGeocodingError(error.message)
      } finally {
        setIsLoadingGeocoding(false)
      }
    }
    fetchCityData()
  }, [lat, lng, country])

  async function handleSubmit(e) {
    e.preventDefault()

    if (!cityName || !date) return

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: {
        lat,
        lng,
      },
    }
    await createCity(newCity)
    navigate("/app/cities")
  }

  if (isLoadingGeocoding) return <Spinner />

  if (!lat || !lng)
    return <Message message="Start by clicking somewhere on the map" />

  if (geocodingError) return <Message message={geocodingError} />

  return (
    <form className={`${styles.form} ${isLoading ? styles.loading : ''}`} onSubmit={handleSubmit}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        <DatePicker
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="MM/dd/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  )
}

export default Form
