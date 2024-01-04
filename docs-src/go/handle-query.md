---
id: handle-query
title: How to handle a Query
description: Queries are handled by your Workflow.
sidebar_label: Handle Query
tags:
  - developer-guide-doc-type
  - query
---

Queries are handled by your Workflow.

Don’t include any logic that causes [Command](/concepts/what-is-a-command) generation within a Query handler (such as executing Activities).
Including such logic causes unexpected behavior.
