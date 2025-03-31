import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import { CollegeProvider } from './context/CollegeContext.jsx';
import { AdminProvider } from './context/AdminContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AdminProvider>
        <CollegeProvider>
          <App />
        </CollegeProvider>
      </AdminProvider>
    </BrowserRouter>
  </StrictMode>,
)
