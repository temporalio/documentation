---
id: reset-reapply-type
title: reset-reapply-type
description: definition for the --reset-reapply-type modifier
tags:
  - reference
  - tctl
---

### `--reset-reapply-type`

Specify the types of events to reapply after the reset point.
Valid values are `All`, `Signal`, and `None`. The default is `All`.

**Example**

```bash
tctl workflow <command> --reset-reapply-type <value>
```
