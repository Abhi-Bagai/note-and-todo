import { useState } from 'react';
import { useTasks } from '../../context/TaskContext.jsx';
import { TaskItem } from './TaskItem.jsx';
import { TaskGrid } from './TaskGrid.jsx';
import { TaskColumns } from './TaskColumns.jsx';
import { ViewToggle } from '../ui/ViewToggle.jsx';

const VIEWS = [
  {
    id: 'list',
    label: 'List view',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        className="w-4 h-4">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
  {
    id: 'grid',
    label: 'Grid view',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        className="w-4 h-4">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: 'column',
    label: 'Column view',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        className="w-4 h-4">
        <rect x="3" y="3" width="5" height="18" rx="1" />
        <rect x="10" y="3" width="5" height="18" rx="1" />
        <rect x="17" y="3" width="5" height="18" rx="1" />
      </svg>
    ),
  },
];

export function TaskList({ view, onViewChange }) {
  const { tasks, loading, error, addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [addError, setAddError] = useState(null);

  async function handleAdd(e) {
    e.preventDefault();
    if (!title.trim()) return;
    setAddError(null);
    try {
      await addTask(title.trim());
      setTitle('');
    } catch (err) {
      setAddError(err.message);
    }
  }

  if (loading) {
    return <p className="p-6 text-gray-400 text-sm">Loading tasks…</p>;
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header + view toggle */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800 shrink-0">
        <h2 className="text-lg font-semibold text-gray-100">Tasks</h2>
        <ViewToggle views={VIEWS} active={view} onChange={onViewChange} />
      </div>

      {/* Add task form — shared across all views */}
      <form onSubmit={handleAdd} className="flex gap-2 px-6 py-3 border-b border-gray-800 shrink-0">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="New task…"
          className="flex-1 rounded bg-gray-800 px-3 py-2 text-sm text-gray-100 placeholder-gray-500
                     focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white
                     hover:bg-blue-500 transition-colors disabled:opacity-50"
          disabled={!title.trim()}
        >
          Add
        </button>
      </form>
      {addError && <p className="px-6 py-1 text-xs text-red-400 shrink-0">{addError}</p>}
      {error    && <p className="px-6 py-1 text-xs text-red-400 shrink-0">Error: {error}</p>}

      {/* Body — switches between view modes */}
      {view === 'list' && (
        tasks.length === 0 ? (
          <p className="px-6 py-6 text-sm text-gray-500">No tasks yet. Add one above.</p>
        ) : (
          <ul className="flex-1 overflow-y-auto px-6 py-3 space-y-2">
            {tasks.map((task) => (
              <TaskItem key={task.id} task={task} />
            ))}
          </ul>
        )
      )}

      {view === 'grid' && <TaskGrid />}

      {view === 'column' && <TaskColumns />}
    </div>
  );
}
