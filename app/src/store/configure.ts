import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import message from "src/ducks/message/messageSlice";
import tetris from "src/ducks/tetris/tetrisSlice";

export const store = configureStore({
  reducer: {
    message: message,
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
