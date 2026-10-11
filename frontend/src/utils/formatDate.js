// formatDate — shared date/time formatting for logs and cards.
export function formatDate(isoString) {
  return new Date(isoString).toLocaleString();
}
