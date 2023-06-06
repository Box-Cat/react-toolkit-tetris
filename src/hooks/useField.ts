import { useEffect, useState } from 'react';
import { drawField } from './../utils/field';
import type { PLAYER } from './usePlayer';
import type { DRAWFIELD, DRAWFIELDCELL } from './../utils/field';
import { FIELD_WIDTH, FIELD_HEIGHT, NEXT_WIDTH, NEXT_HEIGHT } from './../utils/field';

export const useField = (player: PLAYER, resetPlayer: () => void) => {
  const [field, setField] = useState(drawField(FIELD_WIDTH,FIELD_HEIGHT));
  const [nextField, setNextField] = useState(drawField(NEXT_WIDTH,NEXT_HEIGHT));
  const [rowsCleared, setRowsCleared] = useState(0);

  const sweepRows = (newField: DRAWFIELD): DRAWFIELD => {
    try {
      return newField.reduce((ack, row) => {
        // 0이 없으면 row 1줄이 완성 되었다는 뜻으로 삭제
        if (row.findIndex((cell) => cell[0] === 0) === -1) {
          setRowsCleared((prev) => prev + 1);
          // field 맨 앞에 빈 row 1줄 삽입
          ack.unshift(new Array(newField[0].length).fill([0, 'clear']) as DRAWFIELDCELL[]);
          return ack;
        }
        ack.push(row);
        return ack;
      }, [] as DRAWFIELD);
    } catch (error) {
      console.log(error);
      return newField;
    }
  };

  const updateField = (prevField: DRAWFIELD): DRAWFIELD => {
    //Field 비우기
    const newField = prevField.map(
      (row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)) as DRAWFIELDCELL[]
    );
  
    //블록 그리기     
    try {
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            const newY = y + player.pos.y;
            const newX = x + player.pos.x;
  
            if (newField[newY] && newField[newY][newX]) {
              newField[newY][newX] = [value, player.collided ? 'merged' : 'clear'];
            }
          }
        });
      });
  
      if (player.collided) {
        resetPlayer();
        return sweepRows(newField);
      }
    } catch (error) {
      console.log(error);
    }
  
    return newField;
  };

  const drawNextField = (prevField: DRAWFIELD): DRAWFIELD => {
    //Field 비우기
    const newField = prevField.map(
      (row) => row.map((cell) => (cell[1] === 'clear' ? [0, 'clear'] : cell)) as DRAWFIELDCELL[]
    );
  
    //블록 그리기     
    try {
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            if (newField[y+1] && newField[y+1][x+2]) {
              newField[y+1][x+2] = [value, player.collided ? 'merged' : 'clear'];
            }
          }
        });
      });
  
      if (player.collided) {
        resetPlayer();
        return sweepRows(newField);
      }
    } catch (error) {
      console.log(error);
    }
  
    return newField;
  };

  useEffect(() => {
    if (!player.pos) return;

    setRowsCleared(0);
    setField(prev => updateField(prev));
    setNextField(prev => drawNextField(prev));
}, 
 // eslint-disable-next-line react-hooks/exhaustive-deps
 [player.collided, player.pos?.x, player.pos?.y, player.tetromino]
 );

  return { field, setField, rowsCleared, nextField, setNextField};
}

