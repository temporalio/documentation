---
id: application-design
title: How to design and implement the Background Check application?
sidebar_label: Building the application
---

## What business processes are we mapping to Workflows?

The application maps each of the following business processes to their own Workflow Definitions:

- [Main Background Check](#main-background-check)
- [Candidate Acceptance](#candidate-acceptance)
- [SSN Trace](#ssn-trace)
- [Federal criminal Search](#federal-criminal-search)
- [State criminal Search](#state-criminal-search)
- [Motor vehicle Search](#motor-vehicle-search)
- [Employment Verification](#employment-verification)

### Main Background Check

This is the entry point of the Temporal Application.
When a new Background Check is started, this is the function that executes.

<!--SNIPSTART background-checks-main-workflow-definition-->

[Take me to the code](https://github.com/temporalio/background-checks/blob/main/workflows/background_check.go)

<!--SNIPEND-->

![Main Background Check Workflow Execution flow](/diagrams/background-checks/main-background-check.svg)

### Candidate Acceptance

![Candidate Acceptance Child Workflow Execution flow](/diagrams/background-checks/candidate-accept-flow.svg)

<!--SNIPSTART background-checks-accept-workflow-definition-->

[Take me to the code](https://github.com/temporalio/background-checks/blob/main/workflows/accept.go)

<!--SNIPEND-->

### SSN Trace

![SSN Trace Child Workflow Execution flow](/diagrams/background-checks/ssn-trace-flow.svg)

<!--SNIPSTART background-checks-snn-trace-workflow-definition-->

[Take me to the code](https://github.com/temporalio/background-checks/blob/main/workflows/ssn_trace.go)

<!--SNIPEND-->

### Federal Criminal Search

![Federal Criminal Search Child Workflow Execution flow](/diagrams/background-checks/federal-criminal-search-flow.svg)

<!--SNIPSTART background-checks-federal-criminal-workflow-definition-->

[Take me to the code](https://github.com/temporalio/background-checks/blob/main/workflows/federal_criminal_search.go)

<!--SNIPEND-->

### State Criminal Search

![State Criminal Search Child Workflow Execution flow](/diagrams/background-checks/state-criminal-search-flow.svg)

<!--SNIPSTART background-checks-state-criminal-workflow-definition-->

[Take me to the code](https://github.com/temporalio/background-checks/blob/main/workflows/state_criminal_search.go)

<!--SNIPEND-->

### Motor Vehicle Search

![State Criminal Search Child Workflow Execution flow"](/diagrams/background-checks/motor-vehicle-search-flow.svg)

<!--SNIPSTART background-checks-motor-vehicle-workflow-definition-->

[Take me to the code](https://github.com/temporalio/background-checks/blob/main/workflows/motor_vehicle_incident_search.go)

<!--SNIPEND-->

### Employment Verification

![Employment Verification Child Workflow Execution flow](/diagrams/background-checks/employment-verification-flow.svg)

<!--SNIPSTART background-checks-employment-verification-workflow-definition-->

[Take me to the code](https://github.com/temporalio/background-checks/blob/main/workflows/employment_verification.go)

<!--SNIPEND-->

## Which steps within a business process are we mapping to Activities?

The steps within the business processes that we are mapping to Activities are the following:

- Sending emails
- Calling third party APIs

## Why use Workflows for Searches instead of Activities?

For this Learning Path application we are using Workflows for searches for a few reasons.

1. Each search could be long running: In a real life scenario, we won't know how long a search might take to give us a result.
   Individual searches and Background Checks overall can often take hours or days to complete.
   While Temporal supports long running Activities, an actual search is conducted by a third party system, and therefore Heartbeats are not very helpful here.
   An Activity will be the one to make the call to the third party system, but we can just set a timeout and let the Workflow Execution be the long running process.
2. Division of responsibilities: In a real life scenario, you might have a team that is dedicated to a particular search.
   The Background Check team can manages their Workflow Definition, while the the Federal criminal search team manages its own Workflow Definition, for example, to create a sort of inter-team distributed system that can work together to accomplish goals.
   - Bug fixes
   - CI/CD
3. The state of a Workflow is maintained: The results of an Activity are written to the Workflow Execution Event History.
   Instead of writing Search results directly to our Background Check Workflow Execution, we can keep them separate in their own Workflow Execution and access them independently from Background Check Workflow.
4. Reduces the need to version Workflows: Workflow Execution Event Histories are separated.

## What happens if an Activity Execution fails?

## What happens if an individual Search fails?

## Do we need a database?

No, we will not need a database for this application.
All of the application state is maintained by the Temporal Cluster.

While a Workflow Execution is Running, its Event History (state) is perpetually maintained.
Once a Workflow Execution reaches a Closed status the Temporal Cluster will persist its Event History per the retention period.

In a real life scenario, to persist the Event History of the Background Check longer than the Temporal Cluster retention period, we would have an additional business process Workflow to store Background Checks in a database, and an additional business process Workflow to retrieve them. Since the default retention period for a Temporal Cluster is 7 days, this application will not support that.

## What does the component topology look like?

![Long running human driven Workflow component topology](/diagrams/background-checks/component-topology.svg)

The Temporal Client communicates with the Temporal Cluster.

The Temporal Cluster communicates with the Workers that execute our application code.
Our application has one Worker Process and one Worker Entity.

However, in real life, our application could use as many Worker Processes each with as many Worker Entities as needed.

## How do we ensure PII is encrypted in the Temporal Platform?

To encrypt data in the Temporal Platform, we use a customized [Data Converter](/docs/content/what-is-a-data-converter).

A custom Data Converter works in conjunction with a Context Propagator.

## How do we know what the status of each Workflow Execution is?

We can use the Temporal Platform's built in List APIs to see the status of any of our Workflow Executions.

## How do we get data into a running Workflow Execution?

We use Signals to get data into a running Workflow Execution.

## How do we handle a Cancellation Request of a business process?

Within a Workflow Definition, we have logic to explicitly handle a Cancellation Request, so that we may "clean up" anything we need to prior to cancelling.
