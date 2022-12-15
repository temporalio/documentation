---
id: bad-request-cancel-activity-attributes
title: Bad Request Cancel Activity Attributes
description: Explanation for Bad Request Cancel Activity Attributes error message, and how to fix it.
sidebar_label: Bad Request Cancel Activity Attributes
tags:
  - errors
  - strongly-typed
---

This error either indicates the possibility of unset attributes for [RequestCancelActivity](/references/commands/#requestcancelactivity), or an invalid History Builder state.

Update the [Temporal SDK](/temporal/#temporal-sdk) to the most recent release.
Reset any unset attributes before retrying the [Workflow Task](/tasks#workflow-task).

If you continue to see this error, review your code for [nondeterministic causes](/workflows/#code-changes-can-cause-non-deterministic-behavior).
