import Database from 'better-sqlite3';
import { app } from 'electron';
import path from 'path';

let db;

// Returns the singleton DB connection, opening it on first call.
// app.getPath('userData') resolves to %APPDATA%\notes-todo-app on Windows.
export function getDb() {
  if (db) return db;

  const dbPath = path.join(app.getPath('userData'), 'notes-todo.db');
  db = new Database(dbPath);

  // WAL mode gives better read concurrency — readers don't block writers.
  db.pragma('journal_mode = WAL');

  createTables(db);
  return db;
}

function createTables(db) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS tasks (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      title      TEXT    NOT NULL,
      status     TEXT    NOT NULL DEFAULT 'Todo',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS notes (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      title      TEXT    NOT NULL,
      body       TEXT    NOT NULL DEFAULT '',
      created_at INTEGER NOT NULL,
      updated_at INTEGER NOT NULL
    );
  `);
}
