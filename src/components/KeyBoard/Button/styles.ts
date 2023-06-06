import styled from 'styled-components';

type Props = {
  bgColor: string;
  width: string;
  height: string;
  mediaWidth: string;
  mediaHeight: string;
  top: string;
  left: string;
  content: string;
  //onClick: ((keyCode: number) => void) | (() => void) | ((event: React.MouseEvent<HTMLButtonElement>) => void);
  onClick:() => void;
}

export const StyledButton = styled.button<Props>`
  position: absolute;
  width: ${props => props.width};
  height: ${props => props.height};
  top: ${props => props.top};
  left: ${props => props.left};
  border-radius: 50%;
  background-color: rgba(${props => props.bgColor});
  border: 6px solid rgba(33,33,36);
  font-size: 1.5rem;
  ::after{
    content: '${props => props.content}'; 
  }
  @media (max-width: 640px) {
    width:${props => props.mediaWidth};
    height: ${props => props.mediaHeight};
    font-size: 1em;
  }
`;
