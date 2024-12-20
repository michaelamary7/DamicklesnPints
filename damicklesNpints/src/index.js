import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css'; // Ensure this path matches your styles file
import App from './App'; // Ensure App is properly exported

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Ensure this matches the id in `public/index.html`
);
