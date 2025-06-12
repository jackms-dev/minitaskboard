import { normalizeToArray } from "./normalizeToArray.js";

// Collection of status items
export function statusCollection(s = []) {
  const checkValidStatusItem = (obj) => {
    return (
      obj?.type === "StatusItem" &&
      typeof obj.isValidStatus === "function" &&
      obj.isValidStatus()
    );
  };

  let statuses = new Set();

  s.filter((item) => checkValidStatusItem(item)).forEach((item) =>
    statuses.add(item)
  );

  return {
    statuses: statuses,
    addStatus(obj) {
      normalizeToArray(obj).forEach((item) => {
        if (checkValidStatusItem(item)) this.statuses.add(item);
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
