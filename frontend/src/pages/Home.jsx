import { useTasks } from '../hooks/useTasks'

const Home = () => {
  const { tasks, loader, error, isListening, toggleListening, handleDelete, handleComplete } = useTasks()

  return (
    <div>
      {loader && <h2>Cargando...</h2>}
      {error && <h2>{error}</h2>}
      <button onClick={toggleListening}>{isListening ? "🎙️ Grabando..." : "🎤 Grabar tarea por voz"}</button>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.text}
            <button onClick={() => handleComplete(task)}>
              {task.completed ? "❌ Marcar pendiente" : "✅ Marcar realizada"}
            </button>
            <button onClick={() => handleDelete(task._id)}>🗑️ Borrar</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export { Home }