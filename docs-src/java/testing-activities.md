---
id: testing-activities
title: Testing Activities
description: Testing provides a framework to facilitate Workflow and integration testing.
sidebar_label: Test Activities
tags:
  - guide-context
---

Mocking isolates code undergoing testing so the focus remains on the code, and not on external dependencies or other state. You can test activities using a mocked Activity environment.

This approach offers a way to mock the Activity context, listen to Heartbeats, and cancel the Activity. You test the Activity in isolation, calling it directly without needing to create a Worker to run it.

Temporal provides the `TestActivityEnvironment` and `TestActivityExtension` classes for testing Activities outside the scope of a Workflow. Testing
Activities are similar to testing non-Temporal Java code.

For example, you can test an Activity for:

- Exceptions thrown when invoking the Activity Execution.
- Exceptions thrown when checking for the result of the Activity Execution.
- Activity return values.
  Check that the return value matches the expected value.
