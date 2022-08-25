import { Server, Socket } from "socket.io";
import { Game } from "../classes/Game";
import { Piece } from "../classes/Piece";
import { Player } from "../classes/Player";
import { SocketData } from "./socket.d";

const rooms = <Game[]>[];

export const sockets = (io: Server, socket: Socket) => {
  const newTetra = (payload: SocketData) => {
    console.log(
      `Adding new tetraminos for player ${payload.name} in room ${payload.room}`
    );
    const newTetra = new Piece();
    const room = rooms.find((el) => el.getRoomName() === payload.room);
    room?.setTetraminos(newTetra);
    const player = room?.getPlayer(socket.id);
    if (player) player.setTetra(player.getTetra() + 1);
    socket.emit("newTetra", newTetra.getTetraminos());
  };
  const endTetra = (payload: SocketData) => {
    const room = rooms.find((el) => el.getRoomName() === payload.room);
    const player = room?.getPlayer(socket.id);
    if (
      player &&
      room &&
      player.getTetra() === room.getTetraminos().length - 1
    ) {
      console.log(
        `Player ${payload.name} is first in line ! Creating new tetra for him`
      );
      newTetra(payload);
    } else if (player && room) {
      console.log(`Player ${payload.name} advance on next tetra`);
      player.setTetra(player.getTetra() + 1);
      socket.emit(
        "newTetra",
        room.getTetraminos()[player.getTetra()].getTetraminos()
      );
    }
  };
  const newLine = () => {
    const room = rooms.find((room) => room.getPlayer(socket.id));
    console.log(
      `${room?.getPlayer(socket.id)?.getName()} completed one line !`
    );
    if (room) {
      io.to(room.getRoomName()).emit(
        "info",
        `Player ${room.getPlayer(socket.id)?.getName()} gift everyone a malus !`
      );
      socket.broadcast.to(room.getRoomName()).emit("newline");
    }
  };
  const startGame = (payload: SocketData) => {
    console.log(`Adding first tetraminos in room ${payload.room}`);
    const newTetra = new Piece();
    const room = rooms.find((el) => el.getRoomName() === payload.room);
    if (room) {
      room.setStatus("Playing");
      room.setTetraminos(newTetra);
      io.to(room.getRoomName()).emit("newTetra", newTetra.getTetraminos());
    }
  };
  const gameOver = (payload: SocketData) => {
    const room = rooms.find((el) => el.getRoomName() === payload.room);
    if (room && room.getStatus() === "Playing") {
      room.getPlayer(socket.id)?.setStatus("GameOver");
      const winner = room.checkWinner();
      if (winner) {
        io.to(room.getRoomName()).emit(
          "info",
          `Player ${winner.getName()} win the game !`
        );
        room.setStatus("Waiting");
        socket.to(winner.getId()).emit("winner");
      }
      io.to(room.getRoomName()).emit(
        "info",
        `Player ${payload.name} loose the game !`
      );
    }
  };
  const joinRoom = (payload: SocketData) => {
    socket.join(payload.room);
    const room = rooms.find((el) => el.getRoomName() === payload.room);
    if (room) {
      console.log(
        `Adding player ${payload.name} as ${
          socket.id
        } in room ${room.getRoomName()}`
      );
      io.to(room.getRoomName()).emit(
        "info",
        `Player ${payload.name} join the game !`
      );
      const players = room.getPlayers();
      const sockets = io.sockets.adapter.rooms.get(room.getRoomName());
      if (sockets) {
        players.forEach((player) => {
          const id = player.getId();
          if (!sockets.has(id)) {
            room.removePlayer(player);
          }
        });
      }
      room.addPlayer(new Player(socket.id, payload.name));
    } else {
      console.log(
        `Creating new room for player ${payload.name} => ${payload.room}`
      );
      rooms.push(new Game(payload.room, socket.id, payload.name));
    }
  };
  const leaveRoom = () => {
    console.log(`Player leave the room`);
    rooms.forEach((room) => {
      const player = room.getPlayer(socket.id);
      if (player) {
        gameOver({
          name: player.getName(),
          room: room.getRoomName(),
          tetraminos: undefined,
        });
      }
    });
  };

  socket.on("order:newTetra", newTetra);
  socket.on("order:join", joinRoom);
  socket.on("order:newLine", newLine);
  socket.on("order:start", startGame);
  socket.on("order:gameover", gameOver);
  socket.on("endTetra", endTetra);
  socket.on("disconnect", leaveRoom);
};
