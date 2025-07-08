import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/authContext';

const NODE_DEV = import.meta.env.VITE_NODE_DEV ?? "development";
const API_URL =
  NODE_DEV === "production"
    ? import.meta.env.VITE_BASE_API_URL
    : "http://localhost:2222/api/tasks";

const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(null);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);
  const { token } = useAuth();

  const fetchTasks = async () => {
    setLoader(true);
    try {
      const response = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await response.json();
      setTasks(json.data);
    } catch (error) {
      console.log(error)
      setError("Error al recuperar las tareas");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "es-AR";
    recognition.continuous = false; // usar false para mejor control
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript =
        event.results[event.results.length - 1][0].transcript.trim();
      if (transcript) {
        addTask(transcript.charAt(0).toUpperCase() + transcript.slice(1) + ".");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (e) => {
      console.error("Error en reconocimiento:", e);
      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, []);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const addTask = async (text) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text }),
      });
      const json = await response.json();
      setTasks((prev) => [json.data, ...prev]);
    } catch (error) {
      console.error("Error al crear tarea por voz:", error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      if (confirm("¿Estás seguro de que quieres borrar esta tarea?")) {
        await fetch(`${API_URL}/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks((tasks) => tasks.filter((t) => t._id !== id));
      }
    } catch (error) {
      console.error("Error al eliminar:", error.message);
    }
  };

  const handleComplete = async ({ _id, completed }) => {
    try {
      const response = await fetch(`${API_URL}/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ text: completed ? "" : "Completada" }),
      });
      const json = await response.json();
      setTasks((tasks) =>
        tasks.map((t) => (t._id === _id ? json.data : t))
      );
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    tasks,
    loader,
    error,
    isListening,
    toggleListening,
    handleDelete,
    handleComplete,
  };
};

export { useTasks };
