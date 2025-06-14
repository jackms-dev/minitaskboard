// Helper.js
//
// A script file of helper function for frequent
// validation checks and data transformations
//

// Helper function to return an object as an array
// if it's not already.
export function normalizeToArray(val) {
  return Array.isArray(val) ? val : [val];
}

// Checks if obj is iterable
export function isIterable(obj) {
  if (obj == null) return false;
  return typeof obj[Symbol.iterator] === "function";
}

// Check if the parameter is a string with a length > 0.
export function isValidString(str) {
  return str && typeof str === "string" && str.length;
}

// Takes a source (object), type (string), and validation function to
// check if an item matches the type and passes its own validation
// criteria.
export function isValidType(source, type, valFn) {
  if (
    !source ||
    !type ||
    !isValidString(type) ||
    !valFn ||
    typeof valFn !== "function"
  )
    throw new Error(
      "Invalid: Accepts a source (object or iterable), a type (string), and a validation function."
    );
  // Don't need typeof valFn here
  return source?.type === type && typeof valFn === "function" && valFn();
}

// Takes a source (object or iterable), and validation
// function and create a new Set, filtered by the
// validation function.
export function typeCollection(source, valFn) {
  if (!source || !valFn || typeof valFn !== "function")
    throw new Error(
      "Invalid: Accepts a source (object) and a validation function."
    );
  let set = new Set();
  normalizeToArray(source)
    .filter((item) => valFn(item))
    .forEach((item) => set.add(item));
  return set;
}
