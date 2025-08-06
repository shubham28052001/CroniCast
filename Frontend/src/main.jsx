import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from './Contexts/UserContext'
import SmoothScroll from './Components/SmoothScroll'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <UserProvider>
      <SmoothScroll>
        <App />
      </SmoothScroll>
    </UserProvider>
  </BrowserRouter>
  </StrictMode>,
)
