import {
  isValidType,
  isValidString,
  normalizeToArray,
  typeCollection,
} from "./Helpers.js";

// Individual group item
export function groupItem(name) {
  const type = "GroupItem";
  return {
    type: type,
    name: isValidString(name) ? name : null,
    isValid() {
      return isValidString(this.name);
    },
  };
}

// Collection of groups
export function groupCollection(arr = []) {
  // Create a filtered Set of group items that pass type and validity checks
  let groups = typeCollection(arr, (obj) =>
    isValidType(obj, "GroupItem", () => obj?.isValid())
  );
  return {
    groups: groups,
    addGroup(obj) {
      normalizeToArray(obj).forEach((item) => {
        if (checkValidGroupItem(item)) this.groups.add(item);
      });
    },
    deleteGroup(obj) {
      normalizeToArray(obj).forEach((group) => this.groups.delete(group));
    },
    hasGroup(group) {
      return this.groups.has(group);
    },
    getGroup(group) {
      return [...this.groups].find((item) => item === group);
    },
    getAllGroups() {
      return [...this.groups];
    },
  };
}
