import React from 'react'
import { StyledButton } from './styles';

type Props = {
  bgColor: string;
  width: string;
  height: string;
  mediaWidth: string;
  mediaHeight: string;
  top: string;
  left: string;
  content: string;
  click: () => void;
}

const Button = (props: Props) => {

  return (
    <>
     <StyledButton
       bgColor = {props.bgColor}
       width = {props.width}
       height = {props.height}
       mediaWidth = {props.mediaWidth}
       mediaHeight = {props.mediaHeight}
       top = {props.top}
       left = {props.left}
       content = {props.content}
       onClick={props.click}
     />
     
    </>
  )
}

export default Button;