import { createContext, useContext, useEffect, useState } from 'react';

const TaskContext = createContext(null);

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all tasks from the main process on mount.
  useEffect(() => {
    window.api.tasks
      .getAll()
      .then(setTasks)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function addTask(title) {
    // Optimistic error surfacing: throw so the caller (TaskList) can display it.
    const task = await window.api.tasks.create({ title });
    setTasks((prev) => [task, ...prev]);
  }

  async function updateTaskStatus(id, status) {
    const updated = await window.api.tasks.updateStatus(id, status);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function deleteTask(id) {
    await window.api.tasks.delete(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <TaskContext.Provider value={{ tasks, loading, error, addTask, updateTaskStatus, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks() {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTasks must be used inside <TaskProvider>');
  return ctx;
}
