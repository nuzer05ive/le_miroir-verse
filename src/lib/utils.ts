// Simple utility
export function generateUUID(): string {
  return crypto.randomUUID?.() || 'uuid-' + Math.random().toString(16).slice(2);
}
