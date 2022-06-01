---
id: how-to-customize-workflow-type-in-python
title: How to customize Workflow types in Python
sidebar_label: Customize Workflow types
description: Customize Workflow types.
tags:
  - developer-guide
  - sdk
  - python
---

`@workflow.defn` defines the Workflow class name. You must define the Workflow name on the class given to the Worker.

You can customize the Workflow name with the name parameter, if the name parameter is not specified, the Workflow name defaults to the unqualified class name.

```python
@workflow.defn
class SayHello:
    @workflow.run
    async def run(self, name: str) -> str:
        return await workflow.execute_activity(
            say_hello, name, schedule_to_close_timeout=timedelta(seconds=5)
        )
```
