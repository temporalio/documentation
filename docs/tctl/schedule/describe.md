---
id: describe
title: tctl schedule describe
sidebar_label: describe
description: How to describe a Schedule using tctl
tags:
  - tctl
---

Display the current Schedule configuration as well as extra information about past, current, and future Runs.

```shell
tctl schedule describe --sid 'your-schedule-id'
```

The Schedule Spec in the output is canonicalized and might not be in the same form as it was input.
