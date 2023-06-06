import styled from 'styled-components';

export const StyledGameBody = styled.div`
  width: 640px;
  height: 100vh;
  border-radius: 30px;
  border-bottom-right-radius:100px;
  background-color: rgba(243, 199, 71);
  border: 8px solid rgba(207,161,4);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
   box-sizing: border-box;

   @media (max-width: 640px) {
    width: 100%;
    height: 100vh;
  }
   ::after {
    position: absolute;
    content: "";
    top: 1rem;
    width: 25%;
    height: 0.4rem;
    background-color: rgba(33,33,36);
    border-radius: 3px;
  }
`;

export const StyledScreenContainer = styled.div`
  width: 90%;
  height: 60%;
  background-color: rgba(158, 173, 134);
  border-radius: 30px;
  border: 8px solid rgba(33,33,36);
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;