import React from 'react';
import ReactDOM from 'react-dom/client';
import { LazyMotion, domMax } from 'framer-motion';
import App from './App';
import '../index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LazyMotion features={domMax}>
      <App />
    </LazyMotion>
  </React.StrictMode>,
);
