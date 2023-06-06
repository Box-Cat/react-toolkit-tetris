import React from 'react';
import Container from './components/Container/Container';
import styled from 'styled-components';

export const StyledApp = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
 
  return (
    <StyledApp>
      <Container/>
    </StyledApp>
  );
}

export default App;
