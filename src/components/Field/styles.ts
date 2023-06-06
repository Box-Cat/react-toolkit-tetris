import styled from 'styled-components';

type Props = {
    width: number;
    height: number;
  };

export const StyledField = styled.div<Props>`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: repeat(${props => props.width}, auto);
    grid-template-rows: repeat(${props => props.height}, auto);
`;

