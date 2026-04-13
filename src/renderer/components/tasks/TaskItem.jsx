import { useState } from 'react';
import { useTasks } from '../../context/TaskContext.jsx';
import { StatusBadge } from './StatusBadge.jsx';

const STATUSES = ['Todo', 'In Progress', 'Urgent', 'Completed'];

export function TaskItem({ task }) {
  const { updateTaskStatus, deleteTask } = useTasks();
  const [error, setError] = useState(null);

  async function handleStatusChange(e) {
    setError(null);
    try {
      await updateTaskStatus(task.id, e.target.value);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete() {
    try {
      await deleteTask(task.id);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <li className="flex flex-col rounded-lg bg-gray-800/60 border border-gray-700/50 px-4 py-3 gap-1.5">
      <div className="flex items-center gap-3">
        {/* Title */}
        <span className="flex-1 text-sm text-gray-100">{task.title}</span>

        {/* Status badge shown alongside the dropdown for quick visual scanning */}
        <StatusBadge status={task.status} />

        {/* Status selector */}
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="rounded bg-gray-700 px-2 py-1 text-xs text-gray-200
                     focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {/* Delete */}
        <button
          onClick={handleDelete}
          className="text-gray-600 hover:text-red-400 transition-colors text-xs"
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>

      {/* Inline error — shown in flow below the row */}
      {error && <p className="text-xs text-red-400">{error}</p>}
    </li>
  );
}
