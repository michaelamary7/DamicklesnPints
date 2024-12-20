import React, { Component } from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { MenuProvider } from './contexts/MenuContext';
import Header from './Header';
import MainContent from './MainContent';
import Footer from './Footer';
import './styles/global.css'; // Import global styles

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children; 
  }
}

const App = () => {
  return (
    <AuthProvider>
      <MenuProvider>
        <ErrorBoundary>
          <div className="App">
            <Header />
            <MainContent />
            <Footer />
          </div>
        </ErrorBoundary>
      </MenuProvider>
    </AuthProvider>
  );
};

export default App;
