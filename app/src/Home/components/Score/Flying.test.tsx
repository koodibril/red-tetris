import React from 'react';
import "setimmediate";
import { screen } from '@testing-library/react';
import Flying from './Flying';
import { setupStore } from '../../../store/configure';
import { setAdmin, setGameStatus, setOponents, setPosition, setStatus } from '../../../ducks/tetris/tetrisSlice';
import { renderWithProviders } from '../../../utils/test-utils';

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
  };

test('flying', () => {
    const store = setupStore();
    store.dispatch(setAdmin(true));
    store.dispatch(setStatus("Waiting"));
    store.dispatch(setGameStatus("Waiting"));
  
    renderWithProviders(<Flying/>, { store })
    const nameApp = screen.getByText(/READY/i);
    expect(nameApp).toBeInTheDocument();
  })