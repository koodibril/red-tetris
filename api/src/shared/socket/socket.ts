import { Server, Socket } from "socket.io";
import { SocketData } from "./socket.d";
import { tetraminos } from "./tetraminos";

export const sockets = (io: Server, socket: Socket) => {
  const update = function (payload: SocketData) {
    console.log(payload);
    console.log("user updated");
  };
  const disconnect = function (reason: string) {
    console.log(reason);
    console.log("user disconnected");
  };
  const logout = function (payload: SocketData) {
    console.log(payload);
    console.log("user logged out");
  };
  const newTetra = (payload: SocketData) => {
    console.log(payload);
    console.log("sending new tetraminos");
    socket.emit(
      "newTetra",
      tetraminos[Math.floor(Math.random() * (6 - 0)) + 0]
      // tetraminos[0]
    );
  };
  socket.on("order:update", update);
  socket.on("order:newTetra", newTetra);
  socket.on("endTetra", newTetra);
  socket.on("disconnect", disconnect);
  socket.on("logout", logout);
};
