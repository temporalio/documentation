---
id: what-is-a-failure
title: What is a Failure?
sidebar_label: Failure
description: Temporal Failures are representations of various types of errors that occur in the system.
tags:
  - term
  - explanation
---

Temporal Failures are representations (in the SDKs and Event History) of various types of errors that occur in the system.

- KB article: [Temporal Failures](/kb/failures)

Failure handling is an essential part of development.
For more information, including the difference between application-level and platform-level failures, see [Handling Failure From First Principles](https://dominik-tornow.medium.com/handling-failures-from-first-principles-1ed976b1b869).
For the practical application of those concepts in Temporal, see [Failure Handling in Practice](https://temporal.io/blog/failure-handling-in-practice).

For languages that throw (or raise) errors (or exceptions), throwing an error that is not a Temporal Failure from a Workflow fails the Workflow Task (and the Task will be retried until it succeeds), whereas throwing a Temporal Failure (or letting a Temporal Failure propagate from Temporal calls, like an [Activity Failure](/kb/failures#activity-failure) from an Activity call) fails the Workflow Execution.
For more information, see [Application Failure](/kb/failures#application-failure).
