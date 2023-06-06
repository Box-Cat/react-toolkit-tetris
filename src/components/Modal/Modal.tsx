import React from 'react'
import { StyledModal } from './styles'

type Message = {
  message: string
}

const Modal = (props: Message) => {
  return (
    <StyledModal>{props.message}</StyledModal>
  )
}

export default Modal