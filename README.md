# **Mini Taskboard**

`WORK IN PROGRESS`

A project modeling logic of a task board like Trello using factory functions and collections. Built to practice JavaScript fundamentals such as closures, state, object reusability, etc.

Made in June 2025 by JMS.

Last updated 06/16/2025, correlating with 53 consecutive days of practicing code. :)

**Note:** This is code is functional but definitely not performant. I may return later once I've learned some more JS and frontend tools to refine and build an interface.

## **Getting Started**

Clone this repo and run it with Node:

```bash
git clone https://github.com/yourusername/mini-taskboard.git
cd mini-taskboard
node MiniTaskboard.js
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
- Group tasks by categories, eg. `"TODO"`, `"IN_PROGRESS"`, `"COMPLETE"`.
- Built for reusbaility; different kinds of objects (eg. tasks, tickets, pages, etc.) can be assigned their own collections of statuses and tags.

## **Architecture Overview**

### Items

Items are the smallest unit of data on a task. Each item has a `type` property identifying its role. Each `type` has an `isValid()` function which is used to validate if the object is "complete", eg. statuses have groups, users have names, etc.

- `statusItem()`: Individual status item assigned a name and a `groupItem`.
- `groupItem()`: Individual group item, used to organize statuses.
- `tagItem()`: Individual tag item, used for more granular categorization of tasks.
- `userItem()`: Individual user assigned a name, title, and `teamItem`.
- `teamItem()`: Individual team that users are assigned to.

### Collections

Collections are groupings of items with methods to retrieve, add, and remove data.

Collections can be created with `typeCollection()` called with a `name` (as its label), `type` (the type of objects it allows), and a validation function `valFn` (enforces entry of only allowed types).

`typeCollection()` calls a function `initializeCollection()` which is used to build the collection's `Set`, which in turn calls `isValidType`

### Instances

Instances are individually assigned to tasks and include get/set/clear methods. Instances are passed collections — this allows the task to pull an available object (eg. status) from a collection, loosely representing its "state".

- `statusInstance()` – A status-group pairing used to manage a task's status, eg. `"To Do"` → `"In Progress"`.
- `tagInstance()` – Manages tags assigned to the object, includes flexibility for bulk assignment.
- `assigneeInstance()` – A user-team pairing used to manage a task's assignees. Can be one or many users, eg. `["JMS"]` or `["Chris", "Frank"]`.

### Tasks

Tasks are the big kahuna, representing the collection of "items" and "instances". Most of its values are `null` by default — its only default value is its title, `New Task`. This models standard behavior in task management software (for basic use cases).

### Board

`board()` actually coordinates the relationship between all the different collections. Use it to add, delete, and view task summary.

It could probably better defined, since it's calling deeply-nested methods from the instances and collections.

### Utilities

- `normalizeToArray(val)` – Helper function to convert `val` into array for more flexible "add" functions for statuses, groups, etc.
- `isValidString(val)` – Checks if `val` is a non-empty string.

## Reflection

I know this repo is not advanced shit, and that's okay. It's the first mini project I've undertaken since picking up code again in April 2025 to practice more complex, interlocking logic.

I modeled this taskboard code completely on my own — no AI, no tutorials, not even a peek at other repos. I challenged myself to get away from using classes (something I was more comfortable using from previous experience) and forced myself to use function factories and closures to model state.

I recognize there's a lot here that's not up to snuff with professional-grade software engineering patterns, and I hope to identify what I could do better as I continue learning. I'll back to this soon with new perspective about what I can improve. JMS
