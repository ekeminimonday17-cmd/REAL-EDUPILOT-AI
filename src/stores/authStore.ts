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
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single()

        if (userError) throw userError

        set({ user: userData, loading: false })
      }
    } catch (error: any) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  register: async (email: string, password: string, fullName: string) => {
    set({ loading: true, error: null })
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) throw error

      if (data.user) {
        const { error: insertError } = await supabase.from('users').insert([
          {
            id: data.user.id,
            email,
            full_name: fullName,
            role: 'student',
          },
        ])

        if (insertError) throw insertError

        set({ loading: false })
      }
    } catch (error: any) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  logout: async () => {
    set({ loading: true })
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      set({ user: null, loading: false })
    } catch (error: any) {
      set({ error: error.message, loading: false })
      throw error
    }
  },

  checkAuth: async () => {
    set({ loading: true })
    try {
      const { data, error } = await supabase.auth.getSession()
      if (error) throw error

      if (data.session?.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.session.user.id)
          .single()

        if (userError && userError.code !== 'PGRST116') throw userError

        set({ user: userData || null, loading: false })
      } else {
        set({ user: null, loading: false })
      }
    } catch (error: any) {
      set({ error: error.message, loading: false })
    }
  },
}))
