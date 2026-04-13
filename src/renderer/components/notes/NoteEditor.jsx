import { useEffect, useRef, useState } from 'react';
import { useNotes } from '../../context/NoteContext.jsx';

export function NoteEditor() {
  const { selectedNote, updateNote } = useNotes();

  // Local state so keystrokes are instant; IPC only fires on blur.
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  // Track what was last persisted so we only call IPC when something changed.
  const savedRef = useRef({ title: '', body: '' });

  // Sync local state whenever a different note is selected.
  useEffect(() => {
    if (!selectedNote) return;
    setTitle(selectedNote.title);
    setBody(selectedNote.body);
    savedRef.current = { title: selectedNote.title, body: selectedNote.body };
  }, [selectedNote?.id]); // intentionally only on id change, not every update

  if (!selectedNote) {
    return (
      <div className="flex flex-1 items-center justify-center text-gray-500 text-sm select-none">
        Select a note or create one to start editing.
      </div>
    );
  }

  async function handleTitleBlur() {
    if (title === savedRef.current.title) return;
    savedRef.current.title = title;
    await updateNote(selectedNote.id, { title });
  }

  async function handleBodyBlur() {
    if (body === savedRef.current.body) return;
    savedRef.current.body = body;
    await updateNote(selectedNote.id, { body });
  }

  return (
    <div className="flex flex-col h-full">
      {/* Title */}
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleTitleBlur}
        placeholder="Title"
        className="w-full bg-transparent px-6 pt-6 pb-2 text-xl font-semibold text-gray-100
                   placeholder-gray-600 focus:outline-none"
      />

      {/* Divider */}
      <div className="mx-6 border-t border-gray-800" />

      {/* Body */}
      <textarea
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onBlur={handleBodyBlur}
        placeholder="Write something…"
        className="flex-1 resize-none bg-transparent px-6 py-4 text-sm text-gray-200
                   placeholder-gray-600 focus:outline-none leading-relaxed"
      />
    </div>
  );
}
