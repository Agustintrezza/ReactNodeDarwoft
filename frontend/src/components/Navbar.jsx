import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { FiPower } from "react-icons/fi";
import logoDarwoft from "../assets/logo-darwoft.png";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isLoggedIn = !!user?.token;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-slate-800 text-white p-4 flex justify-between items-center shadow-md">
      {/* IZQUIERDA */}
      <div className="flex items-center gap-3">
        <img
          src={logoDarwoft}
          alt="Logo Darwoft"
          className="w-10 h-10 object-contain rounded-md"
        />

        {isLoggedIn ? (
          <>
            <FaNodeJs className="text-green-500 text-3xl" />
            <FaReact className="text-cyan-400 text-3xl animate-spin-slow" />
            {/* Nombre SOLO en desktop */}
            <p className="hidden sm:block text-md text-gray-200 font-semibold ms-2 leading-tight">
              <span className="block">Agustin Trezza</span>
            </p>
          </>
        ) : (
          <>
            <FaReact className="text-cyan-400 text-3xl animate-spin-slow" />
            <FaNodeJs className="text-green-500 text-3xl" />
          </>
        )}
      </div>

      {/* DERECHA */}
      {isLoggedIn ? (
        <div className="flex items-center gap-4">

          <span className="text-md text-gray-300 hidden sm:inline">
            👤 {user?.email}
          </span>

          <p className="flex sm:hidden text-sm text-gray-200 font-semibold flex-col text-right leading-tight">
            <span>Agustin</span>
            <span>Trezza</span>
          </p>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-xl text-md flex items-center justify-center"
            title="Cerrar sesión"
          >
            <span className="hidden sm:inline">Cerrar sesión</span>
            <FiPower className="sm:hidden text-xl" />
          </button>

        </div>
      ) : (
        <p className="text-md text-gray-200 font-semibold text-right leading-tight">
          <span className="block sm:inline">Agustin</span>{" "}
          <span className="block sm:inline">Trezza</span>
        </p>
      )}
    </nav>
  );
};

export default Navbar;
