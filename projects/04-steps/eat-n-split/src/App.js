// css
import "./App.css"

// npm packages
import { useState } from "react"

const initialFriends = [
  {
    id: 1,
    name: "Sarah",
    picture: `https://picsum.photos/60/60/?random=${Math.random()}`,
    balance: 0,
  },
  {
    id: 2,
    name: "Tom",
    picture: `https://picsum.photos/60/60/?random=${Math.random()}`,
    balance: -10,
  },
  {
    id: 3,
    name: "Fiona",
    picture: `https://picsum.photos/60/60/?random=${Math.random()}`,
    balance: 20,
  },
]

function App() {
  return <EatNSplit />
}

function EatNSplit() {
  const [selectedFriend, setSelectedFriend] = useState(null)
  const [showFormAddFriend, setShowFormAddFriend] = useState(false)
  const [friends, setFriends] = useState(initialFriends)

  const handleSelectFriend = (friend) => {
    setSelectedFriend(
      selectedFriend && selectedFriend.id === friend.id ? null : { ...friend }
    )
    if (showFormAddFriend) setShowFormAddFriend(false)
  }

  const handleShowFormAddFriend = () => {
    setShowFormAddFriend(!showFormAddFriend)
  }

  const handleAddFriend = (e, formData, setFormData) => {
    e.preventDefault()
    if (!formData.name) return
    if (!formData.picture)
      formData.picture = `https://picsum.photos/60/60/?random=${Math.random()}`
    setFriends([...friends, formData])
    setFormData({
      id: Date.now(),
      name: "",
      picture: "",
      balance: 0,
    })
    setShowFormAddFriend(false)
  }

  const handleSplit = (value) => {
    const updatedFriendList = friends.map(friend => 
      friend.id === selectedFriend.id ? { ...friend, balance: Number(friend.balance) + value } : friend
    )
    setFriends(updatedFriendList)
  }

  return (
    <div className="app">
      <FriendList
        onSelectFriend={handleSelectFriend}
        selectedFriend={selectedFriend}
        onShowFormAddFriend={handleShowFormAddFriend}
        showFormAddFriend={showFormAddFriend}
        friends={friends}
        onAddFriend={handleAddFriend}
      />
      {selectedFriend && (
        <FormBillSplit selectedFriend={selectedFriend} onSplit={handleSplit} />
      )}
    </div>
  )
}

function FriendList({
  onSelectFriend,
  selectedFriend,
  onShowFormAddFriend,
  showFormAddFriend,
  friends,
  onAddFriend,
}) {
  return (
    <ul className="friend-list">
      {friends.map((friend) => (
        <Friend
          key={friend.id}
          friend={friend}
          onSelectFriend={onSelectFriend}
          selectedFriend={selectedFriend}
        />
      ))}
      {showFormAddFriend && <FormAddFriend onAddFriend={onAddFriend} />}
      <button className="btn" onClick={onShowFormAddFriend}>
        {showFormAddFriend ? "Close" : "Add friend"}
      </button>
    </ul>
  )
}

function Friend({ friend, onSelectFriend, selectedFriend }) {
  return (
    <li
      className={`friend ${selectedFriend?.id === friend.id ? "selected" : ""}`}
    >
      <img
        src={friend.picture}
        alt={`A portait of ${friend.name}`}
        className="profile-img"
      />
      <div className="friend-text">
        <p className="name">{friend.name}</p>
        {friend.balance < 0 && (
          <p className="message green">
            {friend.name} owes you ${Math.abs(friend.balance)}.00
          </p>
        )}
        {friend.balance > 0 && (
          <p className="message red">
            You owe {friend.name} ${Math.abs(friend.balance)}.00
          </p>
        )}
        {friend.balance === 0 && (
          <p className="message">You and {friend.name} are even</p>
        )}
      </div>
      <button className="btn" onClick={() => onSelectFriend(friend)}>
        {friend.id === selectedFriend?.id ? "Close" : "Select"}
      </button>
    </li>
  )
}

function FormAddFriend({ onAddFriend }) {
  const [formData, setFormData] = useState({
    id: Date.now(),
    name: "",
    picture: "",
    balance: 0,
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <form
      className="form"
      onSubmit={(e) => onAddFriend(e, formData, setFormData)}
    >
      <span>
        <label htmlFor="name-input">👫 Friend Name</label>
        <input
          id="name-input"
          value={formData.name}
          autoComplete="off"
          onChange={(e) => handleChange(e)}
          name="name"
        />
      </span>
      <span>
        <label
          htmlFor="image-input"
          value={formData.picture}
          autoComplete="off"
          onChange={(e) => handleChange(e)}
          name="picture"
        >
          🌄 Image URL
        </label>
        <input id="image-input" />
      </span>
      <button className="btn" type="submit">
        Add
      </button>
    </form>
  )
}

function FormBillSplit({ selectedFriend, onSplit }) {
  const [formData, setFormData] = useState({
    value: "",
    yourCost: "",
    payee: "You",
  })
  const paidByFriend = formData.value ? formData.value - formData.yourCost : ""

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === "value" || name === "yourCost") {
      if (/^\d*\.?\d*$/.test(value)) {
        if (name === "yourCost") {
          if (value <= Number(formData.value)) {
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
        } else {
          setFormData({ ...formData, [e.target.name]: e.target.value })
        }
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value })
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.value || !paidByFriend) return
    onSplit(formData.payee === 'You' ? -paidByFriend : formData.yourCost)
  }

  return (
    <form className="form bill-split" onSubmit={handleSubmit}>
      <h4 className="header">Split a bill with {selectedFriend.name}</h4>
      <span>
        <label htmlFor="value-input">💰 Bill value</label>
        <input
          id="value-input"
          type="text"
          onChange={(e) => handleChange(e)}
          value={formData.value}
          name="value"
        />
      </span>
      <span>
        <label htmlFor="your-expense-input">🧍‍♂️ Your expense</label>
        <input
          id="your-expense-input"
          type="text"
          onChange={(e) =>
            handleChange(e) > formData.value ? null : (e) => handleChange(e)
          }
          value={formData.yourCost}
          name="yourCost"
        />
      </span>
      <span>
        <label htmlFor="friend-expense-input">
          {`👫 ${selectedFriend.name}`}'s expense
        </label>
        <input
          id="friend-expense-input"
          type="text"
          value={paidByFriend}
          name="friendCost"
          disabled
        />
      </span>
      <span>
        <label htmlFor="payee-select">🤑 Who is paying?</label>
        <select
          id="payee-select"
          value={formData.payee}
          onChange={(e) => handleChange(e)}
          name="payee"
        >
          <option value="You">You</option>
          <option value={selectedFriend.name}>{selectedFriend.name}</option>
        </select>
      </span>
      <button className="btn">
        Split Bill
      </button>
    </form>
  )
}

export default App
