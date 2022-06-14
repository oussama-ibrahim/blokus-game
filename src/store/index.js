import { configureStore } from "@reduxjs/toolkit";

import brodReducer from "./slice/broad";
import playerReducer from "./slice/player.js";
import modalReducer from "./slice/modal";

export const store = configureStore({
  reducer: {
    broad: brodReducer,
    player: playerReducer,
    modal: modalReducer,
  },
});
