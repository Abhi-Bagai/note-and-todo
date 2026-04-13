import { IRepository } from './IRepository.js';
import { Note } from '../models/Note.js';
import { getDb } from '../db.js';

export class SQLiteNoteRepository extends IRepository {
  get(id) {
    const row = getDb().prepare('SELECT * FROM notes WHERE id = ?').get(id);
    if (!row) return null;
    return new Note(row);
  }

  getAll() {
    return getDb()
      .prepare('SELECT * FROM notes ORDER BY updated_at DESC')
      .all()
      .map((row) => new Note(row));
  }

  create(data) {
    const now = Date.now();
    const info = getDb()
      .prepare(
        'INSERT INTO notes (title, body, created_at, updated_at) VALUES (?, ?, ?, ?)'
      )
      .run(data.title, data.body ?? '', now, now);
    return this.get(info.lastInsertRowid);
  }

  update(id, data) {
    const now = Date.now();
    const fields = Object.keys(data)
      .map((k) => `${k} = ?`)
      .join(', ');
    const values = [...Object.values(data), now, id];
    getDb()
      .prepare(`UPDATE notes SET ${fields}, updated_at = ? WHERE id = ?`)
      .run(...values);
    return this.get(id);
  }

  delete(id) {
    getDb().prepare('DELETE FROM notes WHERE id = ?').run(id);
  }
}
