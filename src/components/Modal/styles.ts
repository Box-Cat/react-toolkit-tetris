import styled from 'styled-components';


export const StyledModal = styled.div`
  background-color: rgba(158,173,134);
  position: absolute;
  text-align: center;
  line-height: 150%;
  width: 30%;
  height: 20px;
  padding: 1% 0px;
  font-size: 0.8em;
  @media screen and (max-width: 400px) {
    font-size: 0.5em;
  }
`;