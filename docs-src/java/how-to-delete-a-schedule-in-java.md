---
id: how-to-delete-a-schedule-in-java
title: How to delete a Schedule in Java
sidebar_label: Delete Schedule
description: To delete a Schedule in Java, use `delete()` on `ScheduleHandle`.
tags:
  - java
  - developer-guide
---

The delete action enables you to delete a Schedule. When you delete a Schedule, it does not affect any Workflows that were started by the Schedule.

To delete a Scheduled Workflow Execution in Java, use the `delete()` method on the `Schedule Handle`.

```java
ScheduleHandle handle = client.getHandle("schedule-id")
handle.delete();
```
