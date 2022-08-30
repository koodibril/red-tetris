import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import tetris from "../ducks/tetris/tetrisSlice";

export const store = configureStore({
  reducer: {
    tetris: tetris,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
