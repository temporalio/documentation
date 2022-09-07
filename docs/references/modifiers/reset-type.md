---
id: reset-type
title: reset-type
description: definition for the --reset-type modifier
tags:
  - reference
  - tctl
---

### `--reset-type`

Specify the event type to which you want to reset.

| Value                | Description                                                 |
| -------------------- | ----------------------------------------------------------- |
| `FirstWorkflowTask`  | Reset to the beginning of the Event History.                |
| `LastWorkflowTask`   | Reset to the end of the Event History.                      |
| `LastContinuedAsNew` | Reset to the end of the Event History for the previous Run. |
| `BadBinary`          | Reset to the point where a bad binary was used.             |
