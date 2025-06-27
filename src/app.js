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
import { renderTask, renderControls, createNewTask } from "./renderTask.js";

// Get app
const app = document.getElementById("app");

// export function renderCreateTaskForm() {
// Form needs:

// Close/cancel control
// Task name
// Assignee
// Tags
// Status

// const form = document.createElement("form");
// form.id = "form-create-task";
// form.classList.add("form");

// let input = compInput({
//   id: "input-id",
//   type: "text",
//   name: "special",
//   label: "Information",
//   icon: Info,
// });

// let input2 = compInput({
//   id: "input2-id",
//   type: "text",
//   name: "special",
//   label: "Another input",
//   icon: Info,
// });

// let statusOptions = taskBoard.statuses.getAllItems().map((status) => ({
//   status: status,
//   name: status?.name,
// }));

// console.log(statusOptions);

// let select = compSelect({
//   data: statusOptions,
//   label: "Status",
//   multiple: true,
//   action: () => alert("hello"),
//   // id: "select-id",
//   // name: "this-select",
//   // icon: Plus,
//   // copy: "Hold Cmd/Ctrl to select multiple",
// });

// form.append(select);

//   app.append(form);

//   return form;
// }

// Build app here

function renderApp() {
  app.append(renderControls(app));

  // renderCreateTaskForm();

  taskBoard.tasks.forEach((task) => {
    let p = renderTask(task);
    app.append(p);
  });
}

renderApp();
