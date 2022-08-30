import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "src/hooks/hooks";
import { AppDispatch, RootState } from "src/store/configure";
import {
  setTetra,
  clearTetra,
  TetrisState,
  setStatus,
  setScore,
  setPosition,
  setAdmin,
  setInfo,
  setMalus,
  setNextTetra,
  setMerge,
  setRoom,
  setName,
  setOponents,
} from "src/ducks/tetris/tetrisSlice";
import { Tetraminos } from "src/components/Home/components/Tetraminos/Tetraminos.d";
import { Socket } from "socket.io-client";
import { rotateCounterClockwise } from "src/utils/utils";
import { Cell } from "src/components/Home/components/Grid/Grid.d";

const listenToNewTetra = (socket: Socket) => (dispatch: AppDispatch) => {
  socket.on("newTetra", (tetra: Tetraminos) => {
    dispatch(setTetra(tetra));
  });
};

const listenToGameStatus = (socket: Socket) => (dispatch: AppDispatch) => {
  socket.on("winner", () => {
    dispatch(setStatus("Winner"));
  });
};

const listenToMalus = (socket: Socket) => (dispatch: AppDispatch) => {
  socket.on("newline", (lines: number) => {
    dispatch(setMalus(lines));
  });
};

const gameOver =
  (
    socket: Socket,
    room: string,
    name: string,
    tetra: Tetraminos,
    grid: Cell[][]
  ) =>
  (dispatch: AppDispatch) => {
    dispatch(setStatus("Game Over"));
    socket.emit("order:gameover", {
      room: room,
      name: name,
      tetraminos: tetra,
      grid: grid,
    });
  };

const listenToServer = (socket: Socket) => (dispatch: AppDispatch) => {
  socket.on("connect", () => {
    const room = window.location.href.split("/")[3].split("[")[0];
    if (!room) {
      socket.on("room", (roomId: string) => {
        dispatch(setRoom(roomId));
      });
    } else {
      dispatch(setRoom(room));
    }
  });
};

const joinRoom =
  (socket: Socket, room: string, name: string) => (dispatch: AppDispatch) => {
    socket.emit("order:join", {
      room: room,
      name: name,
      tetraminos: undefined,
    });
    dispatch(setName(name));
  };

const endTetra =
  (
    socket: Socket,
    room: string,
    name: string,
    tetra: Tetraminos,
    grid: Cell[][]
  ) =>
  (dispatch: AppDispatch) => {
    socket.emit("endTetra", {
      room: room,
      name: name,
      tetraminos: tetra,
      grid: grid,
    });
    dispatch(setTetra(undefined));
  };

const listenToInfo = (socket: Socket) => (dispatch: AppDispatch) => {
  socket.on("info", (payload: string) => {
    dispatch(setInfo(payload));
  });
};

const listenToAdmin = (socket: Socket) => (dispatch: AppDispatch) => {
  socket.on("admin", () => {
    dispatch(setAdmin(true));
  });
};

const listenToNextTetra = (socket: Socket) => (dispatch: AppDispatch) => {
  socket.on("nextTetra", (tetras: Tetraminos[]) => {
    tetras.map((tetra) => {
      tetra.shape = rotateCounterClockwise(tetra.shape);
      return tetra;
    });
    dispatch(setNextTetra(tetras));
  });
};

const listenToPosition = (socket: Socket) => (dispatch: AppDispatch) => {
  socket.on("position", (position: [number, number]) => {
    dispatch(setPosition(position));
  });
};

const listenToOponents = (socket: Socket) => (dispatch: AppDispatch) => {
  socket.on("oponents", (oponents: TetrisState["oponents"]) => {
    dispatch(setOponents(oponents));
  });
};

const addMalus = (socket: Socket, lines: number) => {
  socket.emit("order:newLine", lines);
};

const start =
  (socket: Socket, room: string, name: string) => (dispatch: AppDispatch) => {
    dispatch(setMerge(undefined));
    dispatch(setOponents(undefined));
    dispatch(setScore(0));
    socket.emit("order:start", {
      room: room,
      name: name,
      tetraminos: undefined,
    });
  };

export const useTetris = () =>
  useAppSelector((state: RootState) => state.tetris);

export const useTetrisActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(
    () => ({
      clearTetra: () => dispatch(clearTetra()),
      setTetra: (tetra: TetrisState["tetra"]) => dispatch(setTetra(tetra)),
      setGameStatus: (gameStatus: TetrisState["gameStatus"]) =>
        dispatch(setStatus(gameStatus)),
      setScore: (score: TetrisState["score"]) => dispatch(setScore(score)),
      setPosition: (position: TetrisState["position"]) =>
        dispatch(setPosition(position)),
      setAdmin: (admin: TetrisState["admin"]) => dispatch(setAdmin(admin)),
      setInfo: (info: string) => dispatch(setInfo(info)),
      setMalus: (malus: number) => dispatch(setMalus(malus)),
      setNextTetra: (nextTetra: TetrisState["nextTetra"]) =>
        dispatch(setNextTetra(nextTetra)),
      setMerge: (merge: TetrisState["merge"]) => dispatch(setMerge(merge)),
      listenToNewTetra: (socket: Socket) => dispatch(listenToNewTetra(socket)),
      listenToGameStatus: (socket: Socket) =>
        dispatch(listenToGameStatus(socket)),
      listenToMalus: (socket: Socket) => dispatch(listenToMalus(socket)),
      gameOver: (
        socket: Socket,
        room: string,
        name: string,
        tetra: Tetraminos,
        grid: Cell[][]
      ) => dispatch(gameOver(socket, room, name, tetra, grid)),
      listenToServer: (socket: Socket) => dispatch(listenToServer(socket)),
      joinRoom: (socket: Socket, room: string, name: string) =>
        dispatch(joinRoom(socket, room, name)),
      endTetra: (
        socket: Socket,
        room: string,
        name: string,
        tetra: Tetraminos,
        grid: Cell[][]
      ) => dispatch(endTetra(socket, room, name, tetra, grid)),
      listenToInfo: (socket: Socket) => dispatch(listenToInfo(socket)),
      listenToAdmin: (socket: Socket) => dispatch(listenToAdmin(socket)),
      listenToNextTetra: (socket: Socket) =>
        dispatch(listenToNextTetra(socket)),
      listenToPosition: (socket: Socket) => dispatch(listenToPosition(socket)),
      listenToOponents: (socket: Socket) => dispatch(listenToOponents(socket)),
      addMalus: (socket: Socket, lines: number) => addMalus(socket, lines),
      start: (socket: Socket, room: string, name: string) =>
        dispatch(start(socket, room, name)),
    }),
    [dispatch]
  );
};
