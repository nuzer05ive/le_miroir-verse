// Simple utility
export function generateUUID() {
  return crypto.randomUUID?.() || 'uuid-' + Math.random().toString(16).slice(2);
}
