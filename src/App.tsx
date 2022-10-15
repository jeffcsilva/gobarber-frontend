import React from 'react'

import SignIn from './pages/SignIn'
// import SignUp from './pages/SignUp'
import GlobalStyle from './styles/global'

import ToastContainer from './components/ToastContainer'
import { AuthProvider } from './hooks/AuthContext'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <ToastContainer />
      <AuthProvider>
        <SignIn />
      </AuthProvider>
    </>
  )
}

export default App
