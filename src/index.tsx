import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App'; 
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement); // Create root element
root.render( 
  <React.StrictMode>
    <App />
  </React.StrictMode>
);




