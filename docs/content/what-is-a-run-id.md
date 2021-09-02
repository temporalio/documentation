---
id: what-is-a-run-id
title: What is a Run Id?
description: A Run Id is a platform-level identifier for a Workflow Execution that is unique within a Namespace.
tags:
  - explanation
---

import RelatedReadList from '../components/RelatedReadList.js'

A Run Id is a platform-level identifier for a [Workflow Execution](#) that is unique within a [Namespace](docs/server/namespaces).

Temporal guarantees that only one [Workflow Execution](#) with a given [Workflow Id](what-is-a-workflow-id) can be open at a time.
But after the [Workflow Execution](#) has completed, if allowed by a configured policy, you might be able to re-execute a [Workflow](#) after it has closed or failed by using the same [Workflow Id](what-is-a-workflow-id).

Each such re-execution is called a run.
Run Id uniquely identifies a run even if it shares a [Workflow Id](what-is-a-workflow-id) with others.

<RelatedReadList
readliststring="What is a Workflow Id?/docs/content/what-is-a-workflow-id?e"
/>
