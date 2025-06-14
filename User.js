import {
  isValidType,
  isValidString,
  normalizeToArray,
  typeCollection,
} from "./Helpers.js";

// Individual user object
export function userItem(name, title, team) {
  const type = "UserItem";
  // Consider adding some boolean property, eg. isAdmin
  return {
    type: type,
    name: isValidString(name) ? name : null,
    title: isValidString(title) ? title : null,
    team: team,
    isValid() {
      return isValidString(this.name) && this.team && this.team?.isValid();
    },
  };
}

// Collection of user items
export function userCollection(arr = []) {
  let users = typeCollection(arr, (obj) =>
    isValidType(obj, "UserItem", () => obj?.isValid())
  );
  return {
    type: "TeamItem",
    users: users,
    addUser(obj) {
      normalizeToArray(obj).forEach((item) => {
        if (isValidType(item, "UserItem", () => item?.isValid()))
          this.users.add(item);
      });
    },
    deleteUser(obj) {},
    hasUser(obj) {},
    getUser(obj) {},
    getAllUsers() {},
  };
}

// export function checkValidUserItem(obj) {
//   return (
//     obj?.type === "UserItem" &&
//     typeof obj.isValidUserItem === "function" &&
//     obj.isValidUserItem()
//   );
// }
