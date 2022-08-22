import { Server, Socket } from "socket.io";
import { SocketData } from "./socket.d";
import { tetraminos } from "./tetraminos";

export const sockets = (io: Server, socket: Socket) => {
  const newTetra = (payload: SocketData) => {
    console.log(payload);
    console.log("sending new tetraminos");
    socket.emit(
      "newTetra",
      tetraminos[Math.floor(Math.random() * (6 - 0)) + 0]
      // tetraminos[0]
    );
  };
  const joinRoom = (payload: string) => {
    socket.join(payload);
    console.log(io.sockets.adapter.rooms.get(payload));
  };
  socket.on("order:newTetra", newTetra);
  socket.on("order:join", joinRoom);
  socket.on("endTetra", newTetra);
  socket.on("start", newTetra);
};
