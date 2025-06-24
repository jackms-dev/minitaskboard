import { isValidString, normalizeToArray } from "./helpers.js";
import { Task } from "./task.js";

// Takes a source (object), type (string), and validation function to
// check if an item matches the type and passes its own validation
// criteria.
export function isValidType(source, type, valFn) {
  if (
    !source ||
    !type ||
    !isValidString(type) ||
    !valFn ||
    typeof valFn !== "function"
  )
    throw new Error(
      "Invalid: Accepts a source (object or iterable), a type (string), and a validation function."
    );
  return source?.type === type && valFn();
}

// Takes a source (object or iterable), and validation
// function and create a new Set, filtered by the
// validation function.
export function initializeCollection(source, valFn) {
  if (!source || !valFn || typeof valFn !== "function")
    throw new Error(
      "Invalid: Accepts a source (object) and a validation function."
    );
  let set = new Set();
  normalizeToArray(source)
    .filter((item) => valFn(item))
    .forEach((item) => set.add(item));
  return set;
}

// Generates the type collection and includes methods
// to add, delete, get, etc. items
export function typeCollection(label = null, type, arr = []) {
  return {
    label: isValidString(label) ? label : null,
    type: isValidString(type) ? type : null,
    // Overrelying on the object to declare its type correctly
    collection: initializeCollection(arr, (obj) =>
      isValidType(obj, obj?.type, () => obj?.isValid())
    ),
    addItem(obj) {
      normalizeToArray(obj).forEach((item) => {
        if (isValidType(item, this.name, () => item?.isValid()))
          this.collection.add(item);
      });
    },
    deleteItem(obj) {
      normalizeToArray(obj).forEach((item) => this.collection.delete(item));
    },
    hasItem(obj) {
      return this.collection.has(obj);
    },
    getItem(obj) {
      return [...this.collection].find((item) => item === obj);
    },
    getAllItems() {
      return [...this.collection];
    },
    clearItems() {
      this.collection.clear();
    },
  };
}

// Individual status item
export function statusItem(name, group, color) {
  const type = "StatusItem";
  return {
    type: type,
    name: isValidString(name) ? name : null,
    group: group,
    color: isValidString(color) ? color : null,
    isValid() {
      return Boolean(
        this.name &&
          this.group &&
          this.group?.type === "GroupItem" &&
          this.group?.isValid()
      );
    },
  };
}

// Individual group item
export function groupItem(name, icon) {
  const type = "GroupItem";
  return {
    type: type,
    name: isValidString(name) ? name : null,
    icon: typeof icon === "object" ? icon : null,
    isValid() {
      return isValidString(this.name);
    },
  };
}

// Tracks the status on an individual task item
// Expects a typeCollection for groups and statuses
export function statusInstance(groups, statuses, currentStatus) {
  let status = null;
  if (
    currentStatus &&
    statuses?.hasItem(currentStatus) &&
    groups?.hasItem(currentStatus?.group)
  )
    status = currentStatus;
  return {
    getStatus() {
      return status;
    },
    setStatus(val) {
      // Consider throwing an error for easier debugging
      if (statuses?.hasItem(val) && groups?.hasItem(val.group)) status = val;
    },
    clearStatus() {
      status = null;
    },
    getGroup() {
      return status?.group;
    },
    getColor() {
      return status?.color;
    },
    setColor(val) {
      if (isValidString(val)) status?.color === val;
    },
    listAllStatuses() {
      return statuses?.getAllItems();
    },
    listAllGroups() {
      return groups?.getAllItems();
    },
  };
}

// Individual user item
export function userItem(name, title, team) {
  const type = "UserItem";
  return {
    type: type,
    name: isValidString(name) ? name : null,
    title: isValidString(title) ? title : null,
    team: team,
    isValid() {
      return (
        this.name &&
        this.team &&
        this.team?.type === "TeamItem" &&
        this.team?.isValid()
      );
    },
  };
}

// Individual team item
// For consideration: create a parameter that allows you to add
// an array of users upon initialization
export function teamItem(name) {
  const type = "TeamItem";
  return {
    type: type,
    name: isValidString(name) ? name : null,
    isValid() {
      return isValidString(this.name);
    },
  };
}

// Tracks the users assigned to an individual task item
// Expects a typeCollection for teams and users
export function assigneeInstance(users, teams, arr = []) {
  let assignee = new Set();
  arr.forEach((item) => {
    if (users?.hasItem(item) && teams.hasItem(item?.team)) assignee.add(item);
  });
  return {
    getAssignee() {
      return [...assignee];
    },
    hasAssignee(val) {
      return [...assignee].find((item) => item === val);
    },
    setAssignee(val) {
      normalizeToArray(val).forEach((item) => {
        if (users?.hasItem(item)) assignee.add(item);
      });
    },
    removeAssignee(val) {
      normalizeToArray(val).forEach((item) => assignee.delete(item));
    },
    clearAssignee() {
      assignee.clear();
    },
    listAllUsers() {
      return users?.getAllItems();
    },
    listAllTeams() {
      return teams?.getAllItems();
    },
  };
}

// Individual tag item
export function tagItem(label, color) {
  const type = "TagItem";
  return {
    type: type,
    label: isValidString(label) ? label : null,
    color: isValidString(color) ? color : null,
    isValid() {
      return isValidString(this.label);
    },
  };
}

// Tracks the tags on an individual task item
export function tagInstance(tagCollection, arr = []) {
  let tags = new Set();
  arr.forEach((item) => {
    if (tagCollection?.hasItem(item)) {
      tags.add(item);
    }
  });
  return {
    getTags() {
      return [...tags];
    },
    setTags(obj) {
      normalizeToArray(obj).forEach((item) => {
        if (tagCollection?.hasTag(item)) {
          tags.add(item);
        }
        if (
          !tagCollection?.hasItem(item) &&
          item?.type === "TagItem" &&
          item.isValid()
        ) {
          tagCollection.addItem(item);
          tags.add(item);
        }
      });
    },
    clearTags() {
      tags.clear();
    },
    listTags() {
      return tagCollection?.getAllItems();
    },
  };
}

// Orchestrates all logic between collections
export function board(arrTasks = [], groups, statuses, tags, teams, users) {
  let tasks = new Set();
  arrTasks
    .filter((item) => item instanceof Task)
    .forEach((item) => tasks.add(item));
  return {
    tasks: tasks,
    groups: groups,
    statuses: statuses,
    tags: tags,
    teams: teams,
    users: users,
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
    moveTask(task, status) {
      if (this.tasks.has(task) && task instanceof Task) {
        task.setStatus(status);
      }
    },
    clearTasks() {
      this.tasks.clear();
    },
    summary() {
      return [...this.tasks].reduce((acc, val) => {
        acc.push(val.toJSON());
        return acc;
      }, []);
    },
  };
}
