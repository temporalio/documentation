---
id: registering-types
title: How to register types
description: How to register Workflow and Activity Types
sidebar_label: Register types
tags:
  - developer-guide-doc-type
  - workflow and activity types
  - go sdk
---

All Workers listening to the same Task Queue name must be registered to handle the exact same Workflows Types and Activity Types.

If a Worker polls a Task for a Workflow Type or Activity Type it does not know about, it fails that Task.
However, the failure of the Task does not cause the associated Workflow Execution to fail.
