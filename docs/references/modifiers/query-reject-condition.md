---
id: query-reject-condition
title: query-reject-condition
description: definition for the --query-reject-condition modifier in tctl
tags:
  - reference
  - tctl
---

### `--query-reject-condition`

Reject Queries based on Workflow state.
Valid values are `not-open` and `not-completed-cleanly`.

Alias: `--qrc`

**Example**

```bash
tctl workflow <command> --query-reject-condition <value>
```
