import React from 'react';
import "setimmediate";
import { render, screen } from '@testing-library/react';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './store/configure';
import { BrowserRouter } from 'react-router-dom';

window.matchMedia = window.matchMedia || function() {
  return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
  };
};

test('renders learn react link', () => {
  const { unmount } = render(
    <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </Provider>
  );
  const linkElement = screen.getByText(/RED-TETRIS/i);
  expect(linkElement).toBeInTheDocument();

  unmount();
});
