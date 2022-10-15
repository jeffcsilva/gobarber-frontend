import React from 'react'

import { AuthProvider } from './Auth'
import { ToastProvider } from './Toast'

interface IAppProvider {
  children: React.ReactNode
}

const AppProvider: React.FC<IAppProvider> = ({ children }) => (
  <AuthProvider>
    <ToastProvider>{children}</ToastProvider>
  </AuthProvider>
)

export default AppProvider
