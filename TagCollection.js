import { normalizeToArray } from "./normalizeToArray.js";

// Collection of tag items
export function tagCollection(t = []) {
  function checkValidTag(obj) {
    return (
      obj?.type === "TagItem" &&
      typeof obj.isValidTagItem === "function" &&
      obj.isValidTagItem()
    );
  }

  let tags = new Set();

  t.filter((item) => checkValidTag(item)).forEach((item) => tags.add(item));

  return {
    tags: tags,
    addTag(obj) {
      normalizeToArray(obj).forEach((item) => {
        if (checkValidTag(item)) this.tags.add(item);
      });
    },
    deleteTag(obj) {
      normalizeToArray(obj).forEach((item) => this.tags.delete(item));
    },
    hasTag(obj) {
      return this.tags.has(obj);
    },
    clearTags() {
      this.tags.clear();
    },
    getAllTags() {
      return [...this.tags];
    },
  };
}
