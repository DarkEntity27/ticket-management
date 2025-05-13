import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/me')
      if (data.success) {
        setUser(data.user)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    const { data } = await axios.post('/api/v1/auth/login', credentials)
    if (data.success) {
      setUser(data.user)
    }
    return data
  }

  const register = async (userData) => {
    const { data } = await axios.post('/api/v1/auth/register', userData)
    if (data.success) {
      setUser(data.user)
    }
    return data
  }

  const logout = async () => {
    const { data } = await axios.post('/api/v1/auth/logout')
    if (data.success) {
      setUser(null)
    }
    return data
  }

  const updateProfile = async (userData) => {
    const { data } = await axios.put('/api/v1/auth/update-profile', userData)
    if (data.success) {
      setUser(data.user)
    }
    return data
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}