import { createContext, useState, useContext, useEffect } from 'react'
import { supabase } from '../services/supabase'

export const AuthContext = createContext()

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState()

  useEffect(() => {
    const getSession = async () => {
      const session = await supabase.auth.session()

      setUser(session?.user ?? null)

      await supabase.auth.onAuthStateChange(async (event, session) => {
        setUser(session?.user ?? null)
      })
    }
    /*     const session = supabase.auth.session()

    setUser(session?.user ?? null)

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
      }
    ) */

    getSession()
  }, [])

  const value = {
    handleGithubLogin: async () => {
      await supabase.auth.signIn({
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
