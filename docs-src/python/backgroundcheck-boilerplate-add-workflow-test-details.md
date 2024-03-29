---
id: backgroundcheck-boilerplate-add-workflow-test-details
title: Add Workflow function test details
sidebar_label: Test Workflow code details
description: Details about how to test Workflow code
tags:
- testing
- developer guide
- go sdk
---

<!-- DO NOT EDIT THIS FILE DIRECTLY.
THIS FILE IS GENERATED from https://github.com/temporalio/documentation-samples-python/blob/bgc/backgroundcheck_boilerplate/tests/workflow_dacx_test.py. -->

This is a unit test written in Python using the pytest library.

The test checks the `execute_workflow` method of the `BackgroundCheck` workflow.

The test creates a new `WorkflowEnvironment` and a `Worker` with a task queue and the `BackgroundCheck` workflow and `ssn_trace_activity` activity.

Then, it executes the `BackgroundCheck.run` method with a social security number and a unique ID, and asserts that the result is equal to "pass".

The test is marked with `@pytest.mark.asyncio` to indicate that it is an asynchronous test.
