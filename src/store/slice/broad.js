import { createSlice } from '@reduxjs/toolkit';
import broad from "../../constant/broad";
import { addSquireToGrid } from "../../utils/gameLogique";
const initialState = {
  broad: [...broad],
  isShapePlaced: false,
  currentPlayer: 1,
};
const broadSlice = createSlice({
  name: "broad",
  initialState,
  reducers: {
    addShapeToGrid: (state, action) => {
      const newState = state;
      const { shape, shapeLength, clickPostion, playerAttributes } =
        action.payload;
      const newGrid = addSquireToGrid(
        shape,
        shapeLength,
        clickPostion,
        newState,
        playerAttributes
      );
      state = newGrid;
    },
    resetIsShapePlaced: (state, action) => {
      const newState = state;
      newState.isShapePlaced = false;
      state = newState;
    },
    nextPlayer: (state, action) => {
      const newState = state;

      if (newState.currentPlayer === 4) {
        newState.currentPlayer = 0;
      }

      newState.currentPlayer = newState.currentPlayer + 1;
      state = newState;
    },
    resetBroadInitialSate: (state, action) => {
      let newState = state;
      newState.broad = initialState.broad;
      newState.currentPlayer = initialState.currentPlayer;
      state = newState;
    },
  },
});
export const {
  addShapeToGrid,
  resetIsShapePlaced,
  nextPlayer,
  resetBroadInitialSate,
} = broadSlice.actions;

export default broadSlice.reducer;
