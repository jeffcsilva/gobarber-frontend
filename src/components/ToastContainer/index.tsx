import React from 'react'
import { useTransition } from 'react-spring'

import { IToastMessage } from '../../hooks/Toast'

import Toast from './Toast'

import { Container } from './styles'

interface IToastContainer {
  messages: IToastMessage[]
}

const ToastContainer: React.FC<IToastContainer> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: { right: '-120%', opacity: 0 },
      enter: { right: '0%', opacity: 1 },
      leave: { right: '-120%', opacity: 0 },
    },
  )

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast key={key} style={props} message={item} />
      ))}
    </Container>
  )
}

export default ToastContainer
