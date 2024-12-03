import { redirect } from '@tanstack/react-router'
import { supabase } from '@/shared/api/supabase/client'

const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL

export const adminGuard = async () => {
  const {
    data: { session }
  } = await supabase.auth.getSession()

  if (!session?.user || session.user.email !== ADMIN_EMAIL) {
    throw redirect({ to: '/' })
  }

  return session.user
}
