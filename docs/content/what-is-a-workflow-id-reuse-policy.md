---
id: what-is-a-workflow-id-reuse-policy
title: What is a Workflow Id Reuse Policy?
description: todo
---

import RelatedReadList from '../components/RelatedReadList.js'

A Workflow Id Reuse Policy determines whether the associated Workflow Execution can spawn with a particular Workflow Id if that Workflow Id has been used with a previous, and now Closed, Workflow Execution.

It is never possible for a new Workflow Execution to spawn with the same Workflow Id as another Open Workflow Execution.
A Workflow Id Reuse Policy only applies if there is a Closed Workflow Execution with the same Workflow Id within the associated Namespace's retention period.
For example, if the Namespace's retention period is 30 days, a Workflow Id Reuse Policy can only compare the Workflow Id against Closed Workflow Executions for the last 30 days.

Any attempt to spawn a Workflow Execution that has a Workflow Id Reuse Policy that does not allow it, will Fail with a "Workflow execution already started" error.

A Workflow Id Reuse Policy has three possible values:

**Allow Duplicate**

This means that the Workflow Execution is allowed to spawn regardless of the Closed status of a previous Workflow Execution with the same Workflow Id.

_This is the default policy, if one is not specified._

Use this when it is OK to spawn a Workflow Execution with the same Workflow Id as a previous, but now Closed, Workflow Execution.

**Allow Duplicate Failed Only**

This policy means that the Workflow Execution is allowed to spawn only if a previous Workflow Execution with the same Workflow Id has Failed.

Use this policy when there is a need to re-execute a Failed Workflow Execution and guarantee that the Completed Workflow Execution will not be re-executed.

**Reject Duplicate**

This policy means that the associated Workflow Execution cannot spawn if there is a previous Workflow Execution with the same Workflow Id.

Use this when there can only be one Workflow Execution per Workflow Id within a Namespace for the given retention period.

<RelatedReadList
readliststring="What is a Workflow Id?#?e"
/>
