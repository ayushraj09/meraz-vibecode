'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import toast from 'react-hot-toast'

interface User {
  id: string
  name: string
  email: string
  registeredEvents: string[]
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  signup: (name: string, email: string, password: string) => Promise<boolean>
  logout: () => void
  registerForEvent: (eventId: string) => void
  isRegisteredForEvent: (eventId: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('meraz_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [])

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('meraz_users') || '[]')
      const userExists = existingUsers.some((u: any) => u.email === email)

      if (userExists) {
        toast.error('User already exists with this email')
        return false
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        registeredEvents: [],
      }

      // Save user data
      const users = [...existingUsers, { ...newUser, password }]
      localStorage.setItem('meraz_users', JSON.stringify(users))
      localStorage.setItem('meraz_user', JSON.stringify(newUser))
      
      setUser(newUser)
      toast.success('Account created successfully!')
      return true
    } catch (error) {
      toast.error('Failed to create account')
      return false
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const users = JSON.parse(localStorage.getItem('meraz_users') || '[]')
      const foundUser = users.find((u: any) => u.email === email && u.password === password)

      if (!foundUser) {
        toast.error('Invalid email or password')
        return false
      }

      const { password: _, ...userWithoutPassword } = foundUser
      localStorage.setItem('meraz_user', JSON.stringify(userWithoutPassword))
      setUser(userWithoutPassword)
      toast.success('Welcome back!')
      return true
    } catch (error) {
      toast.error('Failed to login')
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem('meraz_user')
    setUser(null)
    toast.success('Logged out successfully')
  }

  const registerForEvent = (eventId: string) => {
    if (!user) {
      toast.error('Please login to register for events')
      return
    }

    const updatedUser = {
      ...user,
      registeredEvents: [...user.registeredEvents, eventId],
    }

    // Update in memory
    setUser(updatedUser)

    // Update in localStorage
    localStorage.setItem('meraz_user', JSON.stringify(updatedUser))

    // Update in users array
    const users = JSON.parse(localStorage.getItem('meraz_users') || '[]')
    const updatedUsers = users.map((u: any) =>
      u.id === user.id ? { ...u, registeredEvents: updatedUser.registeredEvents } : u
    )
    localStorage.setItem('meraz_users', JSON.stringify(updatedUsers))

    toast.success('Successfully registered for event!')
  }

  const isRegisteredForEvent = (eventId: string): boolean => {
    return user?.registeredEvents.includes(eventId) || false
  }

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, registerForEvent, isRegisteredForEvent }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
