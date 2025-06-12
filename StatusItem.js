// Individual status item
export function statusItem(name, group) {
  const type = "StatusItem";

  return {
    type: type,
    name: name,
    group: group,
    isValidStatus() {
      return (
        typeof this.name === "string" &&
        this.name.length &&
        this.group?.type === "GroupItem"
      );
    },
  };
}
