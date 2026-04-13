// Plain data class — no DB logic, no business logic.
export class Note {
  constructor({ id, title, body, created_at, updated_at }) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.createdAt = created_at;
    this.updatedAt = updated_at;
  }
}
