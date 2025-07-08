import { useState } from "react";

const EditTaskModal = ({ task, onClose, onSave }) => {
  const [newTitle, setNewTitle] = useState(task.text);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Editar Tarea ✏️</h2>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-slate-700 text-white"
        />
        <div className="flex justify-end gap-3">
          <button
            onClick={() => onSave(task._id, newTitle)}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            Guardar
          </button>
          <button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
