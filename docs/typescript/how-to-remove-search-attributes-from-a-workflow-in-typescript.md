---
id: how-to-remove-search-attributes-from-a-workflow-in-typescript
title: How to remove Search Attributes from a Workflow in TypeScript
sidebar_label: Remove Search Attributes from a Workflow
description: How to remove Search Attributes from a Workflow
tags:
  - developer-guide
  - typescript
  - client
---

**There is no support for removing a field.**

However, to achieve a similar effect, set the field to some placeholder value.
For example, you could set `CustomKeywordField` to `impossibleVal`.
Then searching `CustomKeywordField != 'impossibleVal'` will match Workflows with `CustomKeywordField` not equal to `impossibleVal`, which includes Workflows without the `CustomKeywordField` set.
