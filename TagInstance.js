import { normalizeToArray } from "./normalizeToArray.js";

// Tracks the tags on an individual task item
export function tagInstance(tagCollection, t = []) {
  let tags = new Set();
  t.forEach((item) => {
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
