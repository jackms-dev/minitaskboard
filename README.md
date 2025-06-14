# **Mini Taskboard**

`WORK IN PROGRESS`

A project modeling logic of a task board like Trello using factory functions and collections. Built to practice JavaScript fundamentals such as closures, state, object reusability, etc.

Made in June 2025 by JMS.

Last updated 06/11/2025.

## **Getting Started**

Clone this repo and run it with Node:

```bash
git clone https://github.com/yourusername/mini-taskboard.git
cd mini-taskboard
node Board.js
```

## **Functionality**

- Add tasks
- Move between statuses
- Mark complete or delete
- View the whole board state
- Allow tags

## **Core Concepts**

- Nesting objects/arrays
- Loops
- Object factories
- Closures for status tracking

## **Available Features**

- Create and manage tasks with dynamic statuses and tags controlled by their own collections
- Group tasks by categories, eg. "TODO", "IN_PROGRESS", "COMPLETE"
- Built for reusbaility; different kinds of objects (eg. tasks, tickets, pages, etc.) can be assigned their own collections of statuses and tags

## **Architecture Overview**

### Items

Items are the smallest unit of data on a task.

- `StatusItem.js` – Individual status item assigned a name and a group.
- `GroupItem.js` – Individual group item, used to organize statuses.
- `TagItem.js` – Individual tag item, used for more granular categorization of tasks.

### Collections

Collections are groupings of items with methods to retrieve, add, and remove data.

- `StatusInstance.js` – Collection of status objects returned from `statusItem()`.
- `GroupCollection.js` – Collection of group objects returned from `groupItem()`.
- `TagCollection.js` – Collection of tag objects returned from `tagItem()`.

### Instances

Instances are individually assigned to tasks and include get/set/clear methods. This allows the task to pull an available object (eg. status) from a collection, loosely representing its "state".

- `StatusInstance.js` - A status-group pairing used to manage a task's status, eg. `"To Do"` → `"In Progress"`.
- `TagInstance.js` – Manages tags assigned to the object, includes flexibility for bulk assignment.

### Utilities

- `normalizeToArray.js` – Helper function to convert objects into array for more flexible "add" functions for statuses, groups, and tags.
