import { cssClasses } from "../helpers.js";
import { createElement } from "https://cdn.skypack.dev/lucide";

export function compIconWrap(classes = []) {
  const wrap = document.createElement("div");
  wrap.classList.add("icon-wrap");
  wrap.classList.add(...cssClasses(classes));
  return wrap;
}

export function compIcon(lucideIcon, iconClasses = [], wrapClasses = []) {
  if (!lucideIcon)
    throw new Error(
      "Invalid: icon should be a Lucide icon in renderIconElement(icon, classes = [])"
    );
  // Lucide icon
  const icon = createElement(lucideIcon);
  icon.classList.add("icon");
  icon.classList.add(...cssClasses(iconClasses));

  // Icon wrapper
  const wrap = document.createElement("div");
  wrap.classList.add("icon-wrap");
  wrap.classList.add(...cssClasses(wrapClasses));

  wrap.append(icon);

  return wrap;
}
