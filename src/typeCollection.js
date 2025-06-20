import { isValidString, normalizeToArray } from "./helpers.js";

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
  return source?.type === type && valFn();
}

// Takes a source (object or iterable), and validation
// function and create a new Set, filtered by the
// validation function.
export function initializeCollection(source, valFn) {
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

// Generates the type collection and includes methods
// to add, delete, get, etc. items
export function typeCollection(label = null, type, arr = []) {
  return {
    label: isValidString(label) ? label : null,
    type: isValidString(type) ? type : null,
    // Overrelying on the object to declare its type correctly
    collection: initializeCollection(arr, (obj) =>
      isValidType(obj, obj?.type, () => obj?.isValid())
    ),
    addItem(obj) {
      normalizeToArray(obj).forEach((item) => {
        if (isValidType(item, this.name, () => item?.isValid()))
          this.collection.add(item);
      });
    },
    deleteItem(obj) {
      normalizeToArray(obj).forEach((item) => this.collection.delete(item));
    },
    hasItem(obj) {
      return this.collection.has(obj);
    },
    getItem(obj) {
      return [...this.collection].find((item) => item === obj);
    },
    getAllItems() {
      return [...this.collection];
    },
    clearItems() {
      this.collection.clear();
    },
  };
}
