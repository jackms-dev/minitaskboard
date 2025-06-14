import {
  isValidType,
  isValidString,
  normalizeToArray,
  typeCollection,
} from "./Helpers.js";

export function createTypeCollection(isName, arr = []) {
  const thisName = isValidString(isName) ? isName : null;
  const collection = typeCollection(arr, (obj) =>
    isValidType(obj, thisName, () => obj?.isValid())
  );
  return {
    name: thisName,
    collection: collection,
    add(obj) {
      normalizeToArray(obj).forEach((item) => {
        if (isValidType(item, this.name, () => item?.isValid()))
          this.collection.add(item);
      });
    },
    delete(obj) {
      normalizeToArray(obj).forEach((item) => this.collection.delete(obj));
    },
    has(obj) {
      return this.collection.has(obj);
    },
    get(obj) {
      return [...this.collection].find((item) => item === obj);
    },
    getAll() {
      return [...this.collection];
    },
    clear() {
      this.collection.clear();
    },
  };
}
