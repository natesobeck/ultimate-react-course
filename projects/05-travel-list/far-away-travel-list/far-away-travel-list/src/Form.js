import { useState } from "react"

export default function Form({ displayedItems, setDisplayedItems }) {
  const [formData, setFormData] = useState({
    description: "",
    quantity: 1,
  })

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (!formData.description) return

    const newItem = {
      description: formData.description,
      quantity: formData.quantity,
      packed: false,
      id: Date.now(),
    }

    setFormData({
      description: "",
      quantity: 1,
    })

    setDisplayedItems([newItem, ...displayedItems])
  }

  return (
    <form
      className="add-form"
      onSubmit={handleSubmit}
      onChange={handleChange}
      name="quantity"
    >
      <h3>What do you need for your 😍 trip?</h3>
      <select onChange={handleChange} value={formData.quantity} name="quantity">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option key={num}>{num}</option>
        ))}
      </select>
      <input
        type="text"
        name="description"
        placeholder="Item..."
        value={formData.description}
        onChange={handleChange}
        autoComplete="off"
      />
      <button>Add</button>
    </form>
  )
}