import { useState } from 'react'
import logo from './logo.svg'
// import '../dist/output.css'
import Login from './Login'
import Homescreen from './Homescreen'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/login" element={<Login />} /> 
          <Route exact path="/home" element={<Homescreen />}/>
      </Routes>
    </Router>
    )
}

export default App
