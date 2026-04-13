import { createContext, useContext, useEffect, useState } from 'react';

const NoteContext = createContext(null);

export function NoteProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Which note is open in the editor.
  const [selectedNoteId, setSelectedNoteId] = useState(null);

  useEffect(() => {
    window.api.notes
      .getAll()
      .then(setNotes)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  async function addNote() {
    const note = await window.api.notes.create({ title: 'Untitled', body: '' });
    setNotes((prev) => [note, ...prev]);
    // Immediately open the new note for editing.
    setSelectedNoteId(note.id);
  }

  async function updateNote(id, data) {
    const updated = await window.api.notes.update(id, data);
    setNotes((prev) => prev.map((n) => (n.id === id ? updated : n)));
  }

  async function deleteNote(id) {
    await window.api.notes.delete(id);
    setNotes((prev) => prev.filter((n) => n.id !== id));
    // Deselect if the deleted note was open.
    if (selectedNoteId === id) setSelectedNoteId(null);
  }

  const selectedNote = notes.find((n) => n.id === selectedNoteId) ?? null;

  return (
    <NoteContext.Provider
      value={{
        notes,
        loading,
        error,
        selectedNote,
        setSelectedNoteId,
        addNote,
        updateNote,
        deleteNote,
      }}
    >
      {children}
    </NoteContext.Provider>
  );
}

export function useNotes() {
  const ctx = useContext(NoteContext);
  if (!ctx) throw new Error('useNotes must be used inside <NoteProvider>');
  return ctx;
}
