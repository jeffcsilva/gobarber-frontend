import React, { createContext, useCallback, useState, useContext } from 'react'
import api from '../services/api'

interface AuthState {
  token: string
  user: object
}

interface ICredentials {
  email: string
  password: string
}

interface IAuthContext {
  user: object
  signIn(credentials: ICredentials): Promise<void>
  signOut(): void
}

interface IAuthProvider {
  children: React.ReactNode
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext)

const AuthProvider: React.FC<IAuthProvider> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@GoBarber:token')
    const user = localStorage.getItem('@GoBarber:user')

    if (token && user) {
      return { token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }: ICredentials) => {
    const response = await api.post('/sessions', {
      email,
      password,
    })

    const { token, user } = response.data

    localStorage.setItem('@GoBarber:token', token)
    localStorage.setItem('@GoBarber:user', JSON.stringify(user))

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@GoBarber:token')
    localStorage.removeItem('@GoBarber:user')

    setData({} as AuthState)
  }, [])

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth(): IAuthContext {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
