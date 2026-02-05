---
id: retry-policies
title: What is a Temporal Retry Policy?
sidebar_label: Retry Policies
description:
  Optimize your Workflow and Activity Task Executions with a custom Retry Policy on Temporal. Understand default
  retries, intervals, backoff, and maximum attempts for error handling.
toc_max_heading_level: 4
keywords:
  - activities
  - retry policy
tags:
  - Activities
  - Concepts
---

import { CaptionedImage, RelatedReadContainer, RelatedReadItem } from '@site/src/components';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A Retry Policy is a collection of settings that tells Temporal how and when to try again after something fails in a
Workflow Execution or Activity Task Execution.

## Overview

Temporal's default behavior is to automatically retry an Activity that fails, so transient or intermittent failures
require no action on your part. This behavior is defined by the Retry Policy.

A Retry Policy is declarative. You do not need to implement your own logic for handling the retries; you only need to
specify the desired behavior and Temporal will provide it.

In contrast to the Activities it contains, a Workflow Execution itself is not associated with a Retry Policy by default.
This may seem counterintuitive, but Workflows and Activities perform different roles. Activities are intended for
operations that may fail, so having a default Retry Policy increases the likelihood that they will ultimately complete
successfully, even if the initial attempt failed. On the other hand, Workflows must be deterministic and are not
intended to perform failure-prone operations. While it is possible to assign a Retry Policy to a Workflow Execution,
this is not the default and it is uncommon to do so.

