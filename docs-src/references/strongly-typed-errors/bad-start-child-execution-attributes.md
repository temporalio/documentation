---
id: bad-start-child-execution-attributes
title: Bad Start Child Execution Attributes
description: Explanation for Bad Start Child Execution Attributes error message, and how to fix it.
sidebar_label: Bad Start Child Execution Attributes
tags:
  - errors
  - strongly-typed
---

This error indicates that the [Workflow Task](/concepts/what-is-a-workflow-task) failed to validate attributes for [`StartChildWorkflowExecution`](/references/commands/#startchildworkflowexecution)

Adjust the input size of the attributes to fall within the system's size limits.

Make sure that [Search Attribute](/concepts/what-is-a-search-attribute) validation is performed after unaliasing keys.
