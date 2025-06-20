import { statusItem, statusInstance } from "./status.js";
import { groupItem } from "./group.js";
import { tagItem, tagInstance } from "./tag.js";
import { userItem, assigneeInstance } from "./user.js";
import { teamItem } from "./team.js";
import { typeCollection } from "./typeCollection.js";
import { Task } from "./task.js";
import { board } from "./board.js";

// Group items
let group1 = groupItem("Todo");
let group2 = groupItem("In Progress");
let group3 = groupItem("Complete");

// Status items
let status1 = statusItem("backlog", group1);
let status2 = statusItem("to do", group1);
let status3 = statusItem("in progress", group2);
let status4 = statusItem("in review", group2);
let status5 = statusItem("done", group3);
let status6 = statusItem("archived", group3);

// Tag items
let tag1 = tagItem("Engineering");
let tag2 = tagItem("Design");
let tag3 = tagItem("Product");
let tag4 = tagItem("Sales");
let tag5 = tagItem("Customer Success");
let tag6 = tagItem("IT");
let tag7 = tagItem("Marketing");

// Team items
let team1 = teamItem("Distilling");
let team2 = teamItem("Healthcare");
let team3 = teamItem("Content");
let team4 = teamItem("Engineering");
let team5 = teamItem("Design");

// User items
let user1 = userItem("Chris", "Distiller", team1);
let user2 = userItem("Taylor", "Nurse", team2);
let user3 = userItem("Frank", "Engineer", team3);
let user4 = userItem("Lina", "Moderator", team4);
let user5 = userItem("Jack", "Designer", team5);

// Group collection
let groupCollection = typeCollection("Groups", "GroupItem", [
  group1,
  group2,
  group3,
]);

// Status collection
let statusCollection = typeCollection("Statuses", "StatusItem", [
  status1,
  status2,
  status3,
  status4,
  status5,
  status6,
]);

// Tag collection
let tagCollection = typeCollection("Tags", "TagItem", [
  tag1,
  tag2,
  tag3,
  tag4,
  tag5,
  tag6,
  tag7,
]);

// Team collection
let teamCollection = typeCollection("Teams", "TeamItem", [
  team1,
  team2,
  team3,
  team4,
  team5,
]);

// User collection
let userCollection = typeCollection("Users", "UserItem", [
  user1,
  user2,
  user3,
  user4,
  user5,
]);

// Task items
const task1 = new Task(
  "Task 1",
  statusInstance(groupCollection, statusCollection, status1),
  tagInstance(tagCollection, [tag1, tag3]),
  assigneeInstance(userCollection, teamCollection, [user1, user3])
);
const task2 = new Task(
  "Task 2",
  statusInstance(groupCollection, statusCollection, status3),
  tagInstance(tagCollection, [tag3, tag4]),
  assigneeInstance(userCollection, teamCollection, [user2])
);
const task3 = new Task(
  "Task 3",
  statusInstance(groupCollection, statusCollection, status5),
  tagInstance(tagCollection, [tag5, tag6]),
  assigneeInstance(userCollection, teamCollection, [user5])
);

task1.description = "Oh no!";

// Create taskboard of task items
export const taskBoard = board(
  [task1, task2, task3],
  groupCollection,
  statusCollection,
  tagCollection,
  teamCollection,
  userCollection
);

console.log(taskBoard.summary());
