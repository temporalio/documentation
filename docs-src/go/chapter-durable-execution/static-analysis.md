---
id: static-analysis
title: Static analysis tools
description: Use the Go SDK's static analysis tool to check for non-deterministic code during development.
sidebar_label: Static analysis
tags:
  - go sdk
  - static analysis
  - determinism
---

Non-deterministic code can be hard to catch while developing Workflows.
The Go SDK doesn't have a restricted runtime to identify and prevent the use of `time.Sleep` or a new goroutine.
Calling those, or any other invalid construct can lead to ugly non-determinism errors.

To help catch these issues early and during development, use the [`workflowcheck` static analysis tool](https://github.com/temporalio/sdk-go/tree/master/contrib/tools/workflowcheck).
It attempts to find all invalid code called from inside a Workflow Definition.
See the [`workflowcheck` README](https://github.com/temporalio/sdk-go/blob/master/contrib/tools/workflowcheck/README.md) for details on how to use it.
