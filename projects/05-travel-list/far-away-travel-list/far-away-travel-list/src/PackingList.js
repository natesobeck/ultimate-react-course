import { useState } from "react"

import Item from "./Item"

export default function PackingList({ displayedItems, handleClearList, handleDeleteItem, handleTogglePacked }) {

  const [sortBy, setSortBy] = useState('input')

  let sortedItems

  if (sortBy === 'input') sortedItems = displayedItems
  if (sortBy === 'description') sortedItems = displayedItems.slice().sort((item1, item2) => item1.description.localeCompare(item2.description))
  if (sortBy === 'packed') sortedItems = displayedItems.slice().sort((item1, item2) => Number(item1.packed) - Number(item2.packed))

  return (
    <div className="list">
      {displayedItems.length === 0 && <h4><em>Nothing here yet!</em></h4>}
      {displayedItems.length > 0 && (
        <ul className="list">
          {sortedItems.map((item) => (
            <Item
              key={item.id}
              item={item}
              handleDeleteItem={handleDeleteItem}
              handleTogglePacked={handleTogglePacked}
            />
          ))}
        </ul>
      )}

      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={handleClearList}>Clear List</button>
      </div>
    </div>
  )
}