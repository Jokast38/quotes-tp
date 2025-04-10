import React from 'react';
import ReactDOM from 'react-dom/client'; // Utilisation de createRoot
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')); // Crée un root React
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);