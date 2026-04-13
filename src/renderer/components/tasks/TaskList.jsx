import { useState } from 'react';
import { useTasks } from '../../context/TaskContext.jsx';
import { TaskItem } from './TaskItem.jsx';

export function TaskList() {
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
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-800">
        <h2 className="text-lg font-semibold text-gray-100">Tasks</h2>
      </div>

      {/* Add task form */}
      <form onSubmit={handleAdd} className="flex gap-2 px-6 py-3 border-b border-gray-800">
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
      {addError && <p className="px-6 py-1 text-xs text-red-400">{addError}</p>}

      {/* Task list */}
      {error && <p className="px-6 py-3 text-sm text-red-400">Error: {error}</p>}

      {tasks.length === 0 ? (
        <p className="px-6 py-6 text-sm text-gray-500">No tasks yet. Add one above.</p>
      ) : (
        <ul className="flex-1 overflow-y-auto px-6 py-3 space-y-2">
          {tasks.map((task) => (
            <TaskItem key={task.id} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
}