Retry Policies do not apply to Workflow Task Executions, which retry until the Workflow Execution Timeout (which is
unlimited by default) with an exponential backoff and a max interval of 10 minutes. A Retry Policy instructs the
Temporal Service how to retry a failure of either a [Workflow Execution](/workflow-execution) or an
[Activity Task Execution](/tasks#activity-task-execution).

Try out the [Activity retry simulator](/develop/activity-retry-simulator) to visualize how a Retry Policy works.

---

<RelatedReadContainer>
  <RelatedReadItem
    path="/develop/go/failure-detection#activity-retries"
    text="Set a custom Retry Policy for an Activity in Go"
    archetype="feature-guide"
  />
  <RelatedReadItem
    path="/develop/java/failure-detection#activity-retries"
    text="Set a custom Retry Policy for an Activity in Java"
    archetype="feature-guide"
  />
  <RelatedReadItem
    path="/develop/php/failure-detection#activity-retries"
    text="Set a custom Retry Policy for an Activity in PHP"
    archetype="feature-guide"
  />
  <RelatedReadItem
    path="/develop/python/failure-detection#activity-retries"
    text="Set a custom Retry Policy for an Activity in Python"
    archetype="feature-guide"
  />
  <RelatedReadItem
    path="/develop/typescript/failure-detection#activity-retries"
    text="Set a custom Retry Policy for an Activity in TypeScript"
    archetype="feature-guide"
  />
</RelatedReadContainer>

---

<RelatedReadContainer>
  <RelatedReadItem
    path="/develop/go/failure-detection#workflow-retries"
    text="Set a Retry Policy for a Workflow in Go"
    archetype="feature-guide"
  />
  <RelatedReadItem
    path="/develop/java/failure-detection#workflow-retries"
    text="Set a Retry Policy for a Workflow in Java"
    archetype="feature-guide"
  />
  <RelatedReadItem
    path="/develop/php/failure-detection#workflow-retries"
    text="Set a Retry Policy for a Workflow in PHP"
    archetype="feature-guide"
  />
  <RelatedReadItem
    path="/develop/python/failure-detection#workflow-retries"
    text="Set a Retry Policy for a Workflow in Python"
    archetype="feature-guide"
  />
  <RelatedReadItem
    path="/develop/typescript/failure-detection#workflow-retries"
    text="Set a Retry Policy for a Workflow in TypeScript"
    archetype="feature-guide"
  />
</RelatedReadContainer>

## Default behavior

Activities in Temporal are associated with a Retry Policy by default, while Workflows are not. The Temporal SDK provides
a Retry Policy instance with default behavior. While this object is not specific to either a Workflow or Activity,
you'll use different methods to apply it to the execution of each.

This section details the default retry behavior for both Activities and Workflows to provide context for any further
customization.

### Activity Execution

Temporal's default behavior is to automatically retry an Activity, with a short delay between each attempt that
increases exponentially, until it either succeeds or is canceled. When a subsequent request succeeds, your Workflow code
will resume as if the failure never occurred.

When an Activity Task Execution is retried, the Temporal Service places a new [Activity Task](/tasks#activity-task) into
its respective [Activity Task Queue](/task-queue), which results in a new Activity Task Execution.

The default Retry Policy uses exponential backoff with a 2.0 backoff coefficient, starting with a 1-second initial
interval and capping at a maximum interval of 100 seconds. By default, the maximum attempt of retries are set to zero
which is evaluated as unlimited and non-retryable errors default to none. For detailed information about all Retry
Policy attributes and their default values, see the [Properties](#properties) section.

### Workflow Execution

Unlike Activities, Workflow Executions do not retry by default. When a Workflow Execution is spawned, it is not
associated with a default Retry Policy and thus does not retry by default.

Temporal provides guidance around idempotence of Activity code with the expectation that Activities will need to
re-execute upon failure; this is not typically true of Workflows. In most use cases, a Workflow failure would indicate
an issue with the design or deployment of your application; for example, a permanent failure that may require different
input data.

Retrying an entire Workflow Execution is not recommended due to Temporal's deterministic design. Since Workflows replay
the same sequence of events to reach the same state, retrying the whole workflow would repeat the same logic without
resolving the underlying issue that caused the failure. This repetition does not address problems related to external
dependencies or unchanged conditions and can lead to unnecessary resource consumption and higher costs. Instead, it's
more efficient to retry only the failed Activities. This approach targets specific points of failure, allowing the
workflow to progress without redundant operations, thereby saving on resources and ensuring a more focused and effective
error recovery process. If you need to retry parts of your Workflow Definition, we recommend you implement this in your
Workflow code.

## Custom Retry Policy

To use a custom Retry Policy, provide it as an options parameter when starting a Workflow Execution or Activity
Execution. Only certain scenarios merit starting a Workflow Execution with a custom Retry Policy, such as the following:

- A [Temporal Cron Job](/cron-job) or some other stateless, always-running Workflow Execution that can benefit from
  retries.
- A file-processing or media-encoding Workflow Execution that downloads files to a host.

## Properties

### Default values for Retry Policy

```
Initial Interval     = 1 second
Backoff Coefficient  = 2.0
Maximum Interval     = 100 × Initial Interval
Maximum Attempts     = ∞
Non-Retryable Errors = []
```

### Initial Interval

- **Description:** Amount of time that must elapse before the first retry occurs.
  - **The default value is 1 second.**
- **Use case:** This is used as the base interval time for the [Backoff Coefficient](#backoff-coefficient) to multiply
  against.

### Backoff Coefficient

- **Description:** The value dictates how much the _retry interval_ increases.
  - **The default value is 2.0.**
  - A backoff coefficient of 1.0 means that the retry interval always equals the [Initial Interval](#initial-interval).
- **Use case:** Use this attribute to increase the interval between retries. By having a backoff coefficient greater
  than 1.0, the first few retries happen relatively quickly to overcome intermittent failures, but subsequent retries
  happen farther and farther apart to account for longer outages. Use the [Maximum Interval](#maximum-interval)
  attribute to prevent the coefficient from increasing the retry interval too much.

### Maximum Interval

- **Description:** Specifies the maximum interval between retries.
  - **The default value is 100 times the [Initial Interval](#initial-interval).**
- **Use case:** This attribute is useful for [Backoff Coefficients](#backoff-coefficient) that are greater than 1.0
  because it prevents the retry interval from growing infinitely.

### Maximum Attempts

- **Description:** Specifies the maximum number of execution attempts that can be made in the presence of failures.
  - **The default is unlimited.**
  - If this limit is exceeded, the execution fails without retrying again. When this happens an error is returned.
  - Setting the value to 0 also means unlimited.
  - Setting the value to 1 means a single execution attempt and no retries.
  - Setting the value to a negative integer results in an error when the execution is invoked.
- **Use case:** Use this attribute to ensure that retries do not continue indefinitely. In most cases, we recommend
  using the Workflow Execution Timeout for [Workflows](/workflows) or the Schedule-To-Close Timeout for Activities to
  limit the total duration of retries, rather than using this attribute.

### Non-Retryable Errors {#non-retryable-errors}

Non-Retryable Errors specify errors that shouldn't be retried. By default, none are specified. Errors are matched
against the `type` field of the [Application Failure](/references/failures#application-failure). If one of those errors
occurs, a retry does not occur. If you know of errors that should not trigger a retry, you can specify that and if they
occur, the execution is not retried.

#### Non-Retryable Errors for Activities

When writing software applications, you will encounter three types of failures: transient, intermittent, and permanent.
While transient and intermittent failures may resolve themselves upon retrying without further intervention, permanent
failures will not. Permanent failures, by definition, require you to make some change to your logic or your input.
Therefore, it is better to surface them than to retry them.

Non-Retryable Errors are errors that will not be retried, regardless of a Retry Policy.

<Tabs groupId="sdk-language" queryString>
<TabItem value="ruby" label="Ruby">

To raise a non-retryable error, specify the `non_retryable` flag when raising an `ApplicationError`:

```ruby
raise Temporalio::Error::ApplicationError.new(
  "Invalid credit card number: #{credit_card_number}",
  type: 'InvalidChargeAmount',
  non_retryable: true
)
```

This will designate the `ApplicationError` as non-retryable.

</TabItem>
<TabItem value="python" label="Python">

To raise a non-retryable error, specify the `non_retryable` flag when raising an `ApplicationError`:

```python
raise ApplicationError(
    f"Invalid credit card number: {credit_card_number}",
    type="InvalidChargeAmount",
    non_retryable=True,
)
```

This will designate the `ApplicationError` as non-retryable.

</TabItem>
<TabItem value="typescript" label="TypeScript">

To throw a non-retryable error, add `nonRetryable: true` to `ApplicationFailure.create({})`:

```typescript
throw ApplicationFailure.create({
  message: `Invalid charge amount: ${chargeAmount} (must be above zero)`,
  details: [chargeAmount],
  nonRetryable: true,
});
```

This will designate the Error as non-retryable.

</TabItem>
<TabItem value="java" label="Java">

To throw a non-retryable error, use the `newNonRetryableFailure` method:

```java
throw ApplicationFailure.newNonRetryableFailure(
    "Invalid credit card number: " + creditCardNumber,
    InvalidChargeAmountException.class.getName()
);
```

This will designate the `ApplicationFailure` as non-retryable.

</TabItem>
<TabItem value="go" label="Go">

To return a non-retryable error, replace your call to `NewApplicationError()` with `NewNonRetryableApplicationError()`:

```go
temporal.NewNonRetryableApplicationError("Credit Card Charge Error", "CreditCardError", nil, nil)
```

This will designate the Error as non-retryable.

</TabItem>
<TabItem value="dotnet" label=".NET">

To throw a non-retryable error, specify the `nonRetryable` flag when throwing an `ApplicationFailureException`:

```csharp
var attempt = ActivityExecutionContext.Current.Info.Attempt;

throw new ApplicationFailureException(
    $"Something bad happened on attempt {attempt}",
    errorType: "my_failure_type",
    nonRetryable: true
);
```

This will designate the `ApplicationFailureException` as non-retryable.

</TabItem>
</Tabs>

Use non-retryable errors in your code sparingly.

<Tabs groupId="sdk-language" queryString>
<TabItem value="ruby" label="Ruby">

If you do not specify the failure as non-retryable within the definition, you can always mark that error type as
non-retryable in your Activity's Retry Policy, but an `ApplicationError` with the `non_retryable` keyword argument set
to `true` will always be non-retryable.

</TabItem>
<TabItem value="python" label="Python">

If you do not specify the failure as non-retryable within the definition, you can always mark that error type as
non-retryable in your Activity's Retry Policy, but an `ApplicationError` with the `non_retryable` keyword argument set
to `True` will always be non-retryable.

</TabItem>
<TabItem value="typescript" label="TypeScript">

If you do not specify the failure as non-retryable within the definition, you can always mark that error type as
non-retryable in your Activity's Retry Policy, but an error with `nonRetryable: true` set will always be non-retryable.

</TabItem>
<TabItem value="java" label="Java">

If you throw a regular `newFailure()`, you can always mark that error _type_ as non-retryable in your Activity's Retry
Policy, but a `newNonRetryableFailure()` will always be non-retryable.

</TabItem>
<TabItem value="go" label="Go">

If you return a regular `NewApplicationError()`, you can always mark that error _type_ as non-retryable in your
Activity's Retry Policy, but a `NewNonRetryableApplicationError()` will always be non-retryable.

</TabItem>
<TabItem value="dotnet" label=".NET">

If you do not specify the failure as non-retryable within the definition, you can always mark that error type as
non-retryable in your Activity's Retry Policy, but an `ApplicationFailureException` with the `nonRetryable` parameter
set to `true` will always be non-retryable.

</TabItem>
</Tabs>

For example, checking for bad input data is a reasonable time to use a non-retryable error. If the Activity cannot
proceed with the input it has, that error should be surfaced immediately so that the input can be corrected on the next
attempt.

If responsibility for your application is distributed across multiple maintainers, or if you are developing a library to
integrate into somebody else's application, you can think of the decision to hardcode non-retryable errors as following
a "caller vs. implementer" dichotomy. Anyone who is calling your Activity would be able to make decisions about their
Retry Policy, but only the implementer can decide whether an error should never be retryable out of the box.

## Retry interval

The wait time before a retry is the _retry interval_. A retry interval is the smaller of two values:

- The [Initial Interval](#initial-interval) multiplied by the [Backoff Coefficient](#backoff-coefficient) raised to the
  power of the number of retries.
- The [Maximum Interval](#maximum-interval).

<CaptionedImage
  src="/img/info/retry-interval-diagram.png"
  title="Diagram that shows the retry interval and its formula"
/>

### Per-error next Retry delay

Sometimes, your Activity or Workflow raises a special exception that needs a different retry interval from the Retry
Policy. To accomplish this, you may throw an [Application Failure](/references/failures#application-failure) with the
next Retry delay field set. This value will replace and override whatever the retry interval would be on the Retry
Policy. Note that your retries will still cap out under the Retry Policy's Maximum Attempts, as well as overall
timeouts. For an Activity, its Schedule-to-Close Timeout applies. For a Workflow, the Execution Timeout applies.

<RelatedReadContainer>
  <RelatedReadItem
    path="/develop/java/failure-detection#activity-next-retry-delay"
    text="Customize retry delays per error in the Java SDK."
    archetype="feature-guide"
  />
  <RelatedReadItem
    path="/develop/typescript/failure-detection#activity-next-retry-delay"
    text="Customize retry delays per error in the TypeScript SDK"
    archetype="feature-guide"
  />
</RelatedReadContainer>

## Event History

There are some subtle nuances to how Events are recorded to an Event History when a Retry Policy comes into play.

- For an Activity Execution, the [ActivityTaskStarted](/references/events#activitytaskstarted) Event will not show up in
  the Workflow Execution Event History until the Activity Execution has completed or failed (having exhausted all
  retries). This is to avoid filling the Event History with noise. Use the Describe API to get a pending Activity
  Execution's attempt count.

- When a Workflow fails and has a Retry Policy, the failed run ends with `WorkflowExecutionFailed`, with
  `retryState=IN_PROGRESS` and `newExecutionRunId` set, and the Temporal Service starts a new Workflow Execution. The
  new Workflow Execution is created immediately, but the first Workflow Task won’t be scheduled until the backoff
  duration is exhausted. That duration is recorded as the `first_workflow_task_backoff` field on the new run’s
  `WorkflowExecutionStartedEventAttributes`.
