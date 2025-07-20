import { useEffect, useState } from "react";
import TaskCreator from "../components/TaskCreator";
import TaskList from "../components/TaskList";
import EditTaskModal from "../components/EditTaskModal";
import Navbar from "../components/Navbar";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const API_URL = `${
  import.meta.env.VITE_API_URL || "http://localhost:2222/api"
}/tasks`;

const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [filter, setFilter] = useState("todas");

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL, getAuthHeaders());
      setTasks(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      console.error("Error al cargar tareas:", err);
    } finally {
      setLoading(false);
    }
  };

  const darkSwalOptions = {
    background: "#1f2937",
    color: "#fff",
    confirmButtonColor: "#3b82f6",
    cancelButtonColor: "#ef4444",
  };

  const handleCreateTask = async (title) => {
    try {
      await axios.post(API_URL, { text: title }, getAuthHeaders());
      fetchTasks();
      MySwal.fire({
        ...darkSwalOptions,
        icon: "success",
        title: "Tarea creada",
        text: "La tarea fue agregada correctamente",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Error al crear tarea:", err);
      MySwal.fire({
        ...darkSwalOptions,
        icon: "error",
        title: "Error",
        text: "No se pudo crear la tarea.",
      });
    }
  };

  const handleDeleteTask = async (id) => {
    const result = await MySwal.fire({
      ...darkSwalOptions,
      title: "¿Estás seguro?",
      text: "Esta tarea se eliminará permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
        fetchTasks();
        MySwal.fire({
          ...darkSwalOptions,
          icon: "success",
          title: "¡Eliminada!",
          text: "La tarea fue eliminada correctamente.",
        });
      } catch (err) {
        console.error("Error al eliminar tarea:", err);
        MySwal.fire({
          ...darkSwalOptions,
          icon: "error",
          title: "Error",
          text: "No se pudo eliminar la tarea.",
        });
      }
    }
  };

  const handleEditTask = async (id, newTitle) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { text: newTitle }, getAuthHeaders());
      setEditModalOpen(false);
      setTaskToEdit(null);
      fetchTasks();
      MySwal.fire({
        ...darkSwalOptions,
        icon: "success",
        title: "Tarea actualizada",
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Error al editar tarea:", err);
      MySwal.fire({
        ...darkSwalOptions,
        icon: "error",
        title: "Error",
        text: "No se pudo editar la tarea.",
      });
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { status: newStatus }, getAuthHeaders());
      fetchTasks();
      MySwal.fire({
        ...darkSwalOptions,
        icon: "success",
        title: "Estado actualizado",
        text: `La tarea ahora está como "${newStatus === "hecha" ? "Hecha" : "Pendiente"}".`,
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("Error al actualizar estado:", err);
      MySwal.fire({
        ...darkSwalOptions,
        icon: "error",
        title: "Error",
        text: "No se pudo cambiar el estado de la tarea.",
      });
    }
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "todas") return true;
    return task.status === filter;
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <div className="p-6 mx-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold mb-10">Panel Admin de Tareas ✅</h1>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setFilter("todas")}
              className={`px-3 py-1 rounded border ${
                filter === "todas"
                  ? "border-white text-white"
                  : "border-transparent text-white/70 hover:text-white"
              }`}
            >
              📋 Todas
            </button>
            <button
              onClick={() => setFilter("pendiente")}
              className={`px-3 py-1 rounded border ${
                filter === "pendiente"
                  ? "border-yellow-300 text-yellow-300"
                  : "border-transparent text-yellow-300/70 hover:text-yellow-300"
              }`}
            >
              🕓 Pendientes
            </button>
            <button
              onClick={() => setFilter("hecha")}
              className={`px-3 py-1 rounded border ${
                filter === "hecha"
                  ? "border-green-400 text-green-400"
                  : "border-transparent text-green-400/70 hover:text-green-400"
              }`}
            >
              ✅ Hechas
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <TaskCreator onCreate={handleCreateTask} />
          <TaskList
            loading={loading}
            tasks={filteredTasks}
            filter={filter}
            onUpdateStatus={handleUpdateStatus}
            onDelete={handleDeleteTask}
            onEdit={(task) => {
              setTaskToEdit(task);
              setEditModalOpen(true);
            }}
          />
        </div>

        {editModalOpen && taskToEdit && (
          <EditTaskModal
            task={taskToEdit}
            onClose={() => setEditModalOpen(false)}
            onSave={handleEditTask}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
