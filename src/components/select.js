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
  let { type, data, onSelect, isSelected } = obj;

  // Option wrapper
  let optionWrap = document.createElement("div");
  optionWrap.classList.add("select-item__option-wrapper");

  // Option
  let option = document.createElement("div");
  option.classList.add("select-item__option");

  if (type == "text") {
    option.innerHTML = capitalizeString(data?.name);
  } else if (type == "chip") {
    option.append(compChip(data));
  } else {
    option.innerHTML = data;
  }

  let selectedFlag = compIcon(Check, ["input__icon"], ["input__icon-wrap"]);

  if (isSelected) {
    optionWrap.append(option, selectedFlag);
  } else {
    optionWrap.append(option);
  }

  // Returns the item that was clicked
  optionWrap.addEventListener("click", () => onSelect(data));

  return optionWrap;
}

// Select

export function compSelect(obj) {
  let { value, type, icon, action, multiple = false, data = [] } = obj;

  // Input group wrapper
  let inputSet = document.createElement("div");
  inputSet.classList.add("input-set");

  // Select wrapper
  let inputWrap = document.createElement("div");
  inputWrap.classList.add("input__wrap");

  // Create select
  let select = document.createElement("div");
  select.classList.add("select");

  let normalizeType = type.toLowerCase();

  // Add options
  if (data && Array.isArray(data)) {
    for (let item of data) {
      let selectItem = compSelectItem({
        type: normalizeType,
        data: item,
        onSelect: action,
        isSelected: normalizeToArray(value).includes(item),
      });
      select.append(selectItem);
    }
  }

  // Value
  if (value) {
    let selectValue = document.createElement("div");
    selectValue.classList.add("select__value", "select__select-value-group");

    let allValues = normalizeToArray(value);
    if (!multiple) allValues = allValues.slice(-1);

    allValues.forEach((item) => {
      let appendedItem = type === "chip" ? compChip(item) : item;
      selectValue.append(appendedItem);
    });

    inputWrap.append(selectValue);
  }

  // Icon
  if (icon) {
    let inputIcon = compIcon(icon, ["input__icon"], ["input__icon-wrap"]);
    inputWrap.append(inputIcon);
  }

  inputWrap.append(select);
  inputSet.append(inputWrap);

  return inputSet;
}
