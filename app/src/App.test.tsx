import React from 'react';
import "setimmediate";
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { setupStore } from './store/configure';
import { BrowserRouter } from 'react-router-dom';

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};
test('render app', () => {
  global.window = Object.create(window);
const url = "http://localhost:3000/#roomid";
Object.defineProperty(window, 'location', {
  value: {
    href: url
  }
});
  render(
    <Provider store={setupStore()}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  );
  const nameApp = screen.getByText(/RED-TETRIS/i);
  expect(nameApp).toBeInTheDocument();
});

