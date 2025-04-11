import React, { useContext } from 'react'
import { supabase } from '../../supabaseClient'
import { AuthContext } from '../../context'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const { loggedIn, setLoggedIn } = useContext(AuthContext)
  const navigate = useNavigate()
  const Logout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('Error signing out:', error.message)
    } else {
      setLoggedIn(false)
      navigate("/")
    }
  }


  return (
    <header className='w-full h-16  bg-[#4CAF50] shadow-md flex items-center justify-between px-4'>
        <h1 className='text-white font-bold text-3xl'>TRASHOP</h1>
        <button onClick={Logout} className='p-3 bg-white rounded-lg text-[#4CAF50] hover:cursor-pointer'>{loggedIn? "Logout": "Sesión no iniciada"}</button>
    </header>
)
}

export default Header
