import { useState, useEffect } from 'react'
import { AuthContext } from './context.jsx'
import { supabase } from './supabaseClient' // ajustá la ruta si es distinta

const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    })

  }, [])

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
