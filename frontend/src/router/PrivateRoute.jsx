import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="text-white text-center mt-10">Cargando...</div>
  }

  return user ? children : <Navigate to="/login" />;
};
