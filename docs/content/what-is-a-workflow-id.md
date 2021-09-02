---
id: what-is-a-workflow-id
title: What is a Workflow Id?
description: A Workflow Id is a customizable, application-level identifier for a Workflow Execution that is unique to an Open Workflow Execution within a Namespace.
tags:
  - explanation
---

import RelatedReadList from '../components/RelatedReadList.js'

A Workflow Id is a customizable, application-level identifier for a [Workflow Execution](/docs/content/what-is-a-workflow-execution) that is unique to an Open Workflow Execution within a [Namespace](docs/server/namespaces).

A Workflow Id is often a business-level customer ID or order ID.

A [Workflow Id Reuse Policy](/docs/content/what-is-a-workflow-id-reuse-policy) can be used to manage whether a Workflow Id can be re-used.

import NoDuplicateWorklfowIdForOpenWorkflowExecution from "../reminders/note-cannot-duplicate-workflowid-of-open-workflow-execution.md"

<NoDuplicateWorklfowIdForOpenWorkflowExecution/>

<RelatedReadList
readlist={[
["What is a Run Id?","/docs/content/what-is-a-run-id","explanation"],
]}
/>
