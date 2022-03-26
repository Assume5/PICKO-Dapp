import React from 'react';
import { ContractContextProvider } from './contexts';
import './dist/main.css';

//components
import Customer from './pages/Customer/index';

const App: React.FC = () => {
  return (
    <ContractContextProvider>
      <div className="App">
        <Customer />
      </div>
    </ContractContextProvider>
  );
};

export default App;
