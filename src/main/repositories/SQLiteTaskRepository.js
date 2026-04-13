import { IRepository } from './IRepository.js';
import { Task } from '../models/Task.js';
import { getDb } from '../db.js';

export class SQLiteTaskRepository extends IRepository {
  get(id) {
    const row = getDb().prepare('SELECT * FROM tasks WHERE id = ?').get(id);
    if (!row) return null;
    return new Task(row);
  }

  getAll() {
    return getDb()
      .prepare('SELECT * FROM tasks ORDER BY created_at DESC')
      .all()
      .map((row) => new Task(row));
  }

  create(data) {
    const now = Date.now();
    const info = getDb()
      .prepare(
        'INSERT INTO tasks (title, status, created_at, updated_at) VALUES (?, ?, ?, ?)'
      )
      .run(data.title, data.status ?? 'Todo', now, now);
    return this.get(info.lastInsertRowid);
  }

  update(id, data) {
    const now = Date.now();
    // Build SET clause from the fields the caller actually provides.
    const fields = Object.keys(data)
      .map((k) => `${k} = ?`)
      .join(', ');
    const values = [...Object.values(data), now, id];
    getDb()
      .prepare(`UPDATE tasks SET ${fields}, updated_at = ? WHERE id = ?`)
      .run(...values);
    return this.get(id);
  }

  delete(id) {
    getDb().prepare('DELETE FROM tasks WHERE id = ?').run(id);
  }
}
