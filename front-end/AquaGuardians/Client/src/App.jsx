import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from "./components/Header/Header.jsx"
import Footer from "./components/Footer/Footer.jsx"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Header />
    <Outlet />
    <Footer />
</>
  )
}

export default App
