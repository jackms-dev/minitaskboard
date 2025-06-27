import { isValidString, cssClasses } from "../helpers.js";
import { compIcon } from "./icon.js";

const colors = [
  "gray",
  "red",
  "orange",
  "yellow",
  "green",
  "teal",
  "blue",
  "purple",
  "pink",
  "brown",
];

// Chip component

export function compChip(obj) {
  let { name, icon, color, style, classes = [] } = obj;

  // Create chip
  const chip = document.createElement("div");
  chip.classList.add("chip");

  // Add label
  const chipLabel = document.createElement("p");
  chipLabel.classList.add("label", "chip__label");
  chipLabel.innerText = name;

  // Add optional icon
  if (icon) {
    const chipIcon = compIcon(icon, ["chip__icon"], ["chip__icon-wrap"]);
    chip.append(chipIcon);
  }

  chip.append(chipLabel);

  // Add colors
  if (isValidString(color)) {
    if (colors.find((item) => item === color)) {
      chip.classList.add(`chip__${color}`);
    }
  }

  // Chip style
  if (style) {
    if (!isValidString(style))
      console.error(
        `Invalid: style should be a string ("round" or "square") in renderChip(label, icon, color, style, classes = [])`
      );
    if (style == "square") chip.classList.add("chip__square");
    if (style == "round") chip.classList.add("chip__round");
  }

  // Add custom classes
  chip.classList.add(...cssClasses(classes));

  return chip;
}
