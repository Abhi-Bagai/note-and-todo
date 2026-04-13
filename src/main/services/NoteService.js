export class NoteService {
  constructor(noteRepository) {
    this.repo = noteRepository;
  }

  getAllNotes() {
    return this.repo.getAll();
  }

  createNote({ title, body = '' }) {
    if (!title?.trim()) throw new Error('Note title is required');
    return this.repo.create({ title: title.trim(), body });
  }

  updateNote(id, { title, body }) {
    const note = this.repo.get(id);
    if (!note) throw new Error(`Note ${id} not found`);

    // Only update the fields the caller provided.
    const updates = {};
    if (title !== undefined) updates.title = title.trim();
    if (body !== undefined) updates.body = body;

    return this.repo.update(id, updates);
  }

  deleteNote(id) {
    const note = this.repo.get(id);
    if (!note) throw new Error(`Note ${id} not found`);
    this.repo.delete(id);
  }
}
