const VALID_STATUSES = ['Todo', 'In Progress', 'Urgent', 'Completed'];

export class TaskService {
  constructor(taskRepository) {
    this.repo = taskRepository;
  }

  getAllTasks() {
    return this.repo.getAll();
  }

  createTask({ title, status = 'Todo' }) {
    if (!title?.trim()) throw new Error('Task title is required');
    if (!VALID_STATUSES.includes(status)) {
      throw new Error(`Invalid status "${status}". Must be one of: ${VALID_STATUSES.join(', ')}`);
    }
    return this.repo.create({ title: title.trim(), status });
  }

  // Status transitions are open (any → any) but only to recognised values.
  // Throw explicitly so callers get a clear message rather than a DB error.
  updateStatus(id, status) {
    if (!VALID_STATUSES.includes(status)) {
      throw new Error(`Invalid status "${status}". Must be one of: ${VALID_STATUSES.join(', ')}`);
    }
    const task = this.repo.get(id);
    if (!task) throw new Error(`Task ${id} not found`);
    return this.repo.update(id, { status });
  }

  deleteTask(id) {
    const task = this.repo.get(id);
    if (!task) throw new Error(`Task ${id} not found`);
    this.repo.delete(id);
  }
}
