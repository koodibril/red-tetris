import React from 'react';
import "setimmediate";
import { screen } from '@testing-library/react';
import Oponents from './Oponents';
import { setupStore } from '../../../store/configure';
import { setOponents, setPosition, setStatus } from '../../../ducks/tetris/tetrisSlice';
import { renderWithProviders } from '../../../utils/test-utils';

window.matchMedia = window.matchMedia || function() {
    return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
    };
  };

test('left side', () => {
    const store = setupStore();
    const oponents = [{
        status: "Playing",
        shadow: [[{value: 0, color: "test"}]],
        id: "test",
        name: "test",
    },{
        status: "Playing",
        shadow: [[{value: 0, color: "test"}]],
        id: "test",
        name: "test",
    },{
        status: "Playing",
        shadow: [[{value: 0, color: "test"}]],
        id: "test",
        name: "test",
    }];
    store.dispatch(setOponents(oponents));
    store.dispatch(setPosition([1,2]));
    store.dispatch(setStatus("Playing"));
  
    renderWithProviders(<Oponents side={false}/>, { store })
    const nameApp = screen.getByText(/Playing/i);
    expect(nameApp).toBeInTheDocument();
  })

  test('right side', () => {
      const store = setupStore();
      const oponents = [{
          status: "Playing",
          shadow: [[{value: 0, color: "test"}]],
          id: "test",
          name: "test",
      },{
          status: "Playing",
          shadow: [[{value: 0, color: "test"}]],
          id: "test",
          name: "test",
      },{
        status: "Playing",
        shadow: [[{value: 0, color: "test"}]],
        id: "test",
        name: "test",
    }];
      store.dispatch(setOponents(oponents));
      store.dispatch(setPosition([1,2]));
      store.dispatch(setStatus("Playing"));
    
      renderWithProviders(<Oponents side={true}/>, { store })
      const nameApp = screen.getAllByText(/Playing/i);
      expect(nameApp[0]).toBeInTheDocument();
    })