// Individual tag item
export function tagItem(label) {
  const type = "TagItem";
  return {
    type: type,
    label: label,
    isValidTagItem() {
      return typeof label === "string" && label.length;
    },
  };
}
