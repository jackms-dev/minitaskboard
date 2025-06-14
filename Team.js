import {
  isValidType,
  isValidString,
  normalizeToArray,
  typeCollection,
} from "./Helpers.js";

export function teamItem(name, arr = []) {
  const type = "TeamItem";
  let users = typeCollection(arr, "UserItem", checkValidUserItem);
  return {
    type: type,
    name: isValidString(name) ? name : null,
    users: users,
    isValid() {
      return isValidString(this.name);
    },
  };
}
