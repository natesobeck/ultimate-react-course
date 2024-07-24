export default function Stats({ displayedItems }) {
  if (!displayedItems.length)
    return <p className="stats"><em>Start adding some items to your packing list 🚀</em></p>

  const numPacked = displayedItems.filter((item) => item.packed === true).length
  const numItems = displayedItems.length
  const percentage = Math.round((numPacked / numItems) * 100)

  return (
    <footer className="stats">
      <em>
        {percentage === 100 && "You got everything. Ready to go ✈️"}
        {percentage < 100 &&
          `🧳 You have ${numItems} item${
            numItems === 1 ? "" : "s"
          } in your list, and you already 
            packed ${numPacked} ${`(${percentage}%)`}`}
      </em>
    </footer>
  )
}