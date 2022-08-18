---
id: send-signal-from-workflow
title: How to send a Signal from a Workflow
description: A Workflow can send a Signal to another Workflow, in which case it's called an External Signal
sidebar_label: Send Signal from Workflow
tags:
  - guide-context
---

A Workflow can send a Signal to another Workflow, in which case it's called an _External Signal_.

When an External Signal is sent:

- A [SignalExternalWorkflowExecutionInitiated](/references/events#signalexternalworkflowexecutioninitiated) Event appears in the sender's Event History.
- A [WorkflowExecutionSignaled](/references/events#workflowexecutionsignaled) Event appears in the recipient's Event History.
