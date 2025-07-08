import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterApp } from './router/RouterApp'
import { AuthProvider } from './context/authContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterApp />
    </AuthProvider>
  </React.StrictMode>
)
