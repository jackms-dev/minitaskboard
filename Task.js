import {
  isValidType,
  isValidString,
  normalizeToArray,
  typeCollection,
} from "./Helpers.js";

export class Task {
  constructor(title, statusInstance, tagsInstance) {
    this.title = isValidString(title) ? title : "New Task";
    this.description = null;
    this.status = statusInstance;
    this.tags = tagsInstance;
  }
  getTitle() {
    return this.title;
  }
  setTitle(val) {
    if (isValidString(val)) this.title = val;
  }
  getDescription() {
    return this.description;
  }
  setDescription(val) {
    if (isValidString(val)) this.description = val;
  }
  getStatus() {
    return this.status.getStatus();
  }
  setStatus(val) {
    this.status.setStatus(val);
  }
  clearStatus() {
    this.status.clearStatus();
  }
  getTags() {
    return this.tags.getTags();
  }
  setTags(val) {
    this.tags.setTags(val);
  }
  clearTags() {
    this.tags.clearTags();
  }
}

export function taskCollection(arr = []) {
  let tasks = new Set();

  // Can you use typeCollection here?
  arr.filter((item) => item instanceof Task).forEach((item) => tasks.add(item));

  return {
    tasks: tasks,
    addTask(obj) {
      normalizeToArray(obj).forEach((item) => {
        if (item instanceof Task) this.tasks.add(item);
      });
    },
    deleteTask(obj) {
      normalizeToArray(obj).forEach((item) => this.tasks.delete(item));
    },
    hasTask(obj) {
      return this.tasks.has(obj);
    },
    getTask(task) {
      return [...this.tasks].find((item) => task === item);
    },
    clearTasks() {
      this.tasks.clear();
    },
    listTasks() {
      return [...this.tasks];
    },
  };
}
