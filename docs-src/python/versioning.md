---
id: versioning
title: Versioning
description: Version Workflows in Python
sidebar_label: Versioning
tags:
  - python
  - versioning
---

The definition code of a Temporal Workflow must be deterministic because Temporal uses event sourcing
to reconstruct the Workflow state by replaying the saved history event data on the Workflow
definition code. This means that any incompatible update to the Workflow Definition code could cause
a non-deterministic issue if not handled correctly.

## Introduction to Versioning

Because we design for potentially long running Workflows at scale, versioning with Temporal works differently. We explain more in this optional 30 minute introduction: [https://www.youtube.com/watch?v=kkP899WxgzY](https://www.youtube.com/watch?v=kkP899WxgzY)
