import { createContext, useState, useContext, useEffect } from 'react'
import { supabase } from '../services/supabase'

export const AuthContext = createContext()

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState()

  const getSession = async () => {
    const session = await supabase.auth.session()

    setUser(session?.user ?? null)

    await supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
    })
  }

  useEffect(() => {
    /*     const session = supabase.auth.session()

    setUser(session?.user ?? null)

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
      }
    ) */
    getSession()

    return () => supabase.removeAllSubscriptions()
  }, [])

  const value = {
    handleGithubLogin: () => {
      supabase.auth.signIn({
        provider: 'github'
      })
    },
    user
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
