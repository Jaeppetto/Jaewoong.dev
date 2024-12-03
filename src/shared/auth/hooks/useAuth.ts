import { useEffect, useState } from 'react'
import { User, AuthError } from '@supabase/supabase-js'
import { supabase } from '@/shared/api/supabase/client'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<AuthError | null>(null)

  useEffect(() => {
    checkUser()

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const checkUser = async () => {
    try {
      const {
        data: { session },
        error
      } = await supabase.auth.getSession()
      if (error) throw error

      setUser(session?.user ?? null)
    } catch (error) {
      setError(error as AuthError)
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      setUser(null)
    } catch (error) {
      setError(error as AuthError)
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
    signOut
  }
}
