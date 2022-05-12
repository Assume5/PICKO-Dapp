import React from 'react';
import { ContractContextProvider } from '@src/contexts';
import './dist/main.css';

import { Page } from './pages';
import { SocketContextProvider } from './contexts/SocketContext';

const App: React.FC = () => {
  return (
    <div className="App">
      <ContractContextProvider>
        <SocketContextProvider>
          <Page />
        </SocketContextProvider>
      </ContractContextProvider>
    </div>
  );
};

export default App;
