---
id: bad-search-attributes
title: Bad Search Attributes
description: Explanation for Bad Search Attributes error message, and how to fix it.
sidebar_label: Bad Search Attributes
tags:
  - errors
  - strongly-typed
---

This error indicates that the [Workflow Task](/tasks#workflow-task) has unset or invalid [Search Attributes](/app-dev-context/search-attributes).
This can cause Workflow Tasks to continue to retry without success.

Make sure that all attributes are defined before retrying the Task.
Adjust the size of the Payload to fit within the system's size limits.
