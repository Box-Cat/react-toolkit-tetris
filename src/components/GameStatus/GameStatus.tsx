import React from 'react'
import { StyledGameStatus, StyledText } from './styles' 
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store';
import { GameStatusType } from '../../redux/reducer/gameStatusSlice'; 

const GameStatus = () => {
  const { score, rows, level, sound } = useSelector((state: RootState) => state.gameStatusReducer) as GameStatusType;

  return (
    <StyledGameStatus>
      <StyledText>Score:<br/> {score}</StyledText>
      <StyledText>Rows:<br/> {rows}</StyledText>
      <StyledText>Level:<br/> {level}</StyledText>
      {!sound
      ?<StyledText><i className="ri-volume-up-fill" style={{fontSize: "1.5em"}}></i></StyledText>
      :<StyledText><i className="ri-volume-off-vibrate-fill" style={{fontSize: "1.5em"}}></i></StyledText>}
    </StyledGameStatus>
  )
}

export default GameStatus;