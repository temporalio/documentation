---
id: how-do-we-build-this-with-temporal
title: How do we build this Long Running Human Driven Process application as a Temporal Application?
sidebar_label: Application architecture
---
There are a few angles from which to look at how to build this application with Temporal.

- Programming language: We will build this application using a Temporal SDK that enables us to use the full scope of the language within the context and framework of the Temporal Platform. This includes testing our code.
- Business processes is represented as a Workflow:  Each business process such as the main Background Check and each individual search are represented as a Workflow.
- Create and manage Workers: Temporal Worker Processes contain Worker Entities. Each Worker Entity listens to a specific Task Queue.
- CLI and APIs:

## What Temporal SDK is used to build this application?

This application is built using the Temporal Go SDK.

### How do we test our code?

Each Temporal SDK provides APIs to test Workflow Definitions and Activity Definitions. Developers can utilize their existing testing and mocking frameworks to write unit and integration tests for their mission critical Workflows.

Temporal also offers a Workflow replay functionality that is key in identifying production level issues, as well as ability to debug, again using existing debugger support.

## What are the business processes?

The following business processes have their own Workflow Definitions:

- Main Background Check
- Candidate Acceptance
- SSN Trace
- Federal criminal search
- State criminal search
- Motor vehicle search
- Employment verification
- Research Request

### Why use Workflows for searches instead of Activities?

For this learning path application we are using Workflows for searches for a few reasons.

1. Each search could be long running: In a real life scenario, we won't know how long a search might take to give us a result. Individual searches and Background Checks overall can often take hours or days to complete. While Temporal supports long running Activities, an actual search is conducted by a third party system, and therefore Heartbeats are not very helpful here. An Activity will be the one to make the call to the third party system, but we can just set a timeout and let the Workflow Execution be the long running process.
2. Division of responsibilities: In a real life scenario, you might have a team that is dedicated any particular search. The Background Check team can manages their Workflow Definition, while the the Federal criminal search team manages its own Workflow Definition, for example, to create a sort of inter-team distributed system that can work together to accomplish goals.
    - Bug fixes
    - CI/CD
3. The state of a Workflow is maintained: The results of an Activity are written to the Workflow Execution Event History. Instead of writing search results directly to our Background Check Workflow Execution, we can keep them separate in their own Workflow Execution and access them independently from Background Check Workflow.
4. Reduces the need to version Workflows: Workflow Execution Event Histories are separated.

## Do we need a database?

No. We will not need a database for this application. All of the application state is maintained by the Temporal Cluster.

In a real life scenario, to persist Background Check results longer than the Temporal Cluster retention period, we would have an additional business process Workflow to store Background Checks in a database, and an additional business process Workflow to retrieve them. Since the default retention period for a Temporal Cluster is 7 days, this application will not support that.

1. Other than checks requiring the address provided by the initial PII provided by the user, there is no dependency between checks.
2. As the application scales there would be a good chance that there will be per-task-queue workers deployed by different teams. For this sample I expect we'll stick with just one worker for simplicity.
3. The application would clearly have a web UI for each of the various roles involved in the flow. For the sample, for now, we'll just a CLI tool per role to imitate those.
4. Workflow/activity inputs/results will be encrypted using the standard data converter code.
5. Payment will be credit card based, and handled up front.

Just as a web based user interface would make use of a set of APIs to POST and GET data, our experience uses CLIs for each user type that interact with which communicate with our Application APIs.

