import React from 'react';
import { ContractContextProvider } from '@src/contexts';
import './dist/main.css';

import { Page } from './pages';

const App: React.FC = () => {
  return (
    <div className="App">
      <ContractContextProvider>
        <Page />
      </ContractContextProvider>
    </div>
  );
};

export default App;
