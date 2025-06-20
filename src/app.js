import { createElement, Circle } from "https://cdn.skypack.dev/lucide";
import { Task } from "./task.js";
import { taskBoard } from "./taskboard.js";

// Get app
const app = document.getElementById("app");

function renderTaskTitle(task) {
  if (task.title) {
    const title = document.createElement("p");
    title.classList.add("task-card__title");
    title.innerText = task.title;
    return title;
  }
}

function renderTaskDescription(task) {
  if (task.description) {
    const description = document.createElement("p");
    description.classList.add("task-card__description");
    description.innerText = task.description;
    return description;
  }
}

function renderTaskStatus(task) {
  if (task.status) {
    // Lucide icon
    const icon = createElement(Circle);
    icon.classList.add("icon", "task-card__status-icon");

    const iconWrap = document.createElement("div");
    iconWrap.classList.add("icon-wrap", "task-card__status-icon-wrap");

    const status = document.createElement("p");
    status.classList.add("label", "task-card__status-label");
    status.innerText = task.status;

    const statusWrap = document.createElement("div");
    statusWrap.classList.add("task-card__status-wrap");

    iconWrap.append(icon);
    statusWrap.append(iconWrap, status);

    return statusWrap;
  }
}

function renderTaskTags(task) {
  if (task.tags.length > 0) {
    const tagsGroup = document.createElement("div");
    tagsGroup.classList.add("task-card__tags-group");

    task.tags.forEach((tagItem) => {
      const tagWrap = document.createElement("div");
      tagWrap.classList.add("task-card__tag-wrap");

      const tag = document.createElement("p");
      tag.classList.add("label", "task-card__tag-label");
      tag.innerText = tagItem;

      tagWrap.append(tag);
      tagsGroup.append(tagWrap);
    });

    return tagsGroup;
  }
}

function renderTaskAssignees(task) {
  if (task.assignee.length > 0) {
    const assigneeGroup = document.createElement("div");
    assigneeGroup.classList.add("task-card__assignee-group");

    task.assignee.forEach((assigneeItem) => {
      const assigneeWrap = document.createElement("div");
      assigneeWrap.classList.add("task-card__assignee-wrap");

      const assignee = document.createElement("p");
      assignee.classList.add("label", "task-card__assignee-label");
      assignee.innerText = assigneeItem;

      assigneeWrap.append(assignee);
      assigneeGroup.append(assigneeWrap);
    });

    return assigneeGroup;
  }
}

// Returns a Map with all of the rendered task data
function renderTaskData(task) {
  let title = renderTaskTitle(task);
  let description = renderTaskDescription(task);
  let status = renderTaskStatus(task);
  let tags = renderTaskTags(task);
  let assignee = renderTaskAssignees(task);
  const taskData = new Map([
    ["title", title],
    ["description", description],
    ["status", status],
    ["tags", tags],
    ["assignee", assignee],
  ]);
  return taskData;
}

function renderTask(task) {
  // Catch errors
  if (!(task instanceof Task))
    throw new Error("Invalid: task is not an instance of Task");

  // Safely render task to JSON
  const taskObj = task.toJSON();

  // Task card
  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  const taskData = renderTaskData(taskObj);

  taskData.forEach((item) => {
    if (item) taskCard.append(item);
  });

  return taskCard;
}

taskBoard.tasks.forEach((task) => {
  let p = renderTask(task);
  app.append(p);
});
