---
id: what-is-a-workflow-id-reuse-policy
title: What is a Workflow Id Reuse Policy?
description: todo
---

A Workflow Id Reuse Policy determines whether a Workflow Execution is allowed to spawn with a particular Workflow Id, if that Workflow Id has been used with a previous, and now Closed, Workflow Execution.

import NoDuplicateWorklfowIdForOpenWorkflowExecution from "../reminders/note-cannot-duplicate-workflowid-of-open-workflow-execution.md"

<NoDuplicateWorklfowIdForOpenWorkflowExecution/>

A Workflow Id Reuse Policy has three possible values:

- **Allow Duplicate** The Workflow Execution is allowed to exist regardless of the Closed status of a previous Workflow Execution with the same Workflow Id.
  **This is the default policy, if one is not specified.**
  Use this when it is OK to have a Workflow Execution with the same Workflow Id as a previous, but now Closed, Workflow Execution.
- **Allow Duplicate Failed Only**: The Workflow Execution is allowed to exist only if a previous Workflow Execution with the same Workflow Id does not have a Completed status.
  Use this policy when there is a need to re-execute a Failed, Timed Out, Terminated or Cancelled Workflow Execution and guarantee that the Completed Workflow Execution will not be re-executed.
- **Reject Duplicate**: The Workflow Execution cannot exist if there is a previous Workflow Execution with the same Workflow Id.
  Use this when there can only be one Workflow Execution per Workflow Id within a Namespace for the given retention period.

**Consider Retention Period**: A Workflow Id Reuse Policy only applies if there is a Closed Workflow Execution with the same Workflow Id within the associated Namespace's Retention Period.
For example, if the Namespace's retention period is 30 days, a Workflow Id Reuse Policy can only compare the Workflow Id of the spawning Workflow Execution against the Closed Workflow Executions for the last 30 days.

**Violating the policy results in Termination**: Any Workflow Execution that is spawned with a Workflow Id Reuse Policy that does not allow it, with be Terminated immediately.
  These Terminated Workflow Executions will appear in the Web UI.
