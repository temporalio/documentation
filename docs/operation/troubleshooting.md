---
id: troubleshooting
title: Troubleshooting
sidebar_label: Troubleshooting
---

This section contains information to help you identify and resolve errors you may encounter.

### Known errors and issues

#### lookup failed for scheduledEventID to activityID

See [Nondeterministic troubleshooting steps](#nondeterministic-troubleshooting-steps)

#### unable to find activityID for the scheduledEventID

See [Nondeterministic troubleshooting steps](#nondeterministic-troubleshooting-steps)

#### nondeterministic Workflow error

See [Nondeterministic troubleshooting steps](#nondeterministic-troubleshooting-steps)

#### Potential deadlock

The Temporal Platform requires that a Workflow Function Execution run within 1 second, or it is considered _deadlocked_.

Use the Workflow replay APIs to replay the Workflow Execution from its Event History to try and replicate the issue.

- [How to replay a Workflow Execution in Go](/docs/go/how-to-replay-a-workflow-execution-in-go)

#### ApplicationFailure: 'MyFunction' is not a function

Verify that the Worker Entities have the proper Workflow Types, Activity Types registered and are listening to the proper Task Queues.

#### Workflow did not register a handler for MyQuery

Verify that the Worker Entities have the proper Workflow Types, Activity Types registered and are listening to the proper Task Queues.

#### [ERROR] Module not found: Error: Can't resolve

If you are running Temporal in a monorepo, then your `node_modules` may be in a different location than where Temporal expects to find it by default.
For more information, see the [Next.js tutorial](/docs/typescript/nextjs-tutorial) for setting up Temporal **within an existing monorepo**.

#### [ERROR] Failed to activate workflow

Temporal Workflow Bundles need to [export a set of methods that fit the compiled `worker-interface.ts` from `@temporalio/workflow`](https://github.com/temporalio/sdk-typescript/blob/eaa2d205c9bc5ff4a3b17c0b34f2dcf6b1e0264a/packages/worker/src/workflow/bundler.ts#L81) as an entry point.

The [bundleWorkflowCode](/docs/typescript/workers/#prebuilt-workflow-bundles) method may be of assistance if you're using the Webpack setting.

### Nondeterministic troubleshooting steps

A Workflow Execution will fail with a nondeterminism error if the Workflow Function Execution follows a different code path when it is re-executed.

For additional information on this requirement see the following:

- [Deterministic constraints](https://www.notion.so/docs/temporal-explained/workflows#deterministic-constraints))
- [Workflow logic requirements in Go](/docs/go/how-to-develop-a-workflow-definition-in-go#workflow-logic-requirements-in-go)
- [Workflow implementation constraints in Java](/docs/java/how-to-develop-a-workflow-definition-in-java#workflow-implementation-constraints)

To check for nondeterministic code in the function or in a function called by the Workflow, run the [Temporal Workflow check](https://github.com/temporalio/sdk-go/tree/master/contrib/tools/workflowcheck) tool.

Additionally, you can replay the Workflow Execution using its Event History as many times as needed to try and replicate errors.

- [How to replay a Workflow Execution in Go](/docs/go/how-to-replay-a-workflow-execution-in-go)

## Need more help?

If none of these troubleshooting techniques helped, then contact us via the [Community Forum](https://community.temporal.io/) or [Community Slack](https://temporal.io/slack) and provide the following information to help us help you:

- Version
  - Provide the SDK version.
  - Provide the Server version.
  - When working in the Temporal Cloud, provide the URL.
- Workflow history
  - Provide the JSON history from the tctl.
- Full stack traces
  - Provide full stack traces.
- Clear description of the issue
  - Provide a clear description of the issue and steps you took to produce the error.
