---
id: workflow-transition-to-patching
title: Transitioning to Patching for Updates
sidebar_label: Transition to Patching
description: Details the transition process to using the Patching API for workflow updates, maintaining workflow determinism.
tags:
  - guide-temporal
  - transition-patching
---

Despite the flexibility offered by data classes, there will be scenarios where adding a new activity or logic to your Workflow is necessary.
In such cases, the Patching API becomes invaluable, especially for updates to long-running Workflows.
