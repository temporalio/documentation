---
id: describe
title: tctl namespace describe
sidebar_label: describe
description: How to describe a Namespace using tctl.
tags:
  - reference
  - tctl
---

The `tctl namespace describe` command describes a Namespace.

`tctl namespace describe`

The following modifier controls the behavior of the command.

### `--namespace-id`

How to specify the ID of a Namespace to describe.

This modifier is required unless the `--namespace` modifier is specified (`tctl --namespace <name> describe`).

**Example**

```
tctl namespace describe --namespace-id <id>
```
