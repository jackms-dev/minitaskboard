// Helper function to return an object as an array if it's not already

export function normalizeToArray(val) {
  return Array.isArray(val) ? val : [val];
}
