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
        // Try to fetch user data, but don't fail if it doesn't exist
        try {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.user.id)

          if (userError) {
            console.warn('User data fetch error:', userError)
            // Create a basic user object from auth data
            set({ 
              user: {
                id: data.user.id,
                email: data.user.email,
                full_name: data.user.user_metadata?.full_name || 'User',
                role: 'student'
              } as User, 
              loading: false 
            })
          } else if (userData && userData.length > 0) {
            set({ user: userData[0], loading: false })
          } else {
            // User exists in auth but not in users table
            set({ 
              user: {
                id: data.user.id,
                email: data.user.email,
                full_name: data.user.user_metadata?.full_name || 'User',
                role: 'student'
              } as User, 
              loading: false 
            })
          }
        } catch (tableError) {
          console.error('Error fetching user from table:', tableError)
          // Still set user from auth data
          set({ 
            user: {
              id: data.user.id,
              email: data.user.email,
              full_name: data.user.user_metadata?.full_name || 'User',
              role: 'student'
            } as User, 
            loading: false 
          })
        }
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
          },
        },
      })

      if (error) throw error

      if (data.user) {
        // Try to insert user record, but don't fail if table doesn't exist
        try {
          const { error: insertError } = await supabase.from('users').insert([
            {
              id: data.user.id,
              email,
              full_name: fullName,
              role: 'student',
            },
          ])

          if (insertError) {
            console.warn('User insert error:', insertError)
          }
        } catch (tableError) {
          console.warn('Error inserting user into table:', tableError)
        }

        set({ loading: false })
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
        try {
          const { data: userData, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', data.session.user.id)

          if (userError) {
            console.warn('User data fetch error:', userError)
            set({ 
              user: {
                id: data.session.user.id,
                email: data.session.user.email,
                full_name: data.session.user.user_metadata?.full_name || 'User',
                role: 'student'
              } as User, 
              loading: false 
            })
          } else if (userData && userData.length > 0) {
            set({ user: userData[0], loading: false })
          } else {
            set({ 
              user: {
                id: data.session.user.id,
                email: data.session.user.email,
                full_name: data.session.user.user_metadata?.full_name || 'User',
                role: 'student'
              } as User, 
              loading: false 
            })
          }
        } catch (tableError) {
          console.warn('Error checking user table:', tableError)
          set({ 
            user: {
              id: data.session.user.id,
              email: data.session.user.email,
              full_name: data.session.user.user_metadata?.full_name || 'User',
              role: 'student'
            } as User, 
            loading: false 
          })
        }
      } else {
        set({ user: null, loading: false })
      }
    } catch (error: any) {
      console.error('Auth check error:', error)
      set({ error: error.message, loading: false })
    }
  },
}))
