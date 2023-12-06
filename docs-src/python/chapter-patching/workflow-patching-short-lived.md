---
id: workflow-patching-short-lived
title: Patching Short-Lived Workflows
sidebar_label: Short-Lived Workflows
description: Explains patching techniques suitable for short-lived workflows, with an emphasis on versioning.
tags:
  - guide-temporal
  - short-lived-workflows
---

**Versioning by Workflow Type**: If your Workflow is short-lived and frequently updated, a straightforward approach is versioning. By simply appending a version number to your Workflow Type, you can manage updates seamlessly. For instance:

```python
@workflow.defn
class BackgroundWorkflow01():
    # initial logic

@workflow.defn
class BackgroundWorkflow02():
    # Updated logic
```
