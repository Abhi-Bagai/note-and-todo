import { useNotes } from '../../context/NoteContext.jsx';
import { ViewToggle } from '../ui/ViewToggle.jsx';
import { formatDate } from '../../utils/formatDate.js';

const VIEWS = [
  {
    id: 'list',
    label: 'List view',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        className="w-4 h-4">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
        <line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" />
        <line x1="3" y1="18" x2="3.01" y2="18" />
      </svg>
    ),
  },
  {
    id: 'grid',
    label: 'Grid view',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
        className="w-4 h-4">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
      </svg>
    ),
  },
];

export function NoteGrid({ view, onViewChange }) {
  const { notes, loading, error, selectedNote, setSelectedNoteId, addNote, deleteNote } = useNotes();

  if (loading) return <p className="p-6 text-sm text-gray-400">Loading notes…</p>;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800 shrink-0">
        <h2 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">Notes</h2>
        <div className="flex items-center gap-2">
          <ViewToggle views={VIEWS} active={view} onChange={onViewChange} />
          <button
            onClick={addNote}
            className="text-blue-400 hover:text-blue-300 text-xl leading-none transition-colors"
            aria-label="New note"
            title="New note"
          >
            +
          </button>
        </div>
      </div>

      {error && <p className="px-6 py-2 text-xs text-red-400">Error: {error}</p>}

      {notes.length === 0 ? (
        <p className="px-6 py-8 text-sm text-gray-500">No notes yet. Click + to create one.</p>
      ) : (
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 auto-rows-[minmax(8rem,auto)]">
            {notes.map((note) => {
              const isSelected = selectedNote?.id === note.id;
              return (
                <div
                  key={note.id}
                  onClick={() => setSelectedNoteId(note.id)}
                  className={`group relative flex flex-col rounded-lg p-4 cursor-pointer
                    bg-gray-800 border transition-colors
                    ${isSelected
                      ? 'border-blue-500 ring-1 ring-blue-500'
                      : 'border-gray-700/50 hover:border-gray-600'}`}
                >
                  {/* Title */}
                  <p className="text-sm font-semibold text-gray-100 truncate mb-1">
                    {note.title || 'Untitled'}
                  </p>

                  {/* Body preview */}
                  <p className="text-xs text-gray-400 leading-relaxed line-clamp-4 flex-1">
                    {note.body || <span className="italic text-gray-600">Empty note</span>}
                  </p>

                  {/* Created date */}
                  <p className="text-xs text-gray-500 mt-2 shrink-0">{formatDate(note.createdAt)}</p>

                  {/* Delete — revealed on hover */}
                  <button
                    onClick={(e) => { e.stopPropagation(); deleteNote(note.id); }}
                    className="absolute top-2 right-2 opacity-0 group-hover:opacity-100
                               text-gray-600 hover:text-red-400 transition-opacity text-xs"
                    aria-label="Delete note"
                  >
                    ✕
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
