import { isValidString, normalizeToArray } from "./helpers.js";

// Individual tag item
export function tagItem(label, color) {
  const type = "TagItem";
  return {
    type: type,
    label: isValidString(label) ? label : null,
    color: isValidString(color) ? color : null,
    isValid() {
      return isValidString(this.label);
    },
  };
}

// Tracks the tags on an individual task item
export function tagInstance(tagCollection, arr = []) {
  let tags = new Set();
  arr.forEach((item) => {
    if (tagCollection?.hasItem(item)) {
      tags.add(item);
    }
  });
  return {
    getTags() {
      return [...tags];
    },
    setTags(obj) {
      normalizeToArray(obj).forEach((item) => {
        if (tagCollection?.hasTag(item)) {
          tags.add(item);
        }
        if (
          !tagCollection?.hasItem(item) &&
          item?.type === "TagItem" &&
          item.isValid()
        ) {
          tagCollection.addItem(item);
          tags.add(item);
        }
      });
    },
    clearTags() {
      tags.clear();
    },
    listTags() {
      return tagCollection?.getAllItems();
    },
  };
}
