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
