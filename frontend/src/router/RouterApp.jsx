import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "../pages/Login";
import Register from "../pages/Register";
import { Home } from '../pages/Home'
import Dashboard from "../pages/Dashboard";
import { PrivateRoute } from './PrivateRoute'

function RouterApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export { RouterApp }
