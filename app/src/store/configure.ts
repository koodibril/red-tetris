import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import message from "src/ducks/message/messageSlice";

export const store = configureStore({
  reducer: {
    message: message,
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
