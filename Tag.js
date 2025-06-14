import {
  isValidType,
  isValidString,
  normalizeToArray,
  typeCollection,
} from "./Helpers.js";

// Individual tag item
export function tagItem(label) {
  const type = "TagItem";
  return {
    type: type,
    label: isValidString(label) ? label : null,
    isValid() {
      return isValidString(this.label);
    },
  };
}

// Collection of tag items
export function tagCollection(arr = []) {
  // Create a filtered Set of tag items that pass type and validity checks
  let tags = typeCollection(arr, (obj) =>
    isValidType(obj, "TagItem", () => obj?.isValid())
  );
  return {
    tags: tags,
    addTag(obj) {
      normalizeToArray(obj).forEach((item) => {
        if (checkValidTagItem(item)) this.tags.add(item);
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

// Tracks the tags on an individual task item
export function tagInstance(tagCollection, arr = []) {
  let tags = new Set();
  arr.forEach((item) => {
    if (tagCollection?.hasTag(item)) {
      tags.add(item);
    }
  });
  return {
    getTags() {
      return tags;
    },
    setTags(obj) {
      normalizeToArray(obj).forEach((item) => {
        if (tagCollection?.hasTag(item)) {
          tags.add(item);
        }
        if (
          !tagCollection?.hasTag(item) &&
          item?.type === "TagItem" &&
          item.isValidTagItem()
        ) {
          tagCollection.addTag(item);
          tags.add(item);
        }
      });
    },
    clearTags() {
      tags.clear();
    },
    listTags() {
      return tagCollection?.getAllTags();
    },
  };
}
