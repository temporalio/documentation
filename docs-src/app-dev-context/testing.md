---
id: testing
title: Testing
description: The testing section of the Temporal Application development guide describes the frameworks that facilitate Workflow and integration testing.
sidebar_label: Testing
tags:
  - guide-context
---

The testing section of the Temporal Application development guide describes the frameworks that facilitate Workflow and integration testing.

In the context of Temporal, you can create these types of automated tests:

- **End-to-end**: Running a Temporal Server and Worker with all its Workflows and Activities; starting and interacting with Workflows from a Client.
  - Running Activities with mocked Context and other SDK imports (and usually network requests).
  - Running Workers with mock Activities, and using a Client to start Workflows.
  - Running Workflows with mocked SDK imports.
- **Integration**: Anything between end-to-end and unit testing, including:
- **Unit**: Running a piece of Workflow or Activity code (a function or method) and mocking any code it calls.

We generally recommend writing the majority of your tests as integration tests.

For both end-to-end tests and integration tests with a Worker, we recommend using the Test Server, as it supports [skipping time](#skip-time).
