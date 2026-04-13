import { useTasks } from '../../context/TaskContext.jsx';
import { TaskItem } from './TaskItem.jsx';

const COLUMNS = [
  { status: 'Todo',        headerClass: 'text-gray-400',  countClass: 'bg-gray-700' },
  { status: 'In Progress', headerClass: 'text-blue-400',  countClass: 'bg-blue-900/60' },
  { status: 'Urgent',      headerClass: 'text-red-400',   countClass: 'bg-red-900/60' },
  { status: 'Completed',   headerClass: 'text-green-400', countClass: 'bg-green-900/60' },
];

export function TaskColumns() {
  const { tasks } = useTasks();

  return (
    // Horizontal flex — each column takes equal space and scrolls independently.
    <div className="flex-1 flex gap-3 overflow-x-auto px-6 py-4 min-h-0">
      {COLUMNS.map(({ status, headerClass, countClass }) => {
        const columnTasks = tasks.filter((t) => t.status === status);

        return (
          <div
            key={status}
            className="flex flex-col min-w-[14rem] flex-1 bg-gray-800/40 rounded-xl
                       border border-gray-700/40 overflow-hidden"
          >
            {/* Column header */}
            <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-700/40 shrink-0">
              <span className={`text-xs font-semibold uppercase tracking-wider ${headerClass}`}>
                {status}
              </span>
              <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${countClass} text-gray-200`}>
                {columnTasks.length}
              </span>
            </div>

            {/* Task cards — scrollable within column */}
            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {columnTasks.length === 0 ? (
                <p className="text-xs text-gray-600 text-center py-4 italic">Empty</p>
              ) : (
                columnTasks.map((task) => (
                  <TaskItem key={task.id} task={task} compact />
                ))
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
