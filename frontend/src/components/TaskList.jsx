import { FiEdit2, FiTrash2 } from "react-icons/fi";

const TaskList = ({ tasks, onDelete, onEdit, loading }) => {
  return (
    <div className="bg-slate-800 p-6 pt-5 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-4">
        Tareas actuales{" "}
        <span className="text-3xl inline-block align-middle">📋</span>
      </h2>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : tasks.length === 0 ? (
        <p className="text-gray-400 text-center py-8">
          No tenés tareas aún. ¡Creá la primera para comenzar! 🚀
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="bg-slate-700 p-4 rounded flex flex-col justify-between"
            >
              <span className="mb-4 break-words font-bold">{task.text}</span>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => onEdit(task)}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  <FiEdit2 />
                </button>
                <button
                  onClick={() => onDelete(task._id)}
                  className="text-red-500 hover:text-red-400"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskList;
