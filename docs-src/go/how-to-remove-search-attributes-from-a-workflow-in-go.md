---
id: how-to-remove-search-attributes-from-a-workflow-in-go
title: How to remove Search Attributes from a Workflow in Go
sidebar_label: How to remove Search Attributes from a Workflow
description: How to remove Search Attributes from a Workflow
tags:
  - developer-guide
  - go
---

**There is no support for removing a field.**

However, to achieve a similar effect, set the field to some placeholder value.
For example, you could set `CustomKeywordField` to `impossibleVal`.
Then searching `CustomKeywordField != 'impossibleVal'` will match Workflows with `CustomKeywordField` not equal to `impossibleVal`, which includes Workflows without the `CustomKeywordField` set.
