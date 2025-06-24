import { isValidString, normalizeToArray } from "./helpers.js";

// Individual user item
export function userItem(name, title, team) {
  const type = "UserItem";
  return {
    type: type,
    name: isValidString(name) ? name : null,
    title: isValidString(title) ? title : null,
    team: team,
    isValid() {
      return (
        this.name &&
        this.team &&
        this.team?.type === "TeamItem" &&
        this.team?.isValid()
      );
    },
  };
}

// Tracks the users assigned to an individual task item
// Expects a typeCollection for teams and users
export function assigneeInstance(users, teams, arr = []) {
  let assignee = new Set();
  arr.forEach((item) => {
    if (users?.hasItem(item) && teams.hasItem(item?.team)) assignee.add(item);
  });
  return {
    getAssignee() {
      return [...assignee];
    },
    hasAssignee(val) {
      return [...assignee].find((item) => item === val);
    },
    setAssignee(val) {
      normalizeToArray(val).forEach((item) => {
        if (users?.hasItem(item)) assignee.add(item);
      });
    },
    removeAssignee(val) {
      normalizeToArray(val).forEach((item) => assignee.delete(item));
    },
    clearAssignee() {
      assignee.clear();
    },
    listAllUsers() {
      return users?.getAllItems();
    },
    listAllTeams() {
      return teams?.getAllItems();
    },
  };
}
