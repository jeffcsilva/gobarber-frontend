import React from 'react'

import { IToastMessage } from '../../hooks/Toast'

import Toast from './Toast'

import { Container } from './styles'

interface IToastContainer {
  messages: IToastMessage[]
}

const ToastContainer: React.FC<IToastContainer> = ({ messages }) => {
  return (
    <Container>
      {messages.map((message: IToastMessage) => (
        <Toast message={message} />
      ))}
    </Container>
  )
}

export default ToastContainer
