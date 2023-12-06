---
id: workflow-patching-stages
title: Stages of the Patching Process
sidebar_label: Patching Stages
description: Outlines the different stages in the patching process of Temporal workflows, focusing on the transition from old to new code.
tags:
  - guide-python-temporal
  - patching-stages
---

The following list presents the general stages of patching a Workflow:

1. **Initial code stage**: Represents the existing Workflows's current state.
2. **Patching stage**: Introduces and tests new changes alongside the original workflow, ensuring deterministic behavior is maintained.
3. **Deprecation stage**: Involves marking the old code for removal after ensuring the new changes are stable and deterministic.
4. **Patch complete stage**: Occurs when all Workflows have transitioned to the updated code, fully operating on the new, deterministic logic.
