import { FiEdit2, FiTrash2 } from "react-icons/fi";

const TaskList = ({
  tasks,
  onDelete,
  onEdit,
  loading,
  onUpdateStatus,
  filter,
}) => {
  return (
    <div className="bg-slate-800 p-6 pt-5 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Tareas {filter === "todas" && "actuales"}
        {filter === "pendiente" && "pendientes"}
        {filter === "hecha" && "hechas"}{" "}
        <span className="text-md text-gray-400">({tasks.length})</span>
        <span className="text-3xl inline-block align-middle ms-2">📋</span>
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          No tenés tareas creadas. ¡Creá la primera para comenzar! 🚀
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...tasks].reverse().map((task) => (
            <div
              key={task._id}
              className="bg-slate-700 p-4 rounded flex flex-col justify-between"
            >
              <div className="mb-4">
                <span className="break-words font-bold">{task.text}</span>
                <p className="text-sm text-gray-300 mt-1">
                  Estado:{" "}
                  {task.status === "hecha" ? (
                    <span className="text-green-400 font-semibold">Hecha</span>
                  ) : (
                    <span className="text-yellow-300 font-semibold">
                      Pendiente
                    </span>
                  )}
                </p>
              </div>

              <div className="flex justify-between items-center mt-2">
                {task.status === "pendiente" ? (
                  <button
                    onClick={() => onUpdateStatus(task._id, "hecha")}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
                  >
                    Hecha
                  </button>
                ) : (
                  <button
                    onClick={() => onUpdateStatus(task._id, "pendiente")}
                    className="bg-yellow-500 hover:bg-yellow-600 text-black px-3 py-1 rounded text-sm"
                  >
                    Pendiente
                  </button>
                )}
                
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(task)}
                    title="Editar tarea"
                    className="bg-yellow-400 hover:bg-yellow-300 text-black p-2 rounded"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(task._id)}
                    title="Eliminar tarea"
                    className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-sm"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
