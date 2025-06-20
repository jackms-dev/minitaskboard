import { isValidString } from "./helpers.js";

export class Task {
  constructor(title, statusInstance, tagsInstance, assigneeInstance) {
    this.title = isValidString(title) ? title : "New Task";
    this.description = null;
    this.status = statusInstance ?? null;
    this.tags = tagsInstance ?? null;
    this.assignee = assigneeInstance ?? null;
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
    return this.status?.getStatus();
  }
  setStatus(val) {
    this.status?.setStatus(val);
  }
  clearStatus() {
    this.status?.clearStatus();
  }
  getGroup() {
    return this.status?.getGroup();
  }
  getTags() {
    return this.tags?.getTags();
  }
  setTags(val) {
    this.tags?.setTags(val);
  }
  clearTags() {
    this.tags?.clearTags();
  }
  getAssignee() {
    return this.assignee?.getAssignee();
  }
  setAssignee(val) {
    this.assignee?.setAssignee(val);
  }
  clearAssignee() {
    this.assignee?.clear();
  }
  toJSON() {
    return {
      title: this.title,
      description: this.description,
      status: this.status.getStatus(),
      tags: this.tags.getTags(),
      assignee: this.assignee.getAssignee(),
    };
  }
}
