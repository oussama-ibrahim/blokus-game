import { createSlice } from "@reduxjs/toolkit";
import shapes from "../../constant/shape";
import {
  displayShape,
  rotateShape,
  calculateScore,
} from "../../utils/gameLogique";
const greenShapes = shapes(11, 1);
const redShapes = shapes(12, 2);
const yellowShapes = shapes(13, 3);
const blueShapes = shapes(14, 4);
const initialState = {
  players: [
    {
      playerId: 1,
      shapes: [...greenShapes],
      selectedShape: 0,
      corner: 11,
      point: 1,
      score: 0,
      isStillPlaying: true,
    },
    {
      playerId: 2,
      shapes: [...redShapes],
      selectedShape: 0,
      corner: 12,
      point: 2,
      score: 0,
      isStillPlaying: true,
    },
    {
      playerId: 3,
      shapes: [...yellowShapes],
      selectedShape: 0,
      corner: 13,
      point: 3,
      score: 0,
      isStillPlaying: true,
    },
    {
      playerId: 4,
      shapes: [...blueShapes],
      selectedShape: 0,
      corner: 14,
      point: 4,
      score: 0,
      isStillPlaying: true,
    },
  ],
};
const playerSlice = createSlice({
  name: "greenPlayerShapes",
  initialState,
  reducers: {
    selectShapeReducer: (state, action) => {
      const newState = { ...state };
      const { playerId, selectedShape } = action.payload;
      newState.players[playerId - 1].selectedShape = selectedShape;
      state = newState;
    },

    displayShapeReducer: (state, action) => {
      const newState = { ...state };
      const { playerId, selectedShape } = action.payload;
      const updatedState = displayShape(newState, selectedShape, playerId);
      newState.players[playerId - 1].selectedShape = 0;
      state = updatedState;
    },
    rotateShapeReducer: (state, action) => {
      const newState = { ...state };
      const { rotate, selectedShape, playerId } = action.payload;
      const updatedState = rotateShape(
        newState,
        selectedShape,
        rotate,
        playerId
      );
      state = updatedState;
    },
    calculateScoreReducer: (state, action) => {
      const playerId = action.payload.playerId;
      const player = state.players[playerId - 1];
      const updatedPlayer = calculateScore(player);
      state.players[playerId - 1] = updatedPlayer;
    },
    quiteGameReducer: (state, action) => {
      const { playerId } = action.payload;
      const player = state.players[playerId - 1];
      player.isStillPlaying = false;
      state.players[playerId - 1] = player;
    },
    resetGameInitialSate: (state, action) => {
      let newState = state;
      newState.players = initialState.players;

      state = newState;
    },
  },
});
export const {
  selectShapeReducer,
  displayShapeReducer,
  rotateShapeReducer,
  calculateScoreReducer,
  quiteGameReducer,
  resetGameInitialSate,
} = playerSlice.actions;

export default playerSlice.reducer;
