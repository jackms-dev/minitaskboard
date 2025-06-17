import { isValidString } from "./Helpers.js";

// Individual team item
// For consideration: create a parameter that allows you to add
// an array of users upon initialization
export function teamItem(name) {
  const type = "TeamItem";
  return {
    type: type,
    name: isValidString(name) ? name : null,
    isValid() {
      return isValidString(this.name);
    },
  };
}
