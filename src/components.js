import { isValidString, normalizeToArray } from "./helpers.js";
import { createElement } from "https://cdn.skypack.dev/lucide";

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

// Helper function for adding CSS classes

export function cssClasses(classes = []) {
  return normalizeToArray(classes).filter((item) => isValidString(item));
}

// Helper functions for icons

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

export function compIconWrap(classes = []) {
  const wrap = document.createElement("div");
  wrap.classList.add("icon-wrap");
  wrap.classList.add(...cssClasses(classes));
  return wrap;
}

// Chip component

export function compChip(obj) {
  let { label, icon, color, style, classes = [] } = obj;

  // Create chip
  const chip = document.createElement("div");
  chip.classList.add("chip");

  // Add label
  const chipLabel = document.createElement("p");
  chipLabel.classList.add("label", "chip__label");
  chipLabel.innerText = label;

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

// Input

export function compInput(obj) {
  let { type, id, name, label, icon, copy } = obj;

  // Input group wrapper
  let inputSet = document.createElement("div");
  inputSet.classList.add("input-set");

  // Input wrapper
  let wrapper = document.createElement("div");
  wrapper.classList.add("input__wrap");

  // Create input
  let input = document.createElement("input");

  // Input id
  if (id && isValidString(id)) input.id = id;

  // Set name
  if (name && isValidString(name)) input.name = name;

  // Set input type
  if (type && isValidString(type)) input.setAttribute("type", type);

  // Add class
  input.classList.add("input", `input__${type}`);

  // Label
  if (label && isValidString(label)) {
    let inputLabel = document.createElement("label");
    inputLabel.classList.add("input__label");

    if (name && isValidString(name)) inputLabel.htmlFor = name;

    let inputLabelText = document.createElement("p");
    inputLabelText.classList.add("input__label-text");
    inputLabelText.innerHTML = label;

    inputLabel.append(inputLabelText);
    wrapper.append(inputLabel);
  }

  // Icon
  if (icon) {
    let inputIcon = compIcon(icon, ["input__icon"], ["input__icon-wrap"]);
    wrapper.append(inputIcon);
  }

  wrapper.append(input);
  inputSet.append(wrapper);

  // Add supporting copy
  if (copy && isValidString(copy)) {
    let supportingCopy = document.createElement("p");
    supportingCopy.classList.add("input__supporting-copy");
    supportingCopy.innerHTML = copy;
    inputSet.append(supportingCopy);
  }

  return inputSet;
}

// Select

export function compSelect(obj) {
  let { id, name, label, icon, multiple, options = [], copy } = obj;

  // Input group wrapper
  let inputSet = document.createElement("div");
  inputSet.classList.add("input-set");

  // Select wrapper
  let wrapper = document.createElement("div");
  wrapper.classList.add("input__wrap");

  // Create select
  let select = document.createElement("select");

  // Select id
  if (id && isValidString(id)) select.id = id;

  // Set name
  if (name && isValidString(name)) select.name = name;

  // Add multiple attribute if true
  if (multiple && typeof multiple === "boolean") {
    if (multiple) select.multiple = true;
  }

  // Add class
  select.classList.add("select");

  // Add options
  // [ {value, label} ]
  if (options && Array.isArray(options)) {
    for (let item of options) {
      let { value, label } = item;
      if (value && label && isValidString(value) && isValidString(label)) {
        let option = document.createElement("option");
        option.classList.add("select__option");
        option.value = value;
        option.innerHTML = label;
        select.append(option);
      }
    }
  }

  // Label
  if (label && isValidString(label)) {
    let selectLabel = document.createElement("label");
    selectLabel.classList.add("select__label");

    if (name && isValidString(name)) selectLabel.htmlFor = name;

    let selectLabelText = document.createElement("p");
    selectLabelText.classList.add("select__label-text");
    selectLabelText.innerHTML = label;

    selectLabel.append(selectLabelText);
    wrapper.append(selectLabel);
  }

  // Icon
  if (icon) {
    let inputIcon = compIcon(icon, ["input__icon"], ["input__icon-wrap"]);
    wrapper.append(inputIcon);
  }

  wrapper.append(select);
  inputSet.append(wrapper);

  // Add supporting copy
  if (copy && isValidString(copy)) {
    let supportingCopy = document.createElement("p");
    supportingCopy.classList.add("input__supporting-copy");
    supportingCopy.innerHTML = copy;
    inputSet.append(supportingCopy);
  }

  return inputSet;
}

// Choose component
// I want this to work like Notion
// Hover over the placeholder data, click to reveal a menu, select items and update the items in the chooser wrap

// data is what chooser handles
// placeholder is the default message if not value is set
// label is the title on the menu

// It will need to track and update the "state" ie. show the selected values in both the menu and the chooser.
export function chooser(obj) {
  let { data, placeholder, label } = obj;

  let chooserWrap = document.createElement("div");
  chooserWrap.classList.add("chooser__wrap");

  let menu = document.createElement("div");
  menu.classList.add("menu__wrap");

  function clickChooser() {}
}
