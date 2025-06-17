import { isValidString } from "./Helpers.js";

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
