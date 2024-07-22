import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchOrder = () => {
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  function handleSubmit(e) {
    e.preventDefault()
    if (!query) return
    navigate(`/order/${query}`)
    setQuery("")
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={query}
        placeholder="Search order #"
        onChange={(e) => setQuery(e.target.value)}
        className="px-4 py-2 bg-yellow-100 text-sm rounded-full placeholder:text-stone-400 w-28 sm:w-64 sm:focus:w-72 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50 focus:ring-offset-2"
      />
    </form>
  )
}

export default SearchOrder
