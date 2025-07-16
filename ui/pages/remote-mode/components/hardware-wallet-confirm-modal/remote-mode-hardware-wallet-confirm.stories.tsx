import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from '../../../../store/store';
import RemoteModeHardwareWalletConfirm from './remote-mode-hardware-wallet-confirm.component';

const store = configureStore({});

export const Default = () => (
  <Provider store={store}>
    <MemoryRouter>
      <RemoteModeHardwareWalletConfirm
        visible
        onConfirm={() => {}}
        onClose={() => {}}
      />
    </MemoryRouter>
  </Provider>
);
