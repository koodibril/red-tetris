import React from 'react';
import "setimmediate";
import { screen } from '@testing-library/react';
import Home from './Home';
import { setupStore } from '../store/configure';
import { setOponents, setPosition, setStatus } from '../ducks/tetris/tetrisSlice';
import { renderWithProviders } from '../utils/test-utils';
import { setTetra } from '../ducks/tetris/tetrisSlice';

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
  };

test('Uses preloaded state to render', () => {
    const store = setupStore();
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
    store.dispatch(setTetra(tetraminos));
    store.dispatch(setStatus("Playing"));
  
    renderWithProviders(<Home />, { store })
    const nameApp = screen.getAllByText(/SCORE/i);
    expect(nameApp[0]).toBeInTheDocument();
    expect(nameApp[1]).toBeInTheDocument();
  })