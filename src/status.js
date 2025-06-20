import { isValidString } from "./helpers.js";

// Individual status item
export function statusItem(name, group) {
  const type = "StatusItem";
  return {
    type: type,
    name: isValidString(name) ? name : null,
    group: group,
    isValid() {
      return Boolean(
        this.name &&
          this.group &&
          this.group?.type === "GroupItem" &&
          this.group?.isValid()
      );
    },
  };
}

// Tracks the status on an individual task item
// Expects a typeCollection for groups and statuses
export function statusInstance(groups, statuses, currentStatus) {
  let status = null;
  if (
    currentStatus &&
    statuses?.hasItem(currentStatus) &&
    groups?.hasItem(currentStatus?.group)
  )
    status = currentStatus;
  return {
    getStatus() {
      return status?.name;
    },
    setStatus(val) {
      // Consider throwing an error for easier debugging
      if (statuses?.hasItem(val) && groups?.hasItem(val.group)) status = val;
    },
    clearStatus() {
      status = null;
    },
    getGroup() {
      return status?.group?.name;
    },
    listAllStatuses() {
      return statuses?.getAllItems();
    },
    listAllGroups() {
      return groups?.getAllItems();
    },
  };
}
