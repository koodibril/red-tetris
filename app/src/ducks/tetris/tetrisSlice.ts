import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cell } from "../../Home/components/Grid/Grid.d";
import { Tetraminos } from "../../Home/components/Tetraminos/Tetraminos.d";

export interface Oponent {
  status: string;
  shadow: Cell[][] | undefined;
  id: string;
  name: string;
}

export interface TetrisState {
  gameStatus: "Winner" | "Waiting" | "Game Over" | "Playing";
  tetra: Tetraminos | undefined;
  score: number;
  info: string[];
  admin: boolean;
  nextTetra: Tetraminos[] | undefined;
  position: [number, number];
  merge: Cell[][] | undefined;
  room: string;
  name: string;
  oponents: Oponent[] | undefined;
}

const initialState: TetrisState = {
  gameStatus: "Waiting",
  tetra: undefined,
  score: 0,
  info: [],
  admin: false,
  nextTetra: undefined,
  position: [1, 1],
  merge: undefined,
  room: "",
  name: "",
  oponents: undefined,
};

export const tetrisSlice = createSlice({
  name: "Tetris",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<TetrisState["gameStatus"]>) => {
      state.gameStatus = action.payload;
    },
    setTetra: (state, action: PayloadAction<TetrisState["tetra"]>) => {
      state.tetra = action.payload;
      if (state.gameStatus !== "Playing") {
        state.gameStatus = "Playing";
      }
    },
    setRoom: (state, action: PayloadAction<TetrisState["room"]>) => {
      state.room = action.payload;
    },
    setName: (state, action: PayloadAction<TetrisState["name"]>) => {
      state.name = action.payload;
    },
    clearTetra: (state) => {
      state.tetra = initialState.tetra;
    },
    setMalus: (state, action: PayloadAction<number>) => {
      const merge = state.merge;
      const lines = action.payload;
      if (merge) {
        for (let i = 0; i < lines; i++) {
          const newLine = [];
          for (let j = 0; j < 12; j++) {
            newLine.push({ value: 1, color: "grey" });
          }
          merge.push(newLine);
          merge.splice(1, 1);
        }
      }
    },
    setScore: (state, action: PayloadAction<TetrisState["score"]>) => {
      state.score = action.payload;
    },
    setInfo: (state, action: PayloadAction<string>) => {
      state.info.push(action.payload);
    },
    setAdmin: (state, action: PayloadAction<TetrisState["admin"]>) => {
      state.admin = action.payload;
    },
    setNextTetra: (state, action: PayloadAction<TetrisState["nextTetra"]>) => {
      state.nextTetra = action.payload;
    },
    setPosition: (state, action: PayloadAction<TetrisState["position"]>) => {
      state.position = action.payload;
    },
    setMerge: (state, action: PayloadAction<TetrisState["merge"]>) => {
      state.merge = action.payload;
    },
    setOponents: (state, action: PayloadAction<TetrisState["oponents"]>) => {
      state.oponents = action.payload;
    },
  },
});

export const {
  setAdmin,
  setInfo,
  setMalus,
  setNextTetra,
  setPosition,
  setScore,
  setStatus,
  setTetra,
  clearTetra,
  setMerge,
  setRoom,
  setName,
  setOponents,
} = tetrisSlice.actions;
export default tetrisSlice.reducer;
