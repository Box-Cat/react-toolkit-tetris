import { useState, useCallback, useEffect } from "react";
import { FIELD_WIDTH, isColliding } from "../utils/field";
import { randomTetromino } from "../utils/tetrominos";
import { FIELD } from "../utils/field";

export type PLAYER = {
  pos: {
    x: number;
    y: number;
  };
  tetromino: (string | number)[][];
  collided: boolean;
};

const initialPlayer: PLAYER = { pos: { x: 0, y: 0 }, tetromino: [], collided: false }

export const usePlayer = () => {
  const [player, setPlayer] = useState<PLAYER>(initialPlayer);
  const [nextPlayer, setNextPlayer] = useState<PLAYER>(initialPlayer);

  let tetrominoes:(string | number)[][][];

  const rotate = (matrix: PLAYER['tetromino']) => {
    // 행 => 열
    try {
      const mtrx = matrix.map((_, i) => matrix.map(column => column[i]));

      return mtrx.map(row => row.reverse());
    } catch (error) {
      console.log(error);
    }
  };

  const playerRotate = (field: FIELD): void => {
    try {
      const clonedPlayer = JSON.parse(JSON.stringify(player));
      clonedPlayer.tetromino = rotate(clonedPlayer.tetromino);

      // 블록이 벽 속에 들어 가거나, 다른 블록 속에 들어가는 것을 막는 코드
      const posX = clonedPlayer.pos.x;
      let offset = 1;
      while (isColliding(clonedPlayer, field, { x: 0, y: 0 })) {
        clonedPlayer.pos.x += offset;
        offset = -(offset + (offset > 0 ? 1 : -1));

        if (offset > clonedPlayer.tetromino[0].length) {
          clonedPlayer.pos.x = posX;
          return;
        }
      }
      setPlayer(clonedPlayer);
    } catch (error) {
      console.log(error);
    }
  };

  const updatePlayerPos = ({ x, y, collided }: { x: number; y: number; collided: boolean }): void => {
    try {
      setPlayer(prev => ({
        ...prev,
        pos: { x: (prev.pos.x += x / 2), y: (prev.pos.y += y / 2) },
        collided
      }));
      
    } catch (error) {
      console.log(error);
    }
  };

  const resetPlayer = useCallback((): void => {
    try {
      nextTetrominos(tetrominoes);
      setNextPlayer({
        pos: { x: FIELD_WIDTH / 2 - 2, y: 0 },
        tetromino: tetrominoes[1],
        collided: false
      });
      setPlayer({
        pos: { x: FIELD_WIDTH / 2 - 2, y: 0 },
        tetromino: tetrominoes[5],
        collided: false
      });



    } catch (error) {
      console.log(error);
    }
  }
   // eslint-disable-next-line react-hooks/exhaustive-deps
    , []
  );

  const nextTetrominos = (previous?:(string | number)[][][]) => {
    if (previous) {
      tetrominoes = [...previous];
      tetrominoes.unshift(randomTetromino().shape);
      tetrominoes.slice(0, 5);

    } else {
      tetrominoes = Array(5)
        .fill(0)
        .map((_) => randomTetromino().shape);
    }
  }

  useEffect(() => {
    nextTetrominos();
  }, 
  //eslint-disable-next-line react-hooks/exhaustive-deps
  [])

  return { player, updatePlayerPos, resetPlayer, playerRotate, nextPlayer };
}