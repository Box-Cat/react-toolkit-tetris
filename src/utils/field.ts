import { TETROMINOS } from "./tetrominos";
import { PLAYER } from "../hooks/usePlayer";

export const FIELD_WIDTH = 12;
export const FIELD_HEIGHT = 20;
export const NEXT_WIDTH = 6;
export const NEXT_HEIGHT = 6;

//CELL에서 사용
export type FIELDCELL = [keyof typeof TETROMINOS, string];
export type FIELD = FIELDCELL[][];

//useField에서 사용
export type DRAWFIELDCELL = [string | number, string];
export type DRAWFIELD = DRAWFIELDCELL[][];

export const drawField = (width:number, height:number) => Array.from(Array(height), () => Array(width).fill([0, 'clear']));

export const isColliding = (player: PLAYER, field: FIELD, { x: moveX, y: moveY }: { x: number; y: number }) => {
  try {
    for (let y = 0; y < player.tetromino.length; y += 1) {
      for (let x = 0; x < player.tetromino[y].length; x += 1) {
        // 1. 블록 안에 있는 지 체크
        if (player.tetromino[y][x] !== 0) {
          if (
            // 2.field height(y) 내부 여부
            !field[y + player.pos.y + moveY] ||
            // 3.field width(x) 내부 여부
            !field[y + player.pos.y + moveY][x + player.pos.x + moveX] ||
            // 4.속성 'clear'체크
            field[y + player.pos.y + moveY][x + player.pos.x + moveX][1] !== 'clear'
          ) {
            return true;
          }
        }
      }
    }

    // 1~4의 조건에 모두 해당되지 않으면, false
    return false;
  } catch (error) {
    console.log(error);
  }
};