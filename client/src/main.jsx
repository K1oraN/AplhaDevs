import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css' 
import './i18n';
// (A linha do react-helmet-async foi removida)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* (O HelmetProvider foi removido) */}
    <App />
  </React.StrictMode>,
)