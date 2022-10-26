---
id: id-reuse-policy
title: tctl id-reuse-policy modifier
description: definition for the --id-reuse-policy modifier
sidebar_label: --id-reuse-policy
tags:
  - tctl
---

Specify a [Workflow Id Reuse Policy](/concepts/what-is-a-workflow-id-reuse-policy).
Configure if the same [Workflow Id](/concepts/what-is-a-workflow-id) is allowed for use in new [Workflow Executions](/concepts/what-is-a-workflow-execution).

Values: `AllowDuplicate`, `AllowDuplicateFailedOnly`, `RejectDuplicate`

**Examples**

```bash
tctl workflow <command> --id-reuse-policy AllowDuplicate
tctl workflow <command> --id-reuse-policy AllowDuplicateFailedOnly
tctl workflow <command> --id-reuse-policy RejectDuplicate
```
