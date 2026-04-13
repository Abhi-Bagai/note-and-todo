// Formats a Unix-millisecond timestamp using the system locale.
// Example output: "Apr 13, 2026, 6:30 PM"
export function formatDate(ms) {
  return new Date(ms).toLocaleString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}
