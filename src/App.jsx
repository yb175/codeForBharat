import React from 'react';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider } from './context/AppContext';
import MainApplication from './components/MainApplication/MainApplication';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppProvider>
          <MainApplication />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;