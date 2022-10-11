---
id: workflow-id-reuse-policy
title: tctl workflow-id-reuse-policy modifier
description: definition for the --workflow-id-reuse-policy modifier
sidebar_label: --workflow-id-reuse-policy
tags:
  - tctl
---

Specify a [Workflow Id Reuse Policy](/concepts/what-is-a-workflow-id-reuse-policy).
Configure if the same [Workflow Id](/concepts/what-is-a-workflow-id) is allowed for use in new [Workflow Execution](/concepts/what-is-a-workflow-execution).

Values: `AllowDuplicate`, `AllowDuplicateFailedOnly`, `RejectDuplicate`

**Examples**

```bash
tctl workflow <command> --workflow-id-reuse-policy AllowDuplicate
tctl workflow <command> --workflow-id-reuse-policy AllowDuplicateFailedOnly
tctl workflow <command> --workflow-id-reuse-policy RejectDuplicate
```
