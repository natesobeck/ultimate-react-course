import { useState } from "react"

const items = []

function App() {
  const [displayedItems, setDisplayedItems] = useState(items)

  function handleDeleteItem(itemId) {
    const filteredDisplayedItems = displayedItems.filter(item => itemId !== item.id)
    setDisplayedItems(filteredDisplayedItems)
  }

  return (
    <div className="app">
      <Logo />
      <Form
        displayedItems={displayedItems}
        setDisplayedItems={setDisplayedItems}
      />
      <PackingList displayedItems={displayedItems} handleDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  )
}

function Logo() {
  return <h1>🌴 Far Away 🧳</h1>
}

function Form({ displayedItems, setDisplayedItems }) {
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
      />
      <button>Add</button>
    </form>
  )
}

function PackingList({ displayedItems, handleDeleteItem }) {
  console.log(displayedItems)
  return (
    <div className="list">
      {displayedItems.length === 0 && <h2>Nothing here yet!</h2>}
      {displayedItems.length > 0 && (
        <ul className="list">
          {displayedItems.map((item) => (
            <Item key={item.id} item={item} handleDeleteItem={handleDeleteItem}/>
          ))}
        </ul>
      )}
    </div>
  )
}

function Stats() {
  return (
    <footer className="stats">
      <em>🧳 You have X items on your list, and you already packed X (X%)</em>
    </footer>
  )
}

function Item({ item, handleDeleteItem }) {
  return (
    <li>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDeleteItem(item.id)}>❌</button>
    </li>
  )
}

export default App
