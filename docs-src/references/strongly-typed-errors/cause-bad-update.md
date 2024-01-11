---
id: cause-bad-update
title: Cause Bad Update
description: Explanation for Cause Bad Update error message.
sidebar_label: Cause Bad Update
tags:
  - errors
  - strongly-typed
---

<!--TODO: add link to Workflow Update page when written -->

This error indicates that a [Workflow Execution](/concepts/what-is-a-workflow-execution) tried to complete before receiving an Update.

`BadUpdate` can happen when a [Worker](/concepts/what-is-a-worker) generates a [Workflow Task Completed](/references/events#workflowtaskcompleted) message with missing fields or an invalid Update response format.

This error might indicate usage of an unsupported SDK.
Make sure you're using a [supported SDK](/temporal#temporal-sdk).
