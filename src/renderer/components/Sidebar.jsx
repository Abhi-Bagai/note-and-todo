// Nav rail — a narrow vertical strip that switches the active view.
// State lives in App so the active view can control what renders in the main area.

const NAV_ITEMS = [
  {
    id: 'notes',
    label: 'Notes',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"
        className="w-5 h-5">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
      </svg>
    ),
  },
  {
    id: 'tasks',
    label: 'Tasks',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round"
        className="w-5 h-5">
        <polyline points="9 11 12 14 22 4" />
        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
      </svg>
    ),
  },
];

export function Sidebar({ activeView, onViewChange }) {
  return (
    <aside className="flex flex-col w-16 shrink-0 bg-gray-950 border-r border-gray-800">
      {/* App mark */}
      <div className="flex items-center justify-center h-14 border-b border-gray-800">
        <span className="text-blue-400 font-bold text-lg select-none">N</span>
      </div>

      {/* Nav buttons */}
      <nav className="flex flex-col items-center gap-1 pt-3">
        {NAV_ITEMS.map(({ id, label, icon }) => {
          const isActive = activeView === id;
          return (
            <button
              key={id}
              onClick={() => onViewChange(id)}
              title={label}
              aria-label={label}
              className={`flex flex-col items-center gap-1 w-12 py-2.5 rounded-lg text-xs
                transition-colors duration-100
                ${isActive
                  ? 'bg-gray-800 text-blue-400'
                  : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'}`}
            >
              {icon}
              <span>{label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
