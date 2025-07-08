import { useState, useRef } from "react";
import { FiMic, FiXCircle } from "react-icons/fi";

const TaskCreator = ({ onCreate }) => {
  const [newTask, setNewTask] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  const capitalize = (text) => {
    const trimmed = text.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  };

  const handleSubmit = () => {
    if (newTask.trim()) {
      const formatted = capitalize(newTask);
      onCreate(formatted);
      setNewTask("");
    }
  };

  const handleClear = () => {
    setNewTask("");
  };

  const handleVoiceToggle = () => {
    if (!recognitionRef.current) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "es-ES";
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const speechResult = event.results[0][0].transcript;
        const updated = `${newTask} ${speechResult}`.trim();
        setNewTask(capitalize(updated));
      };

      recognition.onerror = (e) => {
        console.error("Error de reconocimiento de voz:", e);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognition;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  return (
    <div className="bg-slate-800 p-6 pt-5 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-3">
        Crear nueva tarea{" "}
        <span className="text-3xl inline-block ms-2 align-middle">📝</span>
      </h2>

      <div className="flex flex-col md:flex-row md:items-center gap-2">
        <input
          type="text"
          placeholder="Ingresá una tarea..."
          value={newTask}
          onChange={(e) => setNewTask(capitalize(e.target.value))}
          className="w-full p-2 rounded bg-slate-700 text-white outline-none"
        />

        <div className="flex w-full md:w-auto justify-between gap-2">
          <button
            onClick={handleSubmit}
            className="w-1/3 md:w-auto bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Crear
          </button>
          <button
            onClick={handleVoiceToggle}
            className={`w-1/3 md:w-auto px-4 py-2 rounded transition-colors ${
              isRecording
                ? "bg-red-600 hover:bg-red-700"
                : "bg-green-600 hover:bg-green-700"
            }`}
            title={isRecording ? "Detener grabación" : "Dictar por voz"}
          >
            <FiMic size={18} className="mx-auto" />
          </button>
          <button
            onClick={handleClear}
            className="w-1/3 md:w-auto bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded"
            title="Limpiar input"
          >
            <FiXCircle size={18} className="mx-auto" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskCreator;
