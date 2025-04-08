import { useState, useEffect } from 'react'
import { AuthContext } from './context.jsx'
import { supabase } from './supabaseClient' // ajustá la ruta si es distinta

const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [idUsuario, setIdUsuario] = useState("")

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
            setIdUsuario(session.user.id)
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
            setIdUsuario("")
        }
    })

  }, [])

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, idUsuario, setIdUsuario }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
