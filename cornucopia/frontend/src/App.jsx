import { useState } from 'react'
import logo from './logo.svg'
import '../dist/output.css'
import Login from './Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Login />
  )
}

export default App
