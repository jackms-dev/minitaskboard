// A script file of helper function for frequent
// validation checks and data transformations

// Helper function to return an object as an array
// if it's not already.
export function normalizeToArray(val) {
  return Array.isArray(val) ? val : [val];
}

// Check if the parameter is a string with a length > 0.
export function isValidString(str) {
  return Boolean(str && typeof str === "string" && str.length > 0);
}

// Returns an array of valid strings
export function cssClasses(classes = []) {
  return normalizeToArray(classes).filter((item) => isValidString(item));
}

// Capitalize first letter
export function capitalizeString(str) {
  if (isValidString(str)) {
    let val = str
      .split(" ")
      .map((word) => {
        let char = word.at(0).toUpperCase();
        return word.replace(word[0], char);
      })
      .join(" ");
    return val;
  }
}
