import { useTasks } from '../../context/TaskContext.jsx';
import { TaskItem } from './TaskItem.jsx';

// Grid layout — reuses TaskItem cards arranged in a CSS grid.
// The header and add-task form are owned by TaskList, not duplicated here.
export function TaskGrid() {
  const { tasks } = useTasks();

  if (tasks.length === 0) {
    return (
      <p className="px-6 py-8 text-sm text-gray-500">
        No tasks yet. Add one above.
      </p>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 auto-rows-min">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
}
