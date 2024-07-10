import { createContext, useContext, useEffect, useReducer } from "react"

const BASE_URL = "http://localhost:9000"

const CitiesContext = createContext()

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      }
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      }
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      }
    case "cities/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
      }
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities: [...action.payload],
      }
    case "rejected":
      return { ...state, isLoading: false, error: action.payload }
    default:
      throw new Error("Unknown action type")
  }
}

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    initialState
  )
  // const [cities, setCities] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [currentCity, setCurrentCity] = useState({})

  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" })
      try {
        const res = await fetch(`${BASE_URL}/cities`)
        const data = await res.json()
        dispatch({ type: "cities/loaded", payload: data })
      } catch {
        dispatch({
          type: "rejected",
          payload: "There was an error loading the cities data",
        })
      }
    }
    fetchCities()
  }, [])

  async function getCity(id) {
    dispatch({ type: "loading" })
    try {
      const res = await fetch(`${BASE_URL}/cities/${id}`)
      const data = await res.json()
      dispatch({ type: "city/loaded", payload: data })
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error loading city data...",
      })
    }
  }

  async function createCity(city) {
    dispatch({ type: "loading" })
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(city),
        headers: {
          "Content-Type": "application/json",
        },
      })
      const data = await res.json()

      dispatch({ type: "cities/created", payload: data })
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error adding this city, try again",
      })
    }
  }

  async function deleteCity(cityId) {
    dispatch({ type: "loading" })
    try {
      const res = await fetch(`${BASE_URL}/cities/${cityId}`, {
        method: "DELETE",
      })
      const deletedCityData = await res.json()
      const filteredCities = cities.filter(
        (city) => city.id !== deletedCityData.id
      )
      dispatch({ type: "cities/deleted", payload: filteredCities })
    } catch {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting this city",
      })
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
        deleteCity,
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
