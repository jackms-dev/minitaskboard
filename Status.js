import {
  isValidType,
  isValidString,
  normalizeToArray,
  typeCollection,
} from "./Helpers.js";

import { groupItem } from "./Group.js";

// Individual status item
export function statusItem(name, group) {
  const type = "StatusItem";
  return {
    type: type,
    name: name,
    group: group,
    isValid() {
      return isValidString(this.name) && this.group?.type === "GroupItem";
    },
  };
}

// Collection of status items
export function statusCollection(arr = []) {
  // Create a filtered Set of status items that pass type and validity checks
  let statuses = typeCollection(arr, (obj) =>
    isValidType(obj, "StatusItem", () => obj?.isValid())
  );
  return {
    statuses: statuses,
    addStatus(obj) {
      normalizeToArray(obj).forEach((item) => {
        if (isValidType(item, "StatusItem", () => item?.isValid()))
          this.statuses.add(item);
      });
    },
    deleteStatus(obj) {
      normalizeToArray(obj).forEach((item) => this.statuses.delete(item));
    },
    hasStatus(status) {
      return this.statuses.has(status);
    },
    getStatus(status) {
      return [...this.statuses].find((item) => item === status);
    },
    getAllStatuses() {
      return [...this.statuses];
    },
  };
}

// Tracks the status on an individual task item
export function statusInstance(groups, statuses) {
  let status = null;
  return {
    getStatus() {
      return status;
    },
    setStatus(val) {
      // Consider throwing an error for easier debugging
      if (statuses?.hasStatus(val) && groups?.hasGroup(val.group)) status = val;
    },
    clearStatus() {
      status = null;
    },
    listStatuses() {
      return statuses?.getAllStatuses();
    },
    listGroups() {
      return groups?.getAllGroups();
    },
  };
}

let group1 = groupItem("Group 1");
let group2 = groupItem("Group 2");
let group3 = groupItem(undefined);
let group4 = groupItem("Group 4");

let status1 = statusItem("Poo", group1);
let status2 = statusItem("Foo", group2);
let status3 = statusItem(0, group3);
let status4 = statusItem("Nice", group4);

let allStatuses = [status1, status2, status3];

let statusCol = statusCollection(allStatuses);
statusCol.addStatus(status4);

console.log(statusCol);
