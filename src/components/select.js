import {
  capitalizeString,
  isValidString,
  normalizeToArray,
} from "../helpers.js";
import { compChip } from "./chip.js";
import { compIcon } from "./icon.js";
import { Check } from "https://cdn.skypack.dev/lucide";

// Select Item

export function compSelectItem(obj) {
  let { type, data, onSelect, name, multiple } = obj;

  // Option wrapper
  let optionWrap = document.createElement("div");
  optionWrap.classList.add("select-item__option-wrapper");

  // Option
  let option = document.createElement("div");
  option.classList.add("select-item__option");

  let normalizeType = type.toLowerCase();

  if (normalizeType == "text") {
    option.innerHTML = capitalizeString(data?.name);
  } else if (normalizeType == "chip") {
    // Data shape of compChip
    option.append(
      compChip({
        name: data?.name,
        icon: data?.icon,
        color: data?.color,
        style: data?.style,
        classes: "chip__tag",
      })
    );
  } else {
    option.innerHTML = name;
  }

  let selectedFlag = compIcon(Check, ["input__icon"], ["input__icon-wrap"]);

  optionWrap.append(option, selectedFlag);

  // Set action
  // Returns the item that was clicked
  optionWrap.addEventListener("click", () => onSelect(data));

  return optionWrap;
}

// Select

export function compSelect(obj) {
  let { value, id, type, name, icon, multiple, data = [], action, copy } = obj;

  // Input group wrapper
  let inputSet = document.createElement("div");
  inputSet.classList.add("input-set");

  // Select wrapper
  let inputWrap = document.createElement("div");
  inputWrap.classList.add("input__wrap");

  // Create select
  let select = document.createElement("div");

  // Select id
  if (id && isValidString(id)) select.id = id;

  // Add class
  select.classList.add("select");

  // Add options
  if (data && Array.isArray(data)) {
    for (let item of data) {
      let selectItem = compSelectItem({
        type: type,
        data: item?.data,
        onSelect: action,
        // name: item?.name,
        // type: item?.type,
        // compProps: item?.compProps,
      });
      select.append(selectItem);
    }
  }

  // Value
  if (value) {
    let selectValue = document.createElement("div");
    selectValue.classList.add("select__value", "select__select-value-group");
    if (typeof multiple === "boolean" && multiple) {
      normalizeToArray(value).forEach((item) => {
        selectValue.append(compChip(item));
      });
    } else {
      selectValue.append(value);
    }
    inputWrap.append(selectValue);
  }

  // Icon
  if (icon) {
    let inputIcon = compIcon(icon, ["input__icon"], ["input__icon-wrap"]);
    inputWrap.append(inputIcon);
  }

  inputWrap.append(select);
  inputSet.append(inputWrap);

  // Add supporting copy
  if (copy && isValidString(copy)) {
    let supportingCopy = document.createElement("p");
    supportingCopy.classList.add("input__supporting-copy");
    supportingCopy.innerHTML = copy;
    inputSet.append(supportingCopy);
  }

  return inputSet;
}
