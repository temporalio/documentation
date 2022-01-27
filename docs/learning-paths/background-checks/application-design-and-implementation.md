---
id: application-design
title: How to design and implement the Background Check application
sidebar_label: Building the application
---

## What business processes are we mapping to Workflows?

The application maps each of the following business processes to its own Workflow Definition:

- [Main Background Check](/docs/learning-paths/background-checks/main-background-check)
- [Candidate Acceptance](/docs/learning-paths/background-checks/candidate-acceptance)
- [SSN Trace](/docs/learning-paths/background-checks/ssn-trace)
- [Federal Criminal Search](/docs/learning-paths/background-checks/federal-criminal-search)
- [State Criminal Search](/docs/learning-paths/background-checks/state-criminal-search)
- [Motor Vehicle Search](/docs/learning-paths/background-checks/motor-vehicle-search)
- [Employment Verification](/docs/learning-paths/background-checks/employment-verification)

## Which steps within a business process are we mapping to Activities?

In this application we are using Activities for the following business sub-processes:

- Sending email
- Calling third-party APIs

## Why use Child Workflows for Searches instead of Activities?

For this Learning Path application, we use Workflows for Searches for a few reasons.

1. Each Search could be long running: In a real-life scenario, we won't know how long a Search might take to give us a result.
   Individual Searches and Background Checks overall can often take hours or days to complete.
   Although Temporal supports long running Activities, an actual Search is conducted by a third-party system, so Heartbeats are not very helpful here.
   An Activity does make the call to the third-party system, but we can set a Timeout and let the Workflow Execution be the long running process.
2. Division of responsibilities: In a real-life scenario, you might have a team that is dedicated to a particular Search.
   The Background Check team manages their Workflow Definition, while the Federal Criminal Search team manages its own Workflow Definition, for example, to create a sort of inter-team distributed system that can work together to accomplish goals.
   - Bug fixes
   - CI/CD
3. The state of a Workflow is maintained: The results of an Activity are written to the Workflow Execution Event History.
   Instead of writing Search results directly to our Background Check Workflow Execution, we can keep them separate in their own Workflow Execution and access them independently from the Background Check Workflow.
4. Reduces the need to version Workflows: Workflow Execution Event Histories are separated.

## What happens if an Activity Execution fails?

We have a choice to make about how long we are willing to wait for something to
An Activity Execution fails if it is unable to complete in 1 minute.
To ensure that this happens
<!-- TODO -->

- What happens if an Activity Task Execution fails?
    - Describe the “chaos” implementation that gives us 40% failure rate on third party API calls
        - We use some HTTP middleware in our third party API simulator code that triggers failure on a percentage of API calls. We have also configured similar functionality in Mailhog that causes it to randomly fail SMTP requests from our application.
- What happens if an Activity Execution fails?
    - Why/how do we propagate that failure?
        - The activity will be automatically retried as per our retry policy. If the retries are exhausted the error from the last attempt will be returned to the workflow which executed the activity. It’s then up to the workflow to decide what to do. In our current code should an activity fail we fail the workflow (or child workflow), returning the error from the activity.
- What happens if a Child Workflow Execution (Search) fails?
    - In our case an Activity Execution failure should result in the Child Workflow Execution returning an error - why/how?
        - Our business logic is that should an individual search fail we should return as much of the report as we can and let the hiring manager know one of the searches failed. We include the error from the activity in the report to aid in debugging. The hiring manager can then make a decision as to whether the check should be re-run or not.
- Should the main Background Check ever “fail”?
    - The main background check should never fail due to a failed search, or if a candidate declines the check. However, should the SSN trace fail the background check should fail as well as this is an unrecoverable situation which most likely requires operator action to fix. Once the issue with the SSN trace is fixed the failed workflow can be reset, resuming from the SSN trace.
    - Regressions during a deploy of the main workflow will generally cause workflow task failure, but not failure of the main workflow. This is one of the features of Temporal and allows Temporal to keep trying to make progress until a fix is deployed without needing to restart all affected workflows manually.

## What happens if an individual Search fails?

<!-- TODO -->

## Do we need a database?

No, we will not need a database for this application.
All of the application state is maintained by the Temporal Cluster.

While a Workflow Execution is Running, its Event History (state) is perpetually maintained.
When a Workflow Execution reaches a Closed status, the Temporal Cluster persists its Event History per the retention period.

In a real-life scenario, to persist the Event History of the Background Check longer than the Temporal Cluster retention period, we would have an additional business process Workflow to store Background Checks in a database, and an additional business process Workflow to retrieve them.
Because the default retention period for a Temporal Cluster is 7 days, this application will not support that.

## What does the component topology look like?

![Diagram of component topology of the Temporal Application](/diagrams/background-checks/component-topology.svg)

The Temporal Client communicates with the Temporal Cluster.

The Temporal Cluster communicates with the Workers that execute our application code.
Our application has one Worker Process and one Worker Entity.

However, in real life, our application could use as many Worker Processes (each with multiple Worker Entities) as needed.

## How do we ensure PII is encrypted in the Temporal Platform?

To encrypt data in the Temporal Platform, we use a customized [Data Converter](/docs/content/what-is-a-data-converter).

A custom Data Converter works in conjunction with a Context Propagator.

## How do we know what the status of each Workflow Execution is?

We can use the Temporal Platform's built-in List APIs to see the status of any of our Workflow Executions.

## How do we get data into a running Workflow Execution?

We use Signals to get data into a running Workflow Execution.

## How do we handle a Cancellation Request of a business process?

Within a Workflow Definition, we have logic to explicitly handle a Cancellation Request, so we can "clean up" anything we need to prior to cancelling.
