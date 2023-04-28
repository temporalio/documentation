---
id: send-update-from-client
title: How to send a Update from a Temporal Client
description: When an Update is sent successfully from the Temporal Client the Update is dispatched to a worker
sidebar_label: Send Update from Client
tags:
  - guide-context
---

When a Signal is sent successfully from the Temporal Client, it is first transmitted to a worker where it is accepted or rejected through a validation process.
Rejections do not result in an event being written to the Event History while an accepted update will result in a WorkflowExecutionUpdateAccepted event.
Accepted updates are then executed on the worker and upon completion will cause a WorkflowExecutionUpdateCompleted event to be written to the Event History.
