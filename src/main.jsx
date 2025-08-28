import React, { useRef, useState } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles/Global.scss';  // import global SCSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
