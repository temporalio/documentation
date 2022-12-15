---
id: bad-request-cancel-external-wf-attributes
title: Bad Request Cancel External Workflow Execution Attributes
description: Explanation for Bad Request Cancel External Workflow Execution error message, and how to fix it.
sidebar_label: Bad Request Cancel External Workflow Execution
tags:
  - errors
  - strongly-typed
---

This error indicates that the [Workflow Task](/tasks#workflow-task) failed while trying to cancel an [external Workflow](/workflows/#external-workflows).
Unset or invalid attributes can cause this to occur.

Reset any missing attributes, such as Workflow Id or Run Id.
Adjust any fields that exceed length limits.

If a [Child Workflow](/workflows/#child-workflows) is set to `Start` and `RequestCancel`, remove one of these attributes.
A Child Workflow cannot perform both actions in the same Workflow Task.
