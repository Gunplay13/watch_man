// formatDate — shared date/time formatting for logs and cards.
export function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleString();
}
