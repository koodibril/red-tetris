import socketClient from "socket.io-client";
const SERVER = process.env.NODE_ENV==='test'?'':"http://localhost:3001";
export const socket = socketClient(SERVER);
