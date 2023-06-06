import styled from 'styled-components';
import { TETROMINOS } from '../../utils/tetrominos';

type Props = {
  type: keyof typeof TETROMINOS;
};

export const StyledCell = styled.div<Props>`
  width: auto;
  background: rgba(158,173,134);
  border: ${props => (props.type === 0 ? '1px solid rgba(135,147,114)' : '1px solid rgba(0,0,0)')};
  display: flex;
  justify-content: center;
  align-items: center;
  ::after {
        content: " ";
        background-color: ${props => (props.type === 0 ? 'rgba(135,147,114)' : 'rgba(0,0,0)' )};
        width: 80%;
        height: 80%
     }
`;