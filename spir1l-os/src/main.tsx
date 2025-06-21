import React from 'react';
import ReactDOM from 'react-dom/client';
import Dashboard from './dashboard';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Dashboard zcm={[0.5, 0.8, 0.2]} />
  </React.StrictMode>
);
