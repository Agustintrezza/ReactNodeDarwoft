import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Navbar from "../components/Navbar";
import Swal from "sweetalert2";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      if (res.data.token) {
        login({
          email: res.data.email || email,
          token: res.data.token,
        });

        await Swal.fire({
          title: "¡Bienvenido!",
          text: "Inicio de sesión exitoso",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ir al panel",
          background: "#1e293b",
          color: "#fff",
        });

        navigate("/dashboard");
      } else {
        Swal.fire({
          title: "Error",
          text: "Respuesta inválida del servidor.",
          icon: "error",
          background: "#1e293b",
          color: "#fff",
        });
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      Swal.fire({
        title: "Error al iniciar sesión",
        text: "Verificá tus datos o intentá más tarde.",
        icon: "error",
        background: "#1e293b",
        color: "#fff",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center bg-slate-900 text-white">
        <form
          onSubmit={handleSubmit}
          className="bg-slate-800 p-8 mb-20 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">
            Iniciar Sesión <span className="ms-3 text-4xl inline-block">🔐</span>
          </h2>
          <input
            type="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 mb-4 rounded bg-slate-700 text-white outline-none"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 mb-6 rounded bg-slate-700 text-white outline-none"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
          >
            Ingresar
          </button>
          <p className="text-sm text-center mt-4">
            ¿No tenés una cuenta?{" "}
            <span
              className="text-green-400 hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Registrate
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
