import { useNotes } from '../../context/NoteContext.jsx';

export function NoteList() {
  const { notes, loading, error, selectedNote, setSelectedNoteId, addNote, deleteNote } = useNotes();

  if (loading) return <p className="p-4 text-xs text-gray-400">Loading notes…</p>;

  return (
    <div className="flex flex-col h-full">
      {/* Header + new-note button */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Notes</h2>
        <button
          onClick={addNote}
          className="text-blue-400 hover:text-blue-300 text-lg leading-none transition-colors"
          aria-label="New note"
          title="New note"
        >
          +
        </button>
      </div>

      {error && <p className="px-4 py-2 text-xs text-red-400">Error: {error}</p>}

      {notes.length === 0 ? (
        <p className="px-4 py-4 text-xs text-gray-500">No notes yet.</p>
      ) : (
        <ul className="flex-1 overflow-y-auto">
          {notes.map((note) => {
            const isSelected = selectedNote?.id === note.id;
            return (
              <li
                key={note.id}
                className={`group flex items-center gap-1 px-4 py-2.5 cursor-pointer text-sm
                  ${isSelected
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300 hover:bg-gray-800'}`}
                onClick={() => setSelectedNoteId(note.id)}
              >
                <span className="flex-1 truncate">{note.title || 'Untitled'}</span>
                {/* Delete button — visible on hover or when selected */}
                <button
                  onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                  className="opacity-0 group-hover:opacity-100 text-gray-500 hover:text-red-400
                             transition-opacity text-xs shrink-0"
                  aria-label="Delete note"
                >
                  ✕
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
