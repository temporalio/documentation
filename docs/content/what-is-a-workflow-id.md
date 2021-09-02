---
id: what-is-a-workflow-id
title: What is a Workflow Id?
description: A Workflow Id is an application-level identifier for a Workflow Execution that is unique within a Namespace.
tags:
  - explanation
---

import RelatedReadList from '../components/RelatedReadList.js'

A Workflow Id is an application-level identifier for a [Workflow Execution](#) that is unique within a [Namespace](docs/server/namespaces).

A [Workflow](#) is uniquely identified by its [Namespace](docs/server/namespaces), Workflow Id, and [Run Id](what-is-a-run-id).

An attempt to start a [Workflow](#) with a duplicate Workflow Id results in an **already started** error if another open [Workflow Execution](#) has the same Workflow Id.
However, this behavior depends on the `WorkflowIdReusePolicy` flag; if set to `ALLOW_DUPLICATE`, it is possible to start a new execution with the same Workflow Id.

You can assign a custom Workflow Id to a [Workflow](#).
Use a custom Workflow Id for business-level identification, such as a customer ID or an order ID.

<RelatedReadList
readliststring="What is a Workflow Id Reuse Policy?/docs/content/what-is-a-workflow-id-reuse-policy?e|What is a Run Id?/docs/content/what-is-a-run-id?e"
/>
