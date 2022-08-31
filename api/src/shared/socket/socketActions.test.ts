import { Game } from "../classes/Game";
import { SocketData } from "./socket.d";
import { AddressInfo } from "net";
import {
  endTetra,
  gameOver,
  joinRoom,
  leaveRoom,
  newLine,
  startGame,
} from "./socketActions";
import { Server } from "socket.io";
import http from "http";
import Client from "socket.io-client";

const payloadMock = <SocketData>{
  room: "test",
  name: "test",
  tetraminos: undefined,
  grid: [],
};

describe("red-tetris", () => {
  let io: any, serverSocket: any, clientSocket: any;

  beforeAll((done) => {
    const httpServer = http.createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const { port } = httpServer.address() as AddressInfo;
      clientSocket = new (Client as any)(`http://localhost:${port}`);
      io.on("connection", (socket: any) => {
        serverSocket = socket;
      });
      clientSocket.on("connect", done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  const rooms = <Game[]>[];

  test("join", (done) => {
    serverSocket.once("order:join", (payload: SocketData) => {
      joinRoom(io, serverSocket, payload, rooms);
      expect(rooms.length).toBe(1);
      expect(rooms[0].getPlayer(serverSocket.id)?.getName()).toBe("test");
      expect(rooms[0].getAdmin().getId()).toBe(serverSocket.id);
      done();
    });
    clientSocket.emit("order:join", payloadMock);
  });

  test("startGame", (done) => {
    serverSocket.once("order:start", (payload: SocketData) => {
      startGame(io, serverSocket, payload, rooms);
      expect(rooms[0].getTetraminos().length).toBe(5);
      expect(rooms[0].getStatus()).toBe("Playing");
      done();
    });
    clientSocket.emit("order:start", payloadMock);
  });

  test("endTetra", (done) => {
    serverSocket.once("endTetra", (payload: SocketData) => {
      endTetra(io, serverSocket, payload, rooms);
      expect(rooms[0].getTetraminos().length).toBe(6);
      expect(rooms[0].getPlayer(serverSocket.id)?.getTetra()).toBe(1);
      done();
    });
    clientSocket.emit("endTetra", payloadMock);
  });

  test("newLine", (done) => {
    serverSocket.once("order:newLine", (payload: number) => {
      newLine(io, serverSocket, payload, rooms);
      expect(rooms[0].getPlayer(serverSocket.id)?.getScore()).toBe(100);
      done();
    });
    clientSocket.emit("order:newLine", 2);
  });

  test("gameOver", (done) => {
    serverSocket.once("order:gameover", (payload: SocketData) => {
      gameOver(io, serverSocket, payload, rooms);
      expect(rooms[0].getPlayer(serverSocket.id)?.getStatus()).toBe("Waiting");
      expect(rooms[0].getTetraminos().length).toBe(0);
      expect(rooms[0].getPlayer(serverSocket.id)?.getScore()).toBe(0);
      expect(rooms[0].getPlayer(serverSocket.id)?.getTetra()).toBe(0);
      expect(rooms[0].getPlayer(serverSocket.id)?.getShadow()).toBe(undefined);
      expect(rooms[0].getPlayer(serverSocket.id)?.getStatus()).toBe("Waiting");
      done();
    });
    clientSocket.emit("order:gameover", payloadMock);
  });

  test("leaveRoom", (done) => {
    serverSocket.once("order:leaveRoom", () => {
      leaveRoom(io, serverSocket, rooms);
      expect(rooms.length).toBe(0);
      done();
    });
    clientSocket.emit("order:leaveRoom", payloadMock);
  });

  test("joinAgain", (done) => {
    serverSocket.once("order:join", (payload: SocketData) => {
      joinRoom(io, serverSocket, payload, rooms);
      expect(rooms.length).toBe(1);
      expect(rooms[0].getPlayer(serverSocket.id)?.getName()).toBe("test");
      expect(rooms[0].getAdmin().getId()).toBe(serverSocket.id);
      done();
    });
    clientSocket.emit("order:join", payloadMock);
  });

  test("player2", (done) => {
    serverSocket.once("order:join", (payload: SocketData) => {
      serverSocket.id = "yolo";
      joinRoom(io, serverSocket, payload, rooms);
      expect(rooms.length).toBe(1);
      expect(rooms[0].getPlayer(serverSocket.id)?.getName()).toBe("test");
      expect(rooms[0].getPlayers().length).toBe(2);
      done();
    });
    clientSocket.emit("order:join", payloadMock);
  });

  test("startGameAgain", (done) => {
    serverSocket.once("order:start", (payload: SocketData) => {
      startGame(io, serverSocket, payload, rooms);
      expect(rooms[0].getTetraminos().length).toBe(5);
      expect(rooms[0].getStatus()).toBe("Playing");
      done();
    });
    clientSocket.emit("order:start", payloadMock);
  });

  test("gameOverAgain", (done) => {
    serverSocket.once("order:gameover", (payload: SocketData) => {
      gameOver(io, serverSocket, payload, rooms);
      expect(rooms[0].getPlayer(serverSocket.id)?.getStatus()).toBe("Waiting");
      expect(rooms[0].getTetraminos().length).toBe(0);
      expect(rooms[0].getPlayer(serverSocket.id)?.getScore()).toBe(0);
      expect(rooms[0].getPlayer(serverSocket.id)?.getTetra()).toBe(0);
      expect(rooms[0].getPlayer(serverSocket.id)?.getShadow()).toBe(undefined);
      expect(rooms[0].getPlayer(serverSocket.id)?.getStatus()).toBe("Waiting");
      done();
    });
    clientSocket.emit("order:gameover", payloadMock);
  });

  test("leaveRoomAgain", (done) => {
    serverSocket.once("order:leaveRoom", () => {
      leaveRoom(io, serverSocket, rooms);
      expect(rooms.length).toBe(1);
      done();
    });
    clientSocket.emit("order:leaveRoom", payloadMock);
  });
});
