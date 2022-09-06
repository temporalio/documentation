---
id: skip-current-open
title: skip-current-open
description: definition for the --skip-current-open modifier
tags:
  - reference
  - tctl
---

### `--skip-current-open`

Indicate that a [Workflow Execution](/concepts/what-is-a-workflow-execution) should be skipped if the current Run is open for the same [Workflow Id](/concepts/what-is-a-workflow-id) as the base Run.

**Example**

```bash
tctl workflow <command> --skip-current-open
```
