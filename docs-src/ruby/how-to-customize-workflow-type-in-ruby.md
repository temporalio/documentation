---
id: how-to-customize-workflow-type-in-ruby
title: How to customize Workflow types in Ruby
sidebar_label: Customize Workflow types
description: Customize Workflow types.
tags:
  - developer-guide
  - sdk
  - ruby
---

You can customize the Workflow name with a custom name in the [`start_workflow`](https://rubydoc.info/gems/temporalio/Temporalio/Client#start_workflow-instance_method) method parameter's `workflow`.

```ruby
client.start_workflow('your-workflow-name', 'some input', id: 'your-id', task_queue: 'your-task-queue')
```
