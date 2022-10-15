import React, { createContext, useContext, useCallback, useState } from 'react'

import ToastContainer from '../components/ToastContainer'

export interface IToastMessage {
  id: string
  type?: 'success' | 'error' | 'info'
  title: string
  description?: string
}

interface IToastProviderData {
  addToast(message: Omit<IToastMessage, 'id'>): void
  removeToast(id: string): void
}

interface IToastProvider {
  children: React.ReactNode
}

const ToastContext = createContext<IToastProviderData>({} as IToastProviderData)

const ToastProvider: React.FC<IToastProvider> = ({ children }) => {
  const [messages, setMessages] = useState<IToastMessage[]>([])

  const addToast = useCallback(
    ({ title, type, description }: Omit<IToastMessage, 'id'>) => {
      const id = String(messages.length + 1)

      const toast = {
        id,
        title,
        type,
        description,
      }

      setMessages(state => [...state, toast])
    },
    [messages],
  )
  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id))
  }, [])
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

function useToats(): IToastProviderData {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

export { ToastProvider, useToats }
