import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { MenuProvider } from './contexts/MenuContext';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import './styles/global.css'; // Import global styles

const App = () => {
  return (
    <AuthProvider>
      <MenuProvider>
        <div className="App">
          <Header />
          <MainContent />
          <Footer />
        </div>
      </MenuProvider>
    </AuthProvider>
  );
};

export default App;

