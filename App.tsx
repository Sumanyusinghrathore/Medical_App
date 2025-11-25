import React from 'react';
import AppContext from './src/context/AppContext';
import MainStack from './src/routes/MainStack';
import { PatientsProvider } from './src/context/PatientsContext';

const App = () => {
  return (
    <AppContext>
      <PatientsProvider>
      <MainStack />
      </PatientsProvider>
    </AppContext>
  );
};

export default App;
