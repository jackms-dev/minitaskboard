import {
  Circle,
  CircleCheck,
  CircleDotDashed,
  Plus,
  ArrowRight,
  Ellipsis,
  Info,
} from "https://cdn.skypack.dev/lucide";
import {
  statusItem,
  statusInstance,
  groupItem,
  tagItem,
  tagInstance,
  userItem,
  assigneeInstance,
  teamItem,
  typeCollection,
  board,
  Task,
} from "./taskObject.js";
import { taskBoard } from "./taskData.js";
import {
  compChip,
  compButton,
  compInput,
  compSelect,
  compSelectItem,
} from "./components/components.js";

export function renderTaskTitle(task) {
  if (task?.title) {
    const title = document.createElement("p");
    title.classList.add("task-card__title");
    title.innerText = task.title;
    return title;
  }
}

export function renderTaskDescription(task) {
  if (task?.description) {
    const description = document.createElement("p");
    description.classList.add("task-card__description");
    description.innerText = task.description;
    return description;
  }
}

export function renderTaskStatus(task) {
  console.log(task);
  function renderTaskStatusGroup(task) {
    const taskCard = document.querySelector(`[data-task-id="${task.id}"]`);
    const taskGroup = taskCard.querySelector(".task-card__status-group");
    const newTaskGroup = renderTaskStatus(task);
    taskGroup.replaceWith(newTaskGroup);
  }

  function selectStatus(status) {
    task.status.clearStatus();
    task.status.setStatus(status);
    renderTaskStatusGroup(task);
  }

  let select = compSelect({
    value: task.status.getStatus(),
    data: taskBoard.statuses.getAllItems(),
    type: "chip",
    name: "Status",
    multiple: false,
    action: (status) => selectStatus(status),
  });

  const statusGroup = document.createElement("div");
  statusGroup.classList.add("task-card__status-group");
  statusGroup.append(select);
  return statusGroup;
}

export function renderTaskTags(task) {
  function renderTaskTagsGroup(task) {
    const taskCard = document.querySelector(`[data-task-id="${task.id}"]`);
    const taskGroup = taskCard.querySelector(".task-card__tags-group");
    const newTaskGroup = renderTaskTags(task);
    taskGroup.replaceWith(newTaskGroup);
  }

  function selectTags(tag) {
    // tag is the tagInstance
    if (!task.tags.hasTags(tag)) {
      task.tags.setTags(tag);
    } else {
      task.tags.removeTags(tag);
    }
    renderTaskTagsGroup(task);
  }

  let select = compSelect({
    value: task.tags.getTags(),
    data: taskBoard.tags.getAllItems(),
    type: "chip",
    name: "Tags",
    multiple: true,
    action: (tag) => selectTags(tag),
  });

  const tagsGroup = document.createElement("div");
  tagsGroup.classList.add("task-card__tags-group");
  tagsGroup.append(select);
  return tagsGroup;
}

export function renderTaskAssignees(task) {
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
export function renderTaskData(task) {
  const taskObj = task.toObj();

  // Short term solution. All should accept raw Task items
  let title = renderTaskTitle(taskObj);
  let description = renderTaskDescription(taskObj);
  let status = renderTaskStatus(task);
  let tags = renderTaskTags(task);
  let assignee = renderTaskAssignees(taskObj);

  // Why a map here?
  const taskData = new Map([
    ["title", title],
    ["description", description],
    ["status", status],
    ["tags", tags],
    ["assignee", assignee],
  ]);

  // Store reference
  return taskData;
}

// Renders individual task
export function renderTask(task) {
  // Catch errors
  if (!(task instanceof Task))
    throw new Error("Invalid: task is not an instance of Task");

  // Map of task prop and its DOM elements
  const taskData = renderTaskData(task);

  // Task card
  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  // Data attribute
  taskCard.dataset.taskId = task.id;

  taskData.forEach((item) => {
    if (item) taskCard.append(item);
  });

  return taskCard;
}

export function renderControls(app) {
  const controls = document.createElement("div");
  controls.classList.add("controls");

  const button = compButton({
    button: "text",
    size: "small",
    label: "New task",
    icon: Plus,
    // trailingIcon: ArrowRight,
    action: () => app.append(createNewTask()),
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

  return controls;
}

export function createNewTask() {
  const task = new Task(
    crypto.randomUUID(),
    "Untitled Task",
    statusInstance(taskBoard.groups, taskBoard.statuses),
    tagInstance(taskBoard.tags),
    assigneeInstance(taskBoard.users, taskBoard.teams)
  );

  taskBoard.addTask(task);
  return renderTask(task);
}
