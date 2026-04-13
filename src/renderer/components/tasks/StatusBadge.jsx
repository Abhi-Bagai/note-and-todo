// Color mapping kept co-located with the component so it's easy to restyle.
const STATUS_STYLES = {
  'Todo':        'bg-gray-600 text-gray-100',
  'In Progress': 'bg-blue-600 text-white',
  'Urgent':      'bg-red-600  text-white',
  'Completed':   'bg-green-600 text-white',
};

export function StatusBadge({ status }) {
  const classes = STATUS_STYLES[status] ?? 'bg-gray-500 text-white';
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${classes}`}>
      {status}
    </span>
  );
}
