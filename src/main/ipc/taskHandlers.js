import { ipcMain } from 'electron';
import { SQLiteTaskRepository } from '../repositories/SQLiteTaskRepository.js';
import { TaskService } from '../services/TaskService.js';

// Instantiated once; the repository reuses the singleton DB connection.
const service = new TaskService(new SQLiteTaskRepository());

export function registerTaskHandlers() {
  // Handlers are intentionally thin — all validation and logic lives in the service.
  ipcMain.handle('tasks:getAll',       ()            => service.getAllTasks());
  ipcMain.handle('tasks:create',       (_, data)     => service.createTask(data));
  ipcMain.handle('tasks:updateStatus', (_, id, status) => service.updateStatus(id, status));
  ipcMain.handle('tasks:delete',       (_, id)       => service.deleteTask(id));
}
