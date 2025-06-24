import {
  Circle,
  CircleCheck,
  CircleDotDashed,
  Plus,
  ArrowRight,
  Ellipsis,
  Info,
} from "https://cdn.skypack.dev/lucide";
import { Task } from "./task.js";
import { taskBoard } from "./taskData.js";
import { compChip, compButton, compInput, compSelect } from "./components.js";
import { isValidString } from "./helpers.js";

// Get app
const app = document.getElementById("app");

function renderTaskTitle(task) {
  if (task?.title) {
    const title = document.createElement("p");
    title.classList.add("task-card__title");
    title.innerText = task.title;
    return title;
  }
}

function renderTaskDescription(task) {
  if (task?.description) {
    const description = document.createElement("p");
    description.classList.add("task-card__description");
    description.innerText = task.description;
    return description;
  }
}

function renderTaskStatus(task) {
  if (task?.status) {
    const chip = compChip({
      label: task?.status?.name,
      icon: task?.status?.group?.icon,
      color: task?.status?.color,
      style: "round",
      classes: "chip__status",
    });
    return chip;
  }
}

function renderTaskTags(task) {
  if (task?.tags?.length > 0) {
    const tagsGroup = document.createElement("div");
    tagsGroup.classList.add("task-card__tags-group");

    task.tags.forEach((tagItem) => {
      const tag = compChip({
        label: tagItem?.label,
        color: tagItem?.color,
        style: "square",
        classes: "chip__tag",
      });
      tagsGroup.append(tag);
    });

    return tagsGroup;
  }
}

function renderTaskAssignees(task) {
  if (task?.assignee?.length > 0) {
    const assigneeGroup = document.createElement("div");
    assigneeGroup.classList.add("task-card__assignee-group");

    task.assignee.forEach((assigneeItem) => {
      const assigneeWrap = document.createElement("div");
      assigneeWrap.classList.add("task-card__assignee-wrap");

      const assignee = document.createElement("p");
      assignee.classList.add("label", "task-card__assignee-label");
      assignee.innerText = assigneeItem?.name;

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

  // Task card
  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  // Map of task prop and its DOM elements
  const taskData = renderTaskData(task.toObj());

  taskData.forEach((item) => {
    if (item) taskCard.append(item);
  });

  return taskCard;
}

function renderControls() {
  const controls = document.createElement("div");
  controls.classList.add("controls");

  const button = compButton({
    button: "text",
    size: "small",
    label: "New task",
    icon: Plus,
    // trailingIcon: ArrowRight,
    action: createNewTask,
  });

  const iconButton = compButton({
    button: "icon",
    size: "small",
    label: "Test button",
    icon: Ellipsis,
    action: () => {
      alert("Hello");
    },
  });

  controls.append(button);
  controls.append(iconButton);

  app.append(controls);
}

export function createNewTask() {
  let task = new Task();
  taskBoard.addTask(task);
  console.log(taskBoard);
  let p = renderTask(task);
  app.append(p);
}

export function renderCreateTaskForm() {
  // Form needs:

  // Close/cancel control
  // Task name
  // Assignee
  // Tags
  // Status

  const form = document.createElement("form");
  form.id = "form-create-task";
  form.classList.add("form");

  let input = compInput({
    id: "input-id",
    type: "text",
    name: "special",
    label: "Information",
    icon: Info,
  });

  let input2 = compInput({
    id: "input2-id",
    type: "text",
    name: "special",
    label: "Another input",
    icon: Info,
  });

  let button1 = compButton({
    button: "text",
    size: "small",
    type: "submit",
    label: "Add",
    action: () => {
      alert("Create task");
    },
  });

  let button2 = compButton({
    button: "text",
    size: "small",
    type: "cancel",
    label: "Cancel",
    action: () => {
      alert("Cancel creating task");
    },
  });

  let select = compSelect({
    id: "select-id",
    name: "this-select",
    label: "A select component",
    icon: Plus,
    // multiple: true,
    copy: "Hold Cmd/Ctrl to select multiple",
    options: [
      { value: "value1", label: "Label 1" },
      { value: "value2", label: "Label 2" },
      { value: "value3", label: "Label 3" },
    ],
  });

  form.append(input, input2, select, button1, button2);

  app.append(form);

  return form;
}

// Build app here

function renderApp() {
  renderControls();

  renderCreateTaskForm();

  taskBoard.tasks.forEach((task) => {
    let p = renderTask(task);
    app.append(p);
  });
}

renderApp();
