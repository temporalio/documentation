This page describes how to start a Workflow Execution.

The Activity Definition specifies the function signature.

Configure the Retry Policy for your Activity.

Use the Temporal CLI to interact with Namespaces.

The Event History records each state change.

Set up a Task Queue for your Worker.

A Signal lets you send data to a running Workflow.

Use a Query to retrieve Workflow state.

The Data Converter handles serialization.

gRPC is the protocol used by Temporal Server.

Configure Search Attributes for Advanced Visibility.

A Schedule triggers Workflow Executions on a recurring basis.

Use Heartbeating to report Activity progress.

The Codec Server provides remote Payload encoding.

A Child Workflow Execution inherits the Parent Close Policy.

See the source file for the Worker:

[strands-agents/src/worker.ts](https://github.com/temporalio/samples-typescript/blob/main/strands-agents/src/worker.ts)
