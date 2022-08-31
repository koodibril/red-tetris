import { Server, Socket } from "socket.io";
import { Game } from "../classes/Game";
import { SocketData } from "./socket.d";
import { endTetra, gameOver, joinRoom, leaveRoom, newLine, startGame } from "./socketActions";

const rooms = <Game[]>[];

export const sockets = (io: Server, socket: Socket) => {
  socket.on("order:join", (payload: SocketData) => joinRoom(io, socket, payload, rooms));
  socket.on("order:start", (payload: SocketData) => startGame(io, socket, payload, rooms));
  socket.on("endTetra", (payload: SocketData) => endTetra(io, socket, payload, rooms));
  socket.on("order:newLine", (lines: number) => newLine(io, socket, lines, rooms));
  socket.on("order:gameover", (payload: SocketData) => gameOver(io, socket, payload, rooms));
  socket.on("disconnect", () => leaveRoom(io, socket, rooms));
};
