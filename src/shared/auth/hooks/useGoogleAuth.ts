import { useState } from 'react'
import { supabase } from '@/shared/api/supabase/client'
import type { AuthError } from '@supabase/supabase-js'

export const useGoogleAuth = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<AuthError | null>(null)

  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          queryParams: {
            access_type: 'offline',
            prompt: 'consent'
          },
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) throw error
      return data
    } catch (err) {
      setError(err as AuthError)
      console.error('Google login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return {
    signInWithGoogle,
    loading,
    error
  }
}
