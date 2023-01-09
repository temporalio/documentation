---
id: workflow-logic-requirements
title: How develop Workflow logic
description: Workflow logic is constrained by deterministic execution requirements.
sidebar_label: Workflow logic requirements
tags:
  - guide-context
---

Workflow logic is constrained by [deterministic execution requirements](/concepts/what-is-a-workflow-definition#deterministic-constraints).
Therefore, each language is limited to the use of certain idiomatic techniques.
However, each Temporal SDK provides a set of APIs that can be used inside your Workflow to interact with external (to the Workflow) application code.
