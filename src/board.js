import { normalizeToArray } from "./helpers.js";
import { Task } from "./task.js";

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
