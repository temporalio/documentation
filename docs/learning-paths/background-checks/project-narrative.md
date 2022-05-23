---
id: project-narrative
title: Welcome to the Background Check project
description: The goal of this project is to teach you, the developer, how to think about building Temporal Applications that have Human-Driven Long-Running Workflows using a Temporal SDK, by leading you through a comprehensive implementation within the context of a real-life use case.
sidebar_label: Introduction
---

## What is the goal of this project?

The goal of this project is to teach you, the developer, how to think about building Temporal Applications that have Human-Driven Long-Running Workflows using a Temporal SDK, by leading you through a comprehensive implementation within the context of a real-life use case.

## What is a Human-Driven Long-Running Workflow?

A Human-Driven Long-Running Workflow is a Temporal Workflow Execution that could be Running (that is, in an Open state) for hours, days, weeks, or even years and that requires input from a real person to progress.

## What is the real-life use case?

Checkr launched in 2014 and has since become the leading tech company in the Background Check industry.
Checkr’s intention is to make Background Checks fast, easy, and efficient for countries around the world.

A [Temporal case study from October 2020](/blog/how-temporal-simplified-checkr-workflows) touches on the demand for automated Background Checks due to a surge in gig economy employment.
The case study explores the interesting problem space that presented itself as demand scaled.

Depending on the type of employment, the needs of a Background Checks for any given Candidate can vary.
Often a single Background Check results in a dozen individual Searches for information.
Sometimes the only way to conduct or get the results of a Search is by taking a manual step, like making a phone call or uploading a file.

Some of the more common Searches in a Background Check include:

- SSN trace for known aliases and addresses
- Federal criminal records check
- State criminal records check
- County civil records check
- County criminal records check
- Municipal criminal records check
- Employment verification
- Education verification
- Motor vehicle history
- Drug and health screen

If the Candidate (the subject of the Background Check) is associated with multiple addresses, multiple state-level, county-level, and municipal-level Searches could occur.
Some of the Searches can be done against public-facing databases; others might require parsing images or PDF files.
With each individual Search, there is an opportunity for something to happen that can cause a delay.

Checkr needed to have solutions for problems such as:

- Having a large volume of long-running business processes (hours, days, weeks) that often need to fall back to a human for input
- Communicating with thousands of external endpoints that are used to query for information
- Correlating a large volume of messages from a variety of unreliable sources.

### How did Checkr solve these problems before Temporal?

To address those problems, Checkr implemented a complex state machine using standalone databases, Kafka queues, and microservices.

But this approach introduced its own set of problems.

- Testing and applying updates and features to the live system was very hard, and there were no official means by which to do it.
- New engineers needed to understand the entire Checkr-specific state machine architecture, regardless of the team or area they were working on.
- Even when things went as expected, the percentage of issues and failures at that scale meant that it was not reliable as desired.

Checkr understood that something needed to change to their approach and started looking for solutions.
In their search, they came across the Temporal Platform.

### Why is the Temporal Platform a great fit for this use case?

Code based workflows appeal to developers as business processes (Background Checks) map directly to Workflow functions.
This results in a very close mapping of business requirements to code.

The Temporal Platform has built-in support to handle a wide set of failures, so there isn’t a need to maintain infrastructure for that purpose.

Code is testable, and the Temporal Platform includes the ability to test Workflow functions and Activity functions while still enabling developers to use their existing testing and mocking frameworks to write unit and integration tests for mission-critical code.

Cancelling a Background Check and rolling back state (compensation) is defined within the Workflow code.

Temporal has built-in debugging and troubleshooting tools, such as “replays” that allow developers to step through an execution to see what happened.

The Temporal Platform is designed to support business processes that could span decades, so maintaining the complex state of a Background becomes far more trivial

And the Temporal Platform has built-in Visibility APIs to view the status and get the state of a Workflow Execution at any time, as well as metric endpoints to monitor the health of the platform.

## What are the technical concepts introduced in this project?

This project introduces the following concepts:

- [Activity Definition](/concepts/what-is-an-activity-definition)
- [Activity Execution](/concepts/what-is-an-activity-execution)
- [Advanced Visibility](/concepts/what-is-advanced-visibility)
- [Child Workflow Execution](/concepts/what-is-a-child-workflow-execution)
- [Custom Data Converter](/concepts/what-is-a-data-converter)
- [List Filters](/concepts/what-is-a-list-filter)
- [Search Attributes](/concepts/what-is-a-search-attribute)
- [Side Effect](/concepts/what-is-a-side-effect)
- [Task Queue](/concepts/what-is-a-task-queue)
- [Temporal Client](#)
- [Temporal Web UI](#)
- [Worker](/concepts/what-is-a-worker)
- [Workflow Definition](/concepts/what-is-a-workflow-definition)
- [Workflow Execution](/concepts/what-is-a-workflow-execution)
- [Workflow Id](/concepts/what-is-a-workflow-id)
- [Workflow Id Reuse Policy](/concepts/what-is-a-workflow-id-reuse-policy)
- [Workflow Type](/concepts/what-is-a-workflow-type)

## What are the technical how-tos introduced in this application?

The following development "how-tos" provide a foundation for the development patterns expressed in this project:

- [How to develop a Workflow Definition in Go](/go/how-to-develop-a-workflow-definition-in-go)
- [How to spawn a Workflow Execution in Go](/go/how-to-spawn-a-workflow-execution-in-go)
- [How to set StartWorkflowOptions in Go](/go/startworkflowoptions-reference)
- [How to get the result of a Workflow Execution in Go](/go/how-to-get-the-result-of-a-workflow-execution-in-go)
- [How to send a Cancellation Request to a Workflow Execution in Go](/go/how-to-request-cancellation-of-a-workflow-execution-in-go)
- [How to use Signals in Go](/go/how-to-use-signals-in-go)
- [How to send a Query to a Workflow Execution in Go](#)
- [How to handle a Query in a Workflow in Go](#)
- [How to spawn a Child Workflow Execution in Go](/go/how-to-spawn-a-child-workflow-execution-in-go)
- [How to spawn an Activity Execution in Go](/go/how-to-spawn-an-activity-execution-in-go)
- [How to develop an Activity Definition in Go](/go/how-to-develop-an-activity-definition-in-go)
- [How to set ActivityOptions in Go](/go/activityoptions-reference)
- [How to develop a Worker Program in Go](/go/how-to-develop-a-worker-program-in-go)
- [How to provide a custom Data Converter in Go](#)
- [How to execute a Side Effect in Go](/go/how-to-execute-a-side-effect-in-go)
