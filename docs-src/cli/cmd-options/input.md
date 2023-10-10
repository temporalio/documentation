---
id: input
title: temporal input
sidebar_label: input
description: Optional JSON input to provide to the Workflow.
tags:
  - cli reference
  - temporal cli
  - options-feature
  - command-line-interface-cli
  - workflow
---

Use the `--input` command option to include data in the command.

This command option accepts a valid JSON string.
If the entity that the command is acting on accepts multiple parameters, pass "null" for null values within the JSON string.

Here is an example of starting a Workflow with the `--input` command option.
This Workflow expects a single string as a parameter:

```shell
temporal workflow start --input '"+1 555-555-5555"'
```
