import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import { User } from '../types'

interface AuthStore {
  user: User | null
  loading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, fullName: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        // Use auth data directly - no database query
        const userData: User = {
          id: data.user.id,
          email: data.user.email || '',
          full_name: data.user.user_metadata?.full_name || 'User',
          role: data.user.user_metadata?.role || 'student'
        }
        set({ user: userData, loading: false })
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Login failed'
      set({ error: errorMessage, loading: false })
      throw new Error(errorMessage)
    }
  },

  register: async (email: string, password: string, fullName: string) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'student',
          },
        },
      })

      if (error) throw error

      if (data.user) {
        const userData: User = {
          id: data.user.id,
          email: data.user.email || '',
          full_name: fullName,
          role: 'student'
        }
        set({ user: userData, loading: false })
      }
    } catch (error: any) {
      const errorMessage = error.message || 'Registration failed'
      set({ error: errorMessage, loading: false })
      throw new Error(errorMessage)
    }
  },

  logout: async () => {
    set({ loading: true })
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      set({ user: null, loading: false })
    } catch (error: any) {
      const errorMessage = error.message || 'Logout failed'
      set({ error: errorMessage, loading: false })
      throw new Error(errorMessage)
    }
  },

  checkAuth: async () => {
    set({ loading: true })
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error

      if (data.session?.user) {
        const userData: User = {
          id: data.session.user.id,
          email: data.session.user.email || '',
          full_name: data.session.user.user_metadata?.full_name || 'User',
          role: data.session.user.user_metadata?.role || 'student'
        }
        set({ user: userData, loading: false })
      } else {
        set({ user: null, loading: false })
      }
    } catch (error: any) {
      console.error('Auth check error:', error)
      set({ user: null, loading: false })
    }
  },
}))
