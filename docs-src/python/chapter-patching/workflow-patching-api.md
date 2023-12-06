---
id: workflow-patching-api
title: Understanding the Patching API
sidebar_label: Patching API
description: Explores the role of the Patching API in preserving determinism during workflow updates in Temporal.
tags:
  - guide-python-temporal
  - patching-api
---

The Patching API in Temporal enables changes to Workflow Definitions while maintaining deterministic behavior in ongoing Workflows.

The `patched()` function plays a critical role in facilitating smooth transitions between old and new code paths. It returns true in two scenarios:

- During Non-Replay Operations: When the Workflow is running in real-time (not replaying), indicating that the newer logic path should be executed.
- During Replay with Patch Awareness: When the Workflow is replaying and has previously encountered this patch, ensuring continuity in logic flow.
