// Individual group item
export function groupItem(name) {
  const type = "GroupItem";

  return {
    type: type,
    name: name,
    isValidGroup() {
      return typeof this.name === "string" && this.name.length;
    },
  };
}
