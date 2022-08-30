import React from 'react';
import "setimmediate";
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/configure';
import { BrowserRouter } from 'react-router-dom';
const { createServer } = require("http");
const { Server } = require("socket.io");
const Client = require("socket.io-client");

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

describe("red tetris with pelican sauce", () => {
  let io: any, serverSocket: any, clientSocket: any;

  beforeAll((done) => {
    const httpServer = createServer();
    io = new Server(httpServer);
    httpServer.listen(() => {
      const port = httpServer.address().port;
      clientSocket = new Client(`http://localhost:${port}`);
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

  // test("should work", (done) => {
  //   clientSocket.on("hello", (arg: any) => {
  //     expect(arg).toBe("world");
  //     done();
  //   });
  //   serverSocket.emit("hello", "world");
  // });

  // test("should work (with ack)", (done) => {
  //   serverSocket.on("hi", (cb: any) => {
  //     cb("hola");
  //   });
  //   clientSocket.emit("hi", (arg: any) => {
  //     expect(arg).toBe("hola");
  //     done();
  //   });
  // });

  test('render app', () => {
    global.window = Object.create(window);
  const url = "http://localhost:3000/#roomid";
  Object.defineProperty(window, 'location', {
    value: {
      href: url
    }
  });
    render(
      <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </Provider>
    );
    const nameApp = screen.getByText(/RED-TETRIS/i);
    expect(nameApp).toBeInTheDocument();
  });
});

