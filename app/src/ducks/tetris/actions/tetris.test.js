import SocketMock from 'socket.io-mock';
import { addMalus, endTetra, gameOver, joinRoom } from './tetris';

const tetraminos = 
{
  x: 2,
  y: 2,
  value: 2,
  color: "blue",
  shape: [
    [1, 0, 0],
    [1, 1, 1],
    [0, 0, 0],
  ],
};

test('addMalus', () => {
    let socket = new SocketMock();
    socket.on('order:newLine', (data) => {
        expect(data).toBe(3);
    });
    addMalus(socket.socketClient, 3);
})

test('gameOver', () => {
    let socket = new SocketMock();
    const gameOverData = {
        room: 'test',
        name: 'test',
        tetraminos: tetraminos,
        grid: [[{value: 0, color: "test"}]]
    }
    socket.on('order:gameover', (data) => {
        expect(data).toBe(gameOverData);
    });
    gameOver(socket.socketClient, 'test', 'test', tetraminos, [[{value: 0, color: "test"}]]);
})

test('joinRoom', () => {
    let socket = new SocketMock();
    const roomData = {
        room: 'test',
        name: 'test',
        tetraminos: undefined
    }
    socket.on('order:join', (data) => {
        expect(data).toBe(roomData);
    });
    joinRoom(socket.socketClient, 'test', 'test');
})

test('endTetra', () => {
    let socket = new SocketMock();
    const endTetraData = {
        room: 'test',
        name: 'test',
        tetraminos: tetraminos,
        grid: [[{value: 0, color: "test"}]]
    }
    socket.on('endTetra', (data) => {
        expect(data).toBe(endTetraData);
    });
    endTetra(socket.socketClient, 'test', 'test', tetraminos, [[{value: 0, color: "test"}]]);
})

test('start', () => {
    let socket = new SocketMock();
    const startData = {
        room: 'test',
        name: 'test',
        tetraminos: tetraminos,
    }
    socket.on('order:start', (data) => {
        expect(data).toBe(startData);
    });
    endTetra(socket.socketClient, 'test', 'test', tetraminos);
})