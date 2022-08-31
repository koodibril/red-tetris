import { configureStore, ThunkAction, Action, combineReducers, PreloadedState } from "@reduxjs/toolkit";
import tetris from "../ducks/tetris/tetrisSlice";

// export const store = configureStore({
//   reducer: {
//     tetris: tetris,
//   },
// });

// export type AppDispatch = typeof store.dispatch;
// export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;


// Create the root reducer separately so we can extract the RootState type
const rootReducer = combineReducers({
  tetris: tetris
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
} 

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']