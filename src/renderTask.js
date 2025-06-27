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
  if (task?.status) {
    const chip = compChip({
      name: task?.status?.name,
      icon: task?.status?.group?.icon,
      color: task?.status?.color,
      style: "round",
      classes: "chip__status",
    });
    return chip;
  }
}

export function renderTaskTags(task) {
  // { label, icon, color, style, classes = [] }
  let tagOptions = taskBoard.tags.getAllItems().map((tag) => ({
    type: "chip",
    data: tag,
    // name: status?.name,
  }));

  let tagValues = task.tags.getTags().map((tag) => ({}));

  function selectTags(tag) {
    if (!task.tags.hasTags(tag)) {
      task.tags.setTags(tag);
    } else {
      task.tags.removeTags(tag);
    }

    renderTaskData(task);
    renderTask(task);
  }

  let select = compSelect({
    value: task.tags.getTags(),
    data: tagOptions,
    type: "chip",
    multiple: true,
    name: "Tags",
    action: (tag) => selectTags(tag),
    // id: "select-id",
    // icon: Plus,
    // copy: "Hold Cmd/Ctrl to select multiple",
  });

  const tagsGroup = document.createElement("div");
  tagsGroup.classList.add("task-card__tags-group");
  tagsGroup.append(select);
  return tagsGroup;

  // if (task?.tags?.length > 0) {
  //   task.tags.forEach((tagItem) => {
  //     const tag = compChip({
  //       name: tagItem?.name,
  //       color: tagItem?.color,
  //       style: "square",
  //       classes: "chip__tag",
  //     });
  //     tagsGroup.append(tag);
  //   });
  //   return tagsGroup;
  // }
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
  let title = renderTaskTitle(task?.toObj());
  let description = renderTaskDescription(task?.toObj());
  let status = renderTaskStatus(task?.toObj());
  // Short term solution. All should accept raw Task items
  let tags = renderTaskTags(task);
  let assignee = renderTaskAssignees(task?.toObj());
  // Why a map here?
  const taskData = new Map([
    ["title", title],
    ["description", description],
    ["status", status],
    ["tags", tags],
    ["assignee", assignee],
  ]);
  return taskData;
}

export function renderTask(task) {
  // Catch errors
  if (!(task instanceof Task))
    throw new Error("Invalid: task is not an instance of Task");

  // Task card
  const taskCard = document.createElement("div");
  taskCard.classList.add("task-card");

  // Map of task prop and its DOM elements
  const taskData = renderTaskData(task);

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
  let task = new Task();
  taskBoard.addTask(new Task());
  let taskNode = renderTask(task);
  return taskNode;
}
