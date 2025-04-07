import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { useContext } from 'react'
import { AuthContext } from '../context'
import './App.css'
import Header from './components/Header'

function App() {
  const { loggedIn } = useContext(AuthContext)
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Login />} />
        {loggedIn ? <Route path="/dashboard" element={<Dashboard />} /> : <Route path="/" element={<Login />} />}
      </Routes>
    </BrowserRouter>
  )
}

export default App
