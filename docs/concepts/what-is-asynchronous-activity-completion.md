---
id: what-is-asynchronous-activity-completion
title: What is Asynchronous Activity Completion?
sidebar_label: Asynchronous Activity Completion
description: Asynchronous Activity Completion is the scenario where the final result of a computation, started by an Activity, is provided to the Temporal Platform through the Temporal Client.
tags:
  - explanation
---

Asynchronous Activity Completion occurs when the final result of a computation, started by an Activity, is provided to the Temporal System from an external system.

By default, an Activity is a function or method (depending on the language) that completes as soon as the function or method returns. But in some cases an Activity implementation is asynchronous. For example, the action could be forwarded to an external system through a message queue, and the result could come through a different queue.

To support such use cases, Temporal allows Activity implementations that do not complete upon Activity function completions. A separate API should be used in this case to complete the Activity. This API can be called from any process, even in a different programming language, that the original Activity worker used.
