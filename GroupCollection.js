import { normalizeToArray } from "./normalizeToArray.js";

// Collection of groups
export function groupCollection(g = []) {
  const checkValidGroupItem = (obj) => {
    return (
      obj?.type === "GroupItem" &&
      typeof obj.isValidGroup === "function" &&
      obj.isValidGroup()
    );
  };

  let groups = new Set();

  g.filter((item) => checkValidGroupItem(item)).forEach((item) =>
    groups.add(item)
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
