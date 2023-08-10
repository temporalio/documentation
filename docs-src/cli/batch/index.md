---
id: index
title: temporal batch index
sidebar_label: batch
description: Operations performed on Batch jobs.
tags:
  - cli reference
  - temporal cli
  - batch
  - cli-feature
  - command-line-interface-cli
---

Batch commands change multiple [Workflow Executions](/concepts/what-is-a-workflow-execution) by providing a [List Filter](/concepts/what-is-visibility) and the type of Batch job to execute.
The List Filter identifies the Workflow Executions in the Batch job; the Batch type determines what will happen to the Workflow Executions.

There are three types of Batch Jobs:

- Signal: sends a [Signal](/concepts/what-is-a-signal) to the Workflow Executions specified by the List Filter.
- Cancel: cancels the Workflow Executions specified by the List Filter.
- Terminate: terminates the Workflow Executions specified by the List Filter.

A successfully started Batch job will return a Job ID.
Use this Job ID to execute other actions on the Batch job.
