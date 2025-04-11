import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { supabase } from '../../supabaseClient' // Adjust the import path as necessary
import { AuthContext } from '../../context'
const LoginForm = () => {
  const { setLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const handleSubmit = async (e) => {
    e.preventDefault()
  let { error } = await supabase.auth.signInWithPassword({
    email: formData.email,
    password: formData.password
  })
  if (error) {
    console.error('Error logging in:', error.message)
  } else {
    console.log('Logged in successfully:')
    setFormData({
      email: "",
      password: ""
    })
    setLoggedIn(true)
    navigate("/dashboard")
  }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  return (
    <form  className="flex flex-col w-full gap-4 p-4 h-min rounded-lg shadow-lg bg-[#4CAF50] lg:w-full">
    <h1 className="text-white text-center mb-4 text-3xl font-bold">Login</h1>
    <input
      type="email"
      placeholder="Correo Electrónico"
      name="email"
      value={formData.email}
      onChange={(e) => handleChange(e)}
      className="w-full bg-white px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
    />
  
    <input
      type="password"
      placeholder="Contraseña"
      name="password"
      value={formData.password}
      onChange={(e) => handleChange(e)}
      className="w-full bg-white px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
    />
  
    <button  onClick={(e) => handleSubmit(e)} className="w-full bg-white text-green-600 font-semibold py-2 rounded-md hover:bg-green-100 hover:cursor-pointer transition">
      Iniciar Sesión
    </button>
    <a href="/registro" className='text-white underline'>Todavía no te registraste?</a>
  </form>
  
)
    
  }
export default LoginForm