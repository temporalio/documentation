---
id: describe
title: tctl schedule describe
sidebar_label: describe
description: How to describe a Schedule using tctl
tags:
  - tctl
  - cli reference
---

Display the current Schedule configuration as well as extra information about past, current, and future Runs.

```shell
tctl schedule describe --schedule-id 'your-schedule-id'
```

Because the Schedule Spec is converted to canonical representations, the output might not be in the same form as it was input.
