import { createFileRoute, redirect } from '@tanstack/react-router'
import { supabase } from '@/shared/api/supabase/client'

export const Route = createFileRoute('/auth/callback')({
  beforeLoad: async () => {
    try {
      const { error } = await supabase.auth.getSession()
      if (error) throw error

      throw redirect({ to: '/' })
    } catch (error) {
      console.error('Auth callback error:', error)

      throw redirect({ to: '/' })
    }
  }
})
