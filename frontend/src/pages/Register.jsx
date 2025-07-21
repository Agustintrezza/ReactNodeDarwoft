import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        {
          email,
          password,
        }
      );

      if (res.data.success) {
        Swal.fire({
          icon: "success",
          title: "Cuenta creada",
          text: "Tu cuenta fue creada correctamente 🎉",
          confirmButtonText: "Iniciar sesión",
          confirmButtonColor: "#2563eb",
        }).then(() => {
          navigate("/login");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: res.data.message || "No se pudo crear la cuenta",
        });
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al registrar. Verificá los datos.",
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <form
          onSubmit={handleRegister}
          className="bg-slate-800 p-8 mb-20 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Crear una cuenta{" "}
            <span className="ms-3 text-4xl inline-block">📝</span>
          </h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full p-2 mb-4 rounded bg-slate-700 text-white"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full p-2 mb-6 rounded bg-slate-700 text-white"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded"
          >
            Crear cuenta
          </button>
          <p className="text-sm text-center mt-4">
            ¿Ya tenés cuenta?{" "}
            <span
              className="text-green-400 hover:underline cursor-pointer"
              onClick={() => navigate("/login")}
            >
              Iniciar sesión
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
