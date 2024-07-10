import { createContext, useContext, useEffect, useState } from "react"

const BASE_URL = "http://localhost:9000"

const CitiesContext = createContext()

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [currentCity, setCurrentCity] = useState({})

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true)
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        setCities(data)
      } catch {
        alert("There was an error loading city data...")
      } finally {
        setIsLoading(false)
      }
    }
    fetchCities()
  }, [])

  async function getCity(id) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      setCurrentCity(data)
    } catch {
      alert("There was an error loading city data...")
    } finally {
      setIsLoading(false)
    }
  }

  async function createCity(city) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()

      setCities(cities => [...cities, data])
    } catch {
      alert("There was an error adding this city, try again")
    } finally {
      setIsLoading(false)
    }
  }

  async function deleteCity(cityId) {
    try {
      setIsLoading(true)
      const res = await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: 'DELETE'
      })
      const deletedCityData = await res.json()
      const filteredCities = cities.filter(city => city.id !== deletedCityData.id)
      setCities(() => filteredCities)
    } catch {
      alert("There was an error deleting this city")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  )
}

function useCities() {
  const context = useContext(CitiesContext)
  if (context === undefined)
    throw new Error("Cities context was used outside it's provider")
  return context
}

export { CitiesProvider, useCities }
