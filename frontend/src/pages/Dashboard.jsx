import { useEffect, useState } from "react";
import TaskCreator from "../components/TaskCreator";
import TaskList from "../components/TaskList";
import EditTaskModal from "../components/EditTaskModal";
import Navbar from "../components/Navbar";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL || "http://localhost:2222/api"}/tasks`;

const getAuthHeaders = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

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

  const handleCreateTask = async (title) => {
    try {
      await axios.post(API_URL, { text: title }, getAuthHeaders());
      fetchTasks();
    } catch (err) {
      console.error("Error al crear tarea:", err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
      fetchTasks();
    } catch (err) {
      console.error("Error al eliminar tarea:", err);
    }
  };

  const handleEditTask = async (id, newTitle) => {
    try {
      await axios.patch(`${API_URL}/${id}`, { text: newTitle }, getAuthHeaders());
      setEditModalOpen(false);
      setTaskToEdit(null);
      fetchTasks();
    } catch (err) {
      console.error("Error al editar tarea:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <Navbar />
      <div className="p-6 mx-auto">
        <h1 className="text-3xl font-bold mb-10">Panel de Administración de Tareas ✅</h1>

        <div className="flex flex-col gap-8">
          <TaskCreator onCreate={handleCreateTask} />
          <TaskList
            tasks={tasks}
            loading={loading}
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
