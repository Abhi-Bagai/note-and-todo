// Reusable view-mode switcher — renders a row of small icon buttons.
// The active button is highlighted blue; all others are muted grey.
export function ViewToggle({ views, active, onChange }) {
  return (
    <div className="flex items-center gap-0.5">
      {views.map(({ id, icon, label }) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          title={label}
          aria-label={label}
          className={`p-1.5 rounded transition-colors
            ${active === id
              ? 'text-blue-400 bg-gray-700'
              : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'}`}
        >
          {icon}
        </button>
      ))}
    </div>
  );
}
