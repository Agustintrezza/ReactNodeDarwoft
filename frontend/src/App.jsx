// src/App.jsx
import { RouterApp } from './router/RouterApp'
import { AuthProvider } from './context/authContext'

function App() {
  return (
    <div className="dark bg-gray-900 min-h-screen text-white">
      <AuthProvider>
        <RouterApp />
      </AuthProvider>
    </div>
  )
}

export default App