import React from 'react'

import SignIn from './pages/Signin'
import GlobalStyle from './styles/global'

const App: React.FC = () => {
  return (
    <>
      <GlobalStyle />
      <SignIn />
    </>
  )
}

export default App
