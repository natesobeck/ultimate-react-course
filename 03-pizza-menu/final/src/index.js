import React from "react"
import ReactDOM from "react-dom/client"

import { pizzaData } from "./data.js"

import './index.css'

function App() {
  return (
    <main className="container">
      <Header />
      <Menu />
      <Footer />
    </main>
  )
}

function Pizza({ pizza }) {
  return (
    <div className="pizza">
      <div>
        <img src={pizza.photoName} alt={pizza.name}/>
        <h3>{pizza.name}</h3>
        <p>{pizza.ingredients}</p>
        <span>{pizza.price}</span>
      </div>
    </div>
  )
}

function Header() {
  return (
    <header className="header">
      <h1>Fast React Pizza Co.</h1>
    </header>
  )
}

function Footer() {
  const hour = new Date().getHours()
  const openHour = 12
  const closeHour = 22

  return <footer className="footer">{hour < openHour || hour > closeHour ? 'Sorry, we\'re closed.' : 'Come on by! We\'re open!'}</footer>
}

function Menu() {
  return (
    <div className="menu">
      <div className="pizzas">
        {pizzaData.map(pizza => (
          <Pizza pizza={pizza} key={pizza.name} />
        ))}
      </div>
      <button className="btn order">PLACE ORDER</button>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
