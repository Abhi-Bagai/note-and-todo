import { useState } from 'react';
import { useTasks } from '../../context/TaskContext.jsx';
import { StatusBadge } from './StatusBadge.jsx';
import { formatDate } from '../../utils/formatDate.js';

const STATUSES = ['Todo', 'In Progress', 'Urgent', 'Completed'];

// compact=true is used by TaskColumns: stacks title and select vertically
// so everything fits within a narrow column without overflowing.
export function TaskItem({ task, compact = false }) {
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

  if (compact) {
    return (
      <li className="flex flex-col rounded-lg bg-gray-800/60 border border-gray-700/50 p-3 gap-2">
        {/* Title row + delete */}
        <div className="flex items-start gap-2">
          <span className="flex-1 text-sm text-gray-100 break-words min-w-0 leading-snug">
            {task.title}
          </span>
          <button
            onClick={handleDelete}
            className="shrink-0 text-gray-600 hover:text-red-400 transition-colors text-xs mt-0.5"
            aria-label="Delete task"
          >
            ✕
          </button>
        </div>

        {/* Created date */}
        <p className="text-xs text-gray-500">{formatDate(task.createdAt)}</p>

        {/* Status select — full width so it doesn't overflow */}
        <select
          value={task.status}
          onChange={handleStatusChange}
          className="w-full rounded bg-gray-700 px-2 py-1 text-xs text-gray-200
                     focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>

        {error && <p className="text-xs text-red-400">{error}</p>}
      </li>
    );
  }

  // Default layout — used by list and grid views.
  return (
    <li className="flex flex-col rounded-lg bg-gray-800/60 border border-gray-700/50 px-4 py-3 gap-1.5">
      <div className="flex items-center gap-3">
        <span className="flex-1 text-sm text-gray-100">{task.title}</span>
        <StatusBadge status={task.status} />
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
        <button
          onClick={handleDelete}
          className="text-gray-600 hover:text-red-400 transition-colors text-xs"
          aria-label="Delete task"
        >
          ✕
        </button>
      </div>
      <p className="text-xs text-gray-500">{formatDate(task.createdAt)}</p>
      {error && <p className="text-xs text-red-400">{error}</p>}
    </li>
  );
}