[Application CLI reference](https://www.notion.so/Application-CLI-reference-2d97c22170104e57b7287b4c072cdc79)

Our application APIs are essentially a wrapper around Temporal Client APIs.

# What does the component topology look like?

Component diagram

![Learning path component diagram  (1).svg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a5964e49-d6f1-43a3-bc84-a9cfb722f58d/Learning_path_component_diagram__(1).svg)

The Temporal Client communicates with the Temporal Cluster.

The Temporal Cluster communicates with the Workers that execute our application code.
Our application will have at least 1 Worker Process with at least 1 Worker Entity.

However, in real life, our application could use as many Worker Processes each with as many Worker Entities as needed. We will cover this in more detail when answering "how to scale this application".

1. In order to allow splitting responsibilities across teams for the application developer all checks should be implemented as child workflows rather than as activities directly. This allows the team responsible for implementing the check to add whatever level of complexity they require to provide reliable results (control of internal retries, timeouts etc appropriate to the third party service they are using).
2. Each check should use its own task queue. This allows the use of task queue rate limits to adhere to request limits for the downstream service the check relies on. This is important for both reliability (rate-limit retry storms) and cost (overage charges). It can also help with monitoring with a view to scaling where required without wasting resources.
3. The user declining a background check or "failing" a check/verification stage should not fail a workflow, that is not an error condition.

BackgroundCheck(email, package)→(report) ID: BackgroundCheck-{email}

Main workflow. Created by the customer to start the background check process for a candidate. WorkflowID is derived from the email address to avoid a second run during the retention period and also make it easy to query for status.

ChildWorkflow: CandidateConfirmation(email)→(confirmation, full name, date of birth, SSN, address, employments)

1. Activity() [async]→(confirmation, name, date of birth, SSN, address, employments)
This activity will send a signal containing the activity completion token to the candidate's long running workflow requesting them to consent to the search. Once the candidate consents or declines the activity will be completed with the PII they provide (or fail as declined if appropriate).

Handle candidate confirmation

If the user declined skip to [building the report](https://www.notion.so/App-architecture-API-spec-V1-41f054a071bf4d828e12b4a9c979485b).

If confirmation workflow timed out fail the main workflow with "Confirmation timed out".

Otherwise we're good to carry on.

ChildWorkflow: SocialSecurityCheck(full name, date of birth, SSN) (valid)

1. Activity(name, date of birth, SSN)→(valid)
Query SSN API

Handle SocialSecurityCheck result

If the details were invalid skip to [building the report](https://www.notion.so/App-architecture-API-spec-V1-41f054a071bf4d828e12b4a9c979485b).

Otherwise we're good to carry on.

Main check processing stage

These child workflows are run in parallel (using futures). Which checks are run is determined by the package input to the main workflow.

ChildWorkflow: FederalCriminalSearch(name, address)→(crimes)

1. Activity(name, address) [async]→(crimes)
This activity will send a signal containing the activity completion token to the researcher's long running workflow requesting them to perform a criminal record search. Once the researcher provides the result the activity will be completed.

ChildWorkflow: StateCriminalSearch(name, address)→(crimes)

1. Activity(name, address)→(crimes)
This activity will send a signal containing the activity completion token to the researcher's long running workflow requesting them to perform a criminal record search. Once the researcher provides the result the activity will be completed.

ChildWorkflow: MotorVehicleIncidentSearch(name, address)→(incidents)

1. Activity(name, address)→(incidents)
Query third party API

ChildWorkflow: EmploymentSearch(name, address, employments)→(employment verifications)

For each employment (in parallel, using futures)

1. Activity() [async]→(employment verification)
This activity will send a signal containing the activity completion token to the researcher's long running workflow requesting them to confirm an employment. Once the researcher provides the result the activity will be completed.

Build report

Use the collected data to build a report (maybe a PDF?)

Email report to company

Let the candidate know the report is finished (but don't send them a copy)?

### Queries

The main workflow should be queryable at all times. It should return a list of checks with their current state.

### Search attributes

Unclear what we'll need here yet. Could store `email` as an attribute, but given the workflow ID is predictably based on that, not sure if there is an advantage to doing so.

Researcher(email) ID: Researcher-{email}

Long running workflow which manages a researchers outstanding work (todos).

The search workflows will signal this workflow when research is required, including the type of search needed and the completion token. Once the search result is provided the search workflow will signal the researcher workflow so we can remove the todo from our state.

Candidate(email) ID: Candidate-{email}

This is a long running workflow which records outstanding consents needed by a candidate (should only be one as we are single tenant and can only file a single background check per email). The BackgroundCheck workflow will signal this workflow when a consent is needed. Once consent is received another signal will be received so the todo can be removed from our state.

### Will we still need to rely on external dependencies?

For this example we are not relying on any External dependencies -

Background Check Workflow Definition

Candidate Consent Workflow Definition

Research requests Workflow function

![Full Background Check (1).svg](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/49a16071-1626-4c2d-8fe7-aca53df3dddb/Full_Background_Check_(1).svg)

Final Background Check report:

A Candidate screening process can have different Statuses, depending on what part of the process it is in. These statuses can incldue:

- Pending: the screening report is processing
- Complete: report is completed and ready for employer review
- Clear: report is complete and does not contain adverse info and does not need to be evaluated by employer
- Consider: report is complete and does contain information that needs to be evaluated by employer
- Dispute: report is complete, and Candidate has requested Checkr to contest the reports accuracy
- Suspended: report is incomplete, Checkr requested the Candidate to provide more information to complete the report, but candidate has not responded back within 7 days
