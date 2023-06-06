import { useState, useEffect } from 'react';
import { ROWPOINTS } from '../utils/tetrominos';
import { useSelector } from 'react-redux'

export const useGameStatus = (rowsCleared: number) => {
  const { level } = useSelector((state : any)=>state.gameStatusReducer);
  const [levelTmp, setLevelTmp] = useState(1); 

  const [scoreTmp, setScoreTmp] = useState(0);
  const [rowsTmp, setRowsTmp] = useState(0);

  useEffect(() => {
    if (rowsCleared > 0) {
      setScoreTmp(prev => prev + ROWPOINTS[rowsCleared/2 - 1] * level);
      setRowsTmp(prev => prev + rowsCleared/2);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps  
  }, [rowsCleared]);

  return { scoreTmp, setScoreTmp, rowsTmp, setRowsTmp, levelTmp, setLevelTmp };
};