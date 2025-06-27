import { isValidString } from "../helpers.js";
import { compIcon } from "./icon.js";

// Text Button component
export function compTextButton(obj) {
  let {
    style,
    size,
    label = "Button",
    icon = null,
    trailingIcon = null,
    type,
    action,
  } = obj;

  // Create button
  const button = document.createElement("a");
  button.classList.add("button");

  // Button size
  if (size) {
    button.classList.add(`button__${size}`);
  }

  // Button hierarchy
  if (isValidString(style)) {
    button.classList.add(`button__${style}`);
  }

  // Button type
  button.classList.add("text-button");

  // Button label
  const buttonLabel = document.createElement("p");
  buttonLabel.classList.add("text-button__label");
  buttonLabel.innerHTML = label;

  button.append(buttonLabel);

  // Leading icon
  if (icon) {
    let buttonLeadingIcon = compIcon(
      icon,
      ["button__icon"],
      ["text-button__icon-wrap", "text-button__icon-leading"]
    );
    button.append(buttonLeadingIcon);
  }

  // Trailing icon
  if (trailingIcon) {
    let buttonTrailingIcon = compIcon(
      trailingIcon,
      ["button__icon"],
      ["text-button__icon-wrap", "text-button__icon-trailing"]
    );
    button.append(buttonTrailingIcon);
  }

  if (type && isValidString(type)) {
    button.setAttribute("type", type);
  }

  if (action) {
    if (typeof action === "function") {
      button.addEventListener("click", action);
    }
  }

  return button;
}

// Icon Button component

export function compIconButton(obj) {
  let { style, size, icon = null, type, action } = obj;

  // Create button
  const iconButton = document.createElement("a");
  iconButton.classList.add("button");

  // Button size
  if (size) {
    iconButton.classList.add(`button__${size}`);
  }

  // Button hierarchy
  if (isValidString(style)) {
    iconButton.classList.add(`button__${style}`);
  }

  // Button type
  iconButton.classList.add("icon-button");

  // Icon
  if (icon) {
    let iconButtonIcon = compIcon(
      icon,
      ["button__icon"],
      ["icon-button__icon-wrap"]
    );
    iconButton.append(iconButtonIcon);
  }

  if (type && isValidString(type)) {
    button.setAttribute("type", type);
  }

  if (action) {
    if (typeof action === "function") {
      iconButton.addEventListener("click", action);
    }
  }

  return iconButton;
}

// Global Button component
// Used to generate Text Button or Icon Button
export function compButton(obj) {
  let { button } = obj;
  if (isValidString(button)) {
    let value = button.toLowerCase();
    if (value == "text") return compTextButton(obj);
    if (value == "icon") return compIconButton(obj);
  } else {
    return compTextButton(obj);
  }
}
