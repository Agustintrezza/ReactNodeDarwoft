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
    <nav className="bg-slate-800 text-white px-4 py-2 flex justify-between items-center shadow-md">
      <div className="flex items-center">
        <p className="text-sm sm:text-md text-gray-200 font-semibold leading-tight">
          <span className="hidden text-lg sm:block font-medium">
            Capacitación <span className="text-cyan-300">React</span>{" "}
            <span className="text-green-400">NodeJs</span> -{" "}
            <span className="text-blue-400">DARWOFT</span>
          </span>
          <span className="hidden text-md sm:block font-thin mt-[-3px]">
            Profesor: Gabriel Alberini / Trabajo: Agustin Trezza
          </span>
          <span className="block sm:hidden">
            Trabajo Fullstack - Agustin Trezza
          </span>
        </p>
      </div>

      <div className="flex items-center gap-3">
        {/* Mostrar logo e íconos SOLO si el usuario NO está logueado */}
        {!isLoggedIn && (
          <>
        <img
          src={logoDarwoft}
          alt="Logo Darwoft"
          className="w-8 h-8 object-contain rounded-md"
            />
            <FaReact className="text-cyan-400 text-3xl animate-spin-slow" />
            <FaNodeJs className="text-green-500 text-3xl" />
          </>
        )}

        {isLoggedIn && (
<>
          <span className="text-sm sm:text-md text-gray-300 hidden sm:inline">
            👤 {user?.email}
          </span>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-3 py-2 rounded-xl text-md flex items-center justify-center"
            title="Cerrar sesión"
          >
            <span className="hidden sm:inline">Cerrar sesión</span>
            <FiPower className="sm:hidden text-xl" />
          </button>
          </>
        )}
     </div>
    </nav>
  );
};

export default Navbar;
