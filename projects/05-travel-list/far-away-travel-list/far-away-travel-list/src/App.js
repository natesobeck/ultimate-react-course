// npm packages
import { useState } from "react"

//components
import Logo from "./Logo"
import Form from "./Form"
import PackingList from "./PackingList"
import Stats from "./Stats"

const items = []

function App() {
  const [displayedItems, setDisplayedItems] = useState(items)

  function handleDeleteItem(itemId) {
    const filteredDisplayedItems = displayedItems.filter(
      (item) => itemId !== item.id
    )
    setDisplayedItems(filteredDisplayedItems)
  }

  function handleTogglePacked(itemId) {
    const newList = displayedItems.map((item) =>
      item.id === itemId ? { ...item, packed: !item.packed } : item
    )
    setDisplayedItems(newList)
  }

  function handleClearList() {
    const confirmed = window.confirm("Are you sure you want to delete all of the items?")

    confirmed && setDisplayedItems([])
  }

  return (
    <div className="app">
      <Logo />
      <Form
        displayedItems={displayedItems}
        setDisplayedItems={setDisplayedItems}
      />
      <PackingList
        displayedItems={displayedItems}
        handleClearList={handleClearList}
        handleDeleteItem={handleDeleteItem}
        handleTogglePacked={handleTogglePacked}
      />
      <Stats displayedItems={displayedItems} />
    </div>
  )
}

export default App
