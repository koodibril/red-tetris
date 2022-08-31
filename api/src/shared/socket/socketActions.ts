import { Server, Socket } from "socket.io";
import { Game } from "../classes/Game";
import { Piece } from "../classes/Piece";
import { Player } from "../classes/Player";
import { SocketData } from "./socket.d";

export const joinRoom = (io: Server, socket: Socket, payload: SocketData, rooms: Game[]) => {
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
    room.addPlayer(new Player(socket.id, payload.name));
    const players = room.getPlayers();
    const sockets = io.sockets.adapter.rooms.get(room.getRoomName());
    if (sockets) {
      players.forEach((player) => {
        const id = player.getId();
        if (!sockets.has(id)) {
          room.removePlayer(player);
        } else {
          io.to(id).emit("position", room.getPosition(id));
        }
      });
    }
    io.to(room.getAdmin().getId()).emit("admin");
  } else {
    console.log(
      `Creating new room for player ${payload.name} => ${payload.room}`
    );
    rooms.push(new Game(payload.room, socket.id, payload.name));
    socket.emit("admin");
  }
};

export const startGame = (io: Server, socket: Socket, payload: SocketData, rooms: Game[]) => {
  console.log(`Adding 5 tetraminos in room ${payload.room}`);
  const newTetra = new Piece();
  const room = rooms.find((el) => el.getRoomName() === payload.room);
  if (room) {
    room.setTetraminos(newTetra);
    const nextTetra = [];
    for (let i = 0; i < 4; i++) {
      const tetra = new Piece();
      room.setTetraminos(tetra);
      nextTetra.push(tetra.getTetraminos());
    }
    io.to(room.getRoomName()).emit("nextTetra", nextTetra);
    room.setStatus("Playing");
    io.to(room.getRoomName()).emit("newTetra", newTetra.getTetraminos());
  }
};

export const endTetra = (io: Server, socket: Socket, payload: SocketData, rooms: Game[]) => {
    const room = rooms.find((el) => el.getRoomName() === payload.room);
    const player = room?.getPlayer(socket.id);
    if (
      player &&
      room &&
      player.getTetra() === room.getTetraminos().length - 5
    ) {
      console.log(`Server is falling back, adding tetra`);
      const newTetra = new Piece();
      room.setTetraminos(newTetra);
    }
    if (player && room) {
      console.log(`Player ${payload.name} advance on next tetra`);
      if (payload.grid) {
        player.setShadow(payload.grid);
      }
      player.setTetra(player.getTetra() + 1);
      socket.emit(
        "newTetra",
        room.getTetraminos()[player.getTetra()].getTetraminos()
      );
      const nextTetra = [];
      for (let i = 1; i < 5; i++) {
        nextTetra.push(
          room.getTetraminos()[player.getTetra() + i].getTetraminos()
        );
      }
      socket.broadcast
        .to(room.getRoomName())
        .emit("oponents", room.getOponents());
      socket.emit("nextTetra", nextTetra);
      socket.emit("position", room.getPosition(socket.id));
    }
  };

export const newLine = (io: Server, socket: Socket, lines: number, rooms: Game[]) => {
    const room = rooms.find((room) => room.getPlayer(socket.id));
    console.log(
      `${room?.getPlayer(socket.id)?.getName()} completed ${lines} lines !`
    );
    if (room) {
      room.getPlayer(socket.id)?.setScore(lines);
      if (lines - 1 > 0) {
        io.to(room.getRoomName()).emit(
          "info",
          `Player ${room
            .getPlayer(socket.id)
            ?.getName()} gift everyone a malus !`
        );
        socket.broadcast.to(room.getRoomName()).emit("newline", lines - 1);
      }
    }
  };

export const gameOver = (io: Server, socket: Socket, payload: SocketData, rooms: Game[]) => {
  const room = rooms.find((el) => el.getRoomName() === payload.room);
  if (room && room.getStatus() === "Playing") {
    room.getPlayer(socket.id)?.setStatus("Game Over");
    room.getPlayer(socket.id)?.setShadow(payload.grid);
    socket.broadcast
      .to(room.getRoomName())
      .emit("oponents", room.getOponents());
    const winner = room.checkWinner();
    if (winner) {
      winner.setStatus("Winner");
      io.to(room.getRoomName()).emit(
        "info",
        `Player ${winner.getName()} win the game !`
      );
      socket.broadcast
        .to(room.getRoomName())
        .emit("oponents", room.getOponents());
      room.setStatus("Waiting");
      room.resetTetraminos();
      io.to(room.getAdmin().getId()).emit("admin");
      io.to(winner.getId()).emit("winner");
      room.getPlayers().forEach((player) => {
        player.setTetra(0);
        player.setScore(0);
        player.setShadow(undefined);
      });
    } else if (!winner && room.getPlayers().length === 1) {
      room.setStatus("Waiting");
      console.log(room.getPlayers()[0]);
      room.resetTetraminos();
      io.to(room.getAdmin().getId()).emit("admin");
      room.getPlayers().forEach((player) => {
        player.setTetra(0);
        player.setScore(0);
        player.setShadow(undefined);
      });
      console.log(room.getPlayers()[0]);
    } else {
      socket.broadcast
        .to(room.getRoomName())
        .emit("oponents", room.getOponents());
    }
    io.to(room.getRoomName()).emit(
      "info",
      `Player ${payload.name} loose the game !`
    );
  }
};

export const leaveRoom = (io: Server, socket: Socket, rooms: Game[]) => {
  console.log(`Player leave the room`);
  rooms.forEach((room, index) => {
    const player = room.getPlayer(socket.id);
    if (player) {
      if (room.getPlayers().length === 1) {
        delete rooms[index];
        rooms.splice(index, 1);
      } else {
        gameOver(io, socket, {
          name: player.getName(),
          room: room.getRoomName(),
          tetraminos: undefined,
        }, rooms);
        room.removePlayer(player);
        io.to(room.getAdmin().getId()).emit("admin");
        const players = room.getPlayers();
        players.forEach((player) => {
          const id = player.getId();
          io.to(id).emit("position", room.getPosition(id));
        });
      }
    }
  });
};