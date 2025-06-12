// Tracks the status on an individual task item
export function statusIntance(groups, statuses) {
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
