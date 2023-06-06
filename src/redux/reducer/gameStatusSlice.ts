import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type GameStatusType = {
  score: number;
  rows: number;
  level: number;
  sound: boolean;
};

const initialState: GameStatusType = {
  score: 0,
  rows: 0,
  level: 1,
  sound: true,
};

const gameStatusSlice = createSlice({
  name: "gameStatus",
  initialState,

  reducers: {
    SetScore: (state, action) => {
      state.score = action.payload;
    },
    SetRows: (state, action) => {
      state.rows = action.payload;
    },
    SetLevel: (state, action) => {
      state.level = action.payload;
    },
    SetSound: (state, action) => {
      state.sound = action.payload;
    },
    SetScoreZero: (state) => {
      state.score = initialState.score;
    },
    SetRowsZero: (state) => {
      state.rows = initialState.rows;
    },
    SetLevelOne: (state) => {
      state.level = initialState.level;
    },
  },
});

export const gameStatus = (state: RootState) => state.gameStatusReducer;
export const { SetScore, SetRows, SetLevel, SetSound, SetScoreZero, SetRowsZero, SetLevelOne } = gameStatusSlice.actions;
export default gameStatusSlice.reducer;

