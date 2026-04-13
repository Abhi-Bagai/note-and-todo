// Plain data class — no DB logic, no business logic.
// Repositories produce these; services and IPC handlers consume them.
export class Task {
  constructor({ id, title, status, created_at, updated_at }) {
    this.id = id;
    this.title = title;
    this.status = status;
    // Normalise snake_case from SQLite rows to camelCase for JS callers.
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }
}
