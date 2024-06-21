import { useState, useEffect } from "react"

const KEY = "4dcd73c0"

export function useMovies(query) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [movies, setMovies] = useState([])

  useEffect(() => {
    const controller = new AbortController()

    async function getMovies() {
      try {
        setError("")
        setIsLoading(true)

        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        )

        if (!res.ok)
          throw new Error("Something went wrong with fetching movies")

        const data = await res.json()

        if (data.Response === "False") throw new Error("Movie not found")

        setMovies(data.Search)
        setError("")
      } catch (error) {
        if (error.name !== "AbortError") {
          console.log(error.message)
          setError(error.message)
        }
      } finally {
        setIsLoading(false)
      }
    }
    if (query.length < 3) {
      setMovies([])
      setError("")
      return
    }

    // handleCloseMovie()
    getMovies()

    return function () {
      controller.abort()
    }
  }, [query])

  return {movies, isLoading, error}
}
