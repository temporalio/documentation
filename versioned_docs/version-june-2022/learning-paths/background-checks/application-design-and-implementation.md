---
id: application-design
title: How to design and implement the Background Check application
sidebar_label: Building the application
description: We start by mapping business process to Workflows.
tags:
  - learning-path
---

## What business processes are we mapping to Workflows?

The application maps each of the following business processes to its own Workflow Definition:

- [Main Background Check](/learning-paths/background-checks/main-background-check)
- [Candidate Acceptance](/learning-paths/background-checks/candidate-acceptance)
- [SSN Trace](/learning-paths/background-checks/ssn-trace)
- [Federal Criminal Search](/learning-paths/background-checks/federal-criminal-search)
- [State Criminal Search](/learning-paths/background-checks/state-criminal-search)
- [Motor Vehicle Search](/learning-paths/background-checks/motor-vehicle-search)
- [Employment Verification](/learning-paths/background-checks/employment-verification)

## Why use Child Workflows for Searches instead of Activities?

In this application, we use Child Workflows for Searches for a few reasons.

1. Each Search could be long running: In a real-life scenario, we won't know how long a Search might take to give us a result.
   Individual Searches and Background Checks overall can often take hours or days to complete.
   Although Temporal supports long running Activities, an actual Search is conducted by a third-party system, so Heartbeats are not very helpful here.
   An Activity does make the call to the third-party system, but we can set a Timeout on the Activity Execution and let the Workflow Execution be the long running process.
2. Division of responsibilities: In a real-life scenario, you might have a team that is dedicated to a particular Search.
   The Background Check team manages their Workflow Definition, while the Federal Criminal Search team manages its own Workflow Definition, for example, to create a sort of inter-team distributed system that can work together to accomplish goals.
   This makes it easier when it comes to delegating responsibilities around bug fixes and CI/CD pipelines.
3. The state of a Workflow is maintained: The results of an Activity are written to the Workflow Execution Event History.
   Instead of writing Search results directly to our Background Check Workflow Execution, we can keep them separate in their own Workflow Execution and access them independently from the Background Check Workflow.
4. Reduces the need to version the main Background Check Workflow: Workflow Execution Event Histories are separated.

## Which steps within a business process are we mapping to Activities?

In this application we are using Activities for the following business sub-processes:

- Sending email
- Calling third-party APIs

Sending an email message and calling third party APIs are considered unreliable steps in the business process.

## What happens if an Activity Execution fails?

Activities are meant to handle the unreliable steps of the business process.
To simulate unreliability, we have added some middleware that gives us about a 40% rate of failure on the third party API calls.
We have also configured similar functionality with our Mailhog instance that causes random SMTP failures.

Our Activities each use a default Retry Policy.
So when an Activity Task Execution fails the Temporal Cluster will try to execute the code again.
However, we have set a Schedule-To-Close Timeout of 1 minute for each Activity Execution that limits that overall execution time.
This means we won't ever wait longer than 1 minute for any given Activity Execution to complete.
Using a Schedule-To-Close Timeout to limit the overall execution time is often a better solution that using the Maximum Attempts setting on the Retry Policy, as it provides a clear time cutoff for real life use cases.

If an Activity Execution does fail, it returns the error from the latest attempt to the Workflow Execution that spawned it.
The Workflow then decides how to handle the fact that the Activity Execution failed.

## What happens if an individual Search fails?

For demonstration purposes, if an Activity Execution does fail, the Workflow Execution (Or Child Workflow Execution) that spawned it returns the error that was returned from the Activity Execution, and the Workflow Execution closes with a Failed status

Should an individual Search fail, the Background Check still returns as much of the report as it can.
The error that caused a Search to fail is included in the report.
The one exception to this is if the SSN Trace Child Workflow Execution fails, as the addresses that are returned from that Search are required to conduct the remaining Searches.

If an individual Search fails, then the Company HR Person can choose to run another Background Check if they want.

## Do we need a database?

No, we will not need a database for this application.
All of the application state is maintained by the Temporal Cluster.

While a Workflow Execution is Running, its Event History (state) is perpetually maintained.
When a Workflow Execution reaches a Closed status, the Temporal Cluster persists its Event History per the retention period.

In a real-life scenario, to persist the Event History of the Background Check longer than the Temporal Cluster retention period, we would have an additional business process Workflow to store Background Checks in a database, and an additional business process Workflow to retrieve them.
Because the default retention period for a Temporal Cluster is 7 days, this application will not support that.

## What does the component topology look like?

![Diagram of component topology of the Temporal Application](/diagrams/background-checks/component-topology.svg)

The Temporal Client communicates with the Temporal Cluster (Temporal Server + Database + Elasticsearch).

The Temporal Cluster communicates with the Workers that execute our application code.
Our application has one Worker Process and one Worker Entity.

However, in real life, our application could use as many Worker Processes (each with multiple Worker Entities) as needed.

## How do we ensure PII is encrypted in the Temporal Platform?

To ensure data is encrypted while in the Temporal Platform, we use a customized [Data Converter](/concepts/what-is-a-data-converter).

## How do we know what the status of a Background Check is

The status refers to the whether a Background Check is Open or Closed.

We can use the Temporal Platform's [Visibility APIs](/concepts/what-is-advanced-visibility) to see the status of any of our Workflow Executions.
In this application we wrapped the `bgc-company list` command around these Visibility APIs.
We also make sure to add custom Search Attributes to our Background Check Workflows.
When we run `bgc-company list` we are using the Visibility APIs and passing a [List Filter](/concepts/what-is-a-list-filter) that gives us back only the Background Check Workflow Executions.

## How do we know what the state of a Background Check is?

Not the same as "status", state refers to the values of variables in the Background Check Workflow Execution.
We can know the state by sending a Query to a Background Check.
The Background Check is developed to listen for a Query and provide data in response.
Our Background Check actually provides the same object in response to a Query as it does when the function returns.
Temporal automatically provides the result of the function if the Workflow Execution is in a closed state when the Query is processed by the Temporal Cluster.

This means that we can use a Query to get the state of a Background Check at any time.
We can see this implemented in the [Background Check Workflow Definition](/learning-paths/background-checks/main-background-check) where the Query Handler is set.

We also use a Query to get the details of the Candidate from the Employer Verification Workflow Execution when the Researcher uses the Web UI to load and verify the Candidate information.

## How do we get data into a running Workflow Execution?

We use Signals to get data into a running Workflow Execution.

## How do we handle a Cancellation Request of a business process?

Within a Workflow Definition, we have logic to explicitly handle a Cancellation Request, so we can "clean up" anything we need to prior to cancelling.
