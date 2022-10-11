---
id: reset-reapply-type
title: tctl reset-reapply-type modifier
description: definition for the --reset-reapply-type modifier
sidebar_label: --reset-reapply-type
tags:
  - tctl
---

Specify the types of events to reapply after the reset point.
Valid values are `All`, `Signal`, and `None`. The default is `All`.

**Example**

```bash
tctl workflow <command> --reset-reapply-type <value>
```
