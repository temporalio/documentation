---
id: error-handling
title: Error handling - Python SDK
sidebar_label: Error handling
description: Learn how to handle errors in Temporal Python applications with retry policies, idempotent Activities, and recovery patterns.
slug: /develop/python/error-handling
toc_max_heading_level: 2
keywords:
  - error handling
  - exceptions
  - failures
  - retry policy
  - idempotence
  - saga pattern
tags:
  - Activities
  - Workflows
  - Errors
  - Python SDK
---

Temporal automatically handles many types of failures through retries and Durable Execution.
This page shows you how to build on these capabilities to create robust error handling for your applications.

**Key concepts:**

Not all failures should be handled the same way.
**Transient failures** (like brief network hiccups) resolve on their own and should be retried immediately.
**Intermittent failures** (like rate limiting) need increasing delays between retries.
**Permanent failures** (like invalid input) won't resolve through retries and need different data or code changes.

Temporal distinguishes between **Workflow Task failures** (bugs that can be fixed with redeployment) and **Workflow Execution failures** (business logic failures that should stop the Workflow).
Task failures retry automatically so you can fix and redeploy without losing state.
Execution failures require you to explicitly raise an `ApplicationError`.

This page shows how to:

- [Make Activities idempotent](#make-activities-idempotent)
- [Raise exceptions from Activities](#raise-exceptions-from-activities)
- [Raise exceptions from Workflows](#raise-exceptions-from-workflows)
- [Handle exceptions in Workflows](#handle-exceptions-in-workflows)
- [Configure custom Retry Policies](#configure-custom-retry-policies)
- [Mark specific errors as non-retryable](#mark-errors-as-non-retryable)
- [Specify non-retryable error types in Retry Policies](#specify-non-retryable-error-types)
- [Implement rollback logic with the Saga pattern](#implement-saga-pattern)
- [Understand Temporal's failure types](#understand-failure-types)

## Make Activities idempotent {#make-activities-idempotent}

**How to make Activities idempotent using the Temporal Python SDK**

Because Activities may be retried due to failures, it's strongly recommended to make them idempotent.
An idempotent operation produces the same result whether executed once or multiple times.

Activities follow an at-least-once execution model.
If a Worker executes an Activity successfully but crashes before notifying the Temporal Service, the Activity will be retried.
Without idempotence, this could cause duplicate charges in payment processing or create duplicate resources in infrastructure provisioning.

### Use idempotency keys

Most external services support idempotency keys—unique identifiers that prevent duplicate operations.
When the service receives a request with a key it has already processed, it returns the original result instead of performing the operation again.

Create an idempotency key by combining the Workflow Run ID and Activity ID:

```python
from temporalio import activity

@activity.defn
async def process_payment(amount: float, account: str):
    info = activity.info()
    idempotency_key = f"{info.workflow_run_id}-{info.activity_id}"

    # Pass idempotency_key to your payment service
    result = await payment_service.charge(
        amount=amount,
        account=account,
        idempotency_key=idempotency_key
    )
    return result
```

This value remains constant across Activity retries but is unique among all Workflow Executions.

### Design Activities to be atomic

Activities are atomic—they either complete successfully or not.
If an Activity performs multiple steps and the last step fails, the entire Activity is retried.

Consider this Activity:
1. Look up data in database
2. Call microservice with the data
3. Write result to filesystem

If step 3 fails, all three steps execute again on retry.
You might split this into three separate Activities so only the failed step retries, but balance this against having a larger Event History with more Activity Executions.

## Raise exceptions from Activities {#raise-exceptions-from-activities}

**How to raise exceptions from Activities using the Temporal Python SDK**

Use `ApplicationError` to communicate application-specific failures from Activities.
Temporal converts any Python exception raised in an Activity to an `ApplicationError`, but raising it explicitly gives you more control.

```python
from temporalio import activity
from temporalio.exceptions import ApplicationError

@activity.defn
async def validate_charge(credit_card_number: str, amount: float):
    if not is_valid_card(credit_card_number):
        raise ApplicationError(
            f"Invalid credit card number: {credit_card_number}",
            type="InvalidCreditCard",
        )

    if amount <= 0:
        raise ApplicationError(
            f"Amount must be positive, got {amount}",
            type="InvalidAmount",
        )

    return True
```

When raising an `ApplicationError`:
- Provide a descriptive `message`
- Optionally provide a `type` string to categorize the failure
- The error appears in the Event History as an `ActivityTaskFailed` event

When an Activity fails, Temporal wraps the exception in an `ActivityError` before surfacing it to the Workflow.
The `ActivityError` provides context including:
- Activity type that failed
- Number of retry attempts
- Original cause (the `ApplicationError` you raised, or `TimeoutError`, `CancelledError`, etc.)

## Raise exceptions from Workflows {#raise-exceptions-from-workflows}

**How to raise exceptions from Workflows using the Temporal Python SDK**

The behavior depends on what exception you raise:

### Fail a Workflow Execution

To deliberately fail a Workflow Execution, raise an `ApplicationError`:

```python
from temporalio import workflow
from temporalio.exceptions import ApplicationError

@workflow.defn
class PizzaDeliveryWorkflow:
    @workflow.run
    async def run(self, order):
        distance = await workflow.execute_activity(
            calculate_distance,
            order.address,
            start_to_close_timeout=timedelta(seconds=10)
        )

        if order.is_delivery and distance.kilometers > 25:
            workflow.logger.error("Customer outside service area")
            raise ApplicationError(
                "Customer lives outside the service area",
                type="CustomerOutsideServiceArea"
            )

        # Continue with order...
```

This puts the Workflow Execution in "Failed" state with no automatic retries.
Use this for permanent failures where retrying won't help—like the customer being too far away.

### Trigger a Workflow Task retry

Raising any other Python exception (like `ValueError` or `TypeError`) causes a Workflow Task failure, which retries automatically:

```python
# This causes a Workflow Task failure (retries automatically)
raise ValueError("Unexpected condition")
```

This is intentional.
Regular Python exceptions are treated as bugs that can be fixed with a code deployment, not business logic failures.
The Workflow Task retries indefinitely, letting you fix the bug and redeploy without losing Workflow state.

## Handle exceptions in Workflows {#handle-exceptions-in-workflows}

**How to handle exceptions in Workflows using the Temporal Python SDK**

Use Python's `try/except` blocks to handle Activity failures in your Workflow:

```python
from temporalio import workflow
from temporalio.exceptions import ActivityError, ApplicationError
from datetime import timedelta

@workflow.defn
class MoneyTransferWorkflow:
    @workflow.run
    async def run(self, details):
        # Withdraw money
        try:
            withdraw_result = await workflow.execute_activity(
                withdraw,
                details,
                start_to_close_timeout=timedelta(seconds=10)
            )
        except ActivityError as e:
            raise ApplicationError(
                f"Withdrawal failed: {e.cause}",
                type="WithdrawalError"
            )

        # Deposit money
        try:
            deposit_result = await workflow.execute_activity(
                deposit,
                details,
                start_to_close_timeout=timedelta(seconds=10)
            )
        except ActivityError as e:
            # Deposit failed - attempt refund
            try:
                await workflow.execute_activity(
                    refund,
                    withdraw_result,
                    start_to_close_timeout=timedelta(seconds=10)
                )
                raise ApplicationError(
                    f"Deposit failed but money refunded to source account",
                    type="DepositError"
                )
            except ActivityError as refund_err:
                raise ApplicationError(
                    f"Deposit failed and refund also failed: {refund_err.cause}",
                    type="CriticalTransferError"
                )

        return f"Transfer complete: {withdraw_result}, {deposit_result}"
```

Common Temporal exceptions you can catch in Workflows:
- `ActivityError` - Activity failed after exhausting retries
- `ChildWorkflowError` - Child Workflow failed
- `CancelledError` - Workflow, Activity, or Timer was canceled
- `TimeoutError` - Operation exceeded timeout

If these exceptions propagate unhandled, the Workflow Execution fails (or enters "Canceled" state for `CancelledError`).

## Configure custom Retry Policies {#configure-custom-retry-policies}

**How to configure custom Retry Policies using the Temporal Python SDK**

Activities have a default Retry Policy with unlimited attempts and exponential backoff.
Customize this to match your expected failure patterns.

```python
from temporalio import workflow
from temporalio.common import RetryPolicy
from datetime import timedelta

@workflow.defn
class OrderWorkflow:
    @workflow.run
    async def run(self, order):
        # Custom retry for rate-limited service
        retry_policy = RetryPolicy(
            initial_interval=timedelta(seconds=10),
            backoff_coefficient=3.0,
            maximum_interval=timedelta(minutes=5),
            maximum_attempts=20,
        )

        result = await workflow.execute_activity(
            call_external_service,
            order,
            start_to_close_timeout=timedelta(seconds=30),
            retry_policy=retry_policy,
        )
        return result
```

Retry Policy attributes:
- **`initial_interval`**: Delay before first retry (default: 1 second)
- **`backoff_coefficient`**: Multiplier for subsequent delays (default: 2.0)
- **`maximum_interval`**: Cap on retry delay (default: 100× initial interval)
- **`maximum_attempts`**: Maximum retry attempts (default: unlimited)
- **`non_retryable_error_types`**: Error types that shouldn't retry (default: empty)

### Match your Retry Policy to failure types

**For transient failures** (brief network issues): Use the defaults or a low `initial_interval` and `backoff_coefficient`.

**For intermittent failures** (rate limiting): Increase `initial_interval` and `backoff_coefficient` to space out retries and let the condition resolve.

**For cost-sensitive APIs**: Set `maximum_attempts` to limit retries (rare—usually prefer timeouts).

### Use different policies for different Activities

You can use different Retry Policies for different Activities, or even multiple policies for the same Activity:

```python
fast_retry = RetryPolicy(
    initial_interval=timedelta(seconds=1),
    backoff_coefficient=1.5,
)

slow_retry = RetryPolicy(
    initial_interval=timedelta(seconds=30),
    backoff_coefficient=3.0,
)

# Same Activity, different policies
await workflow.execute_activity(
    process_order,
    order,
    start_to_close_timeout=timedelta(seconds=10),
    retry_policy=fast_retry,
)

# Later, with different circumstances...
await workflow.execute_activity(
    process_order,
    order,
    start_to_close_timeout=timedelta(seconds=10),
    retry_policy=slow_retry,
)
```

### Don't use Workflow Retry Policies

Unlike Activities, Workflows don't retry by default, and you usually shouldn't add a Retry Policy.
Workflows are deterministic and not designed for failure-prone operations.
A Workflow failure typically indicates a code bug or bad input data—retrying the entire Workflow repeats the same logic without fixing the underlying issue.

If you need retry logic for specific Workflow operations, implement it in your Workflow code rather than using a Workflow Retry Policy.

## Mark specific errors as non-retryable {#mark-errors-as-non-retryable}

**How to mark specific errors as non-retryable using the Temporal Python SDK**

Some failures are permanent and won't resolve through retries.
Mark these as non-retryable to fail fast instead of waiting for timeouts.

Set the `non_retryable` flag when raising an `ApplicationError`:

```python
from temporalio import activity
from temporalio.exceptions import ApplicationError

@activity.defn
async def process_payment(card_number: str, amount: float):
    if not is_valid_card_format(card_number):
        # Invalid format will never become valid through retries
        raise ApplicationError(
            f"Invalid credit card format: {card_number}",
            type="InvalidCardFormat",
            non_retryable=True,
        )

    if amount <= 0:
        # Invalid amount won't be fixed by retrying
        raise ApplicationError(
            f"Amount must be positive: {amount}",
            type="InvalidAmount",
            non_retryable=True,
        )

    # Process payment...
```

An `ApplicationError` with `non_retryable=True` will never retry, regardless of the Retry Policy.

Use non-retryable errors for:
- Invalid input data that prevents the Activity from proceeding
- Business rule violations
- Authorization failures

**Use this sparingly.**
In most cases, it's better to let the Retry Policy handle when to stop retrying based on time or attempts.

## Specify non-retryable error types {#specify-non-retryable-error-types}

**How to specify non-retryable error types in Retry Policies using the Temporal Python SDK**

Sometimes you want the Workflow (caller) to decide which error types shouldn't retry, rather than the Activity (implementer).

List error types that shouldn't retry in your Retry Policy:

```python
from temporalio import workflow
from temporalio.common import RetryPolicy
from datetime import timedelta

@workflow.defn
class CheckoutWorkflow:
    @workflow.run
    async def run(self, payment_details):
        retry_policy = RetryPolicy(
            non_retryable_error_types=[
                "InvalidCardFormat",
                "InsufficientFunds",
                "AccountClosed",
            ]
        )

        try:
            result = await workflow.execute_activity(
                process_payment,
                payment_details,
                start_to_close_timeout=timedelta(seconds=30),
                retry_policy=retry_policy,
            )
            return result
        except ActivityError as e:
            workflow.logger.error(f"Payment failed: {e.cause}")
            # Handle the non-retryable error...
```

When an Activity raises an `ApplicationError`, Temporal checks if its `type` is in `non_retryable_error_types`.
If it matches, the Activity fails immediately without retries.

### When to use each approach

**`non_retryable=True` in the Activity**: Use when the Activity implementer knows the error is permanently unrecoverable.
This enforces the constraint for all callers.

**`non_retryable_error_types` in the Retry Policy**: Use when the caller wants to decide which errors are unrecoverable based on their business logic.
This lets different Workflows make different decisions about the same Activity.

## Implement rollback logic with the Saga pattern {#implement-saga-pattern}

**How to implement the Saga pattern using the Temporal Python SDK**

The Saga pattern coordinates a sequence of operations where each operation has a compensating action to undo its effects.
If any operation fails, execute compensating actions in reverse order to roll back previous operations.

Use this for multi-step processes like:
- E-commerce checkout (payment, inventory, shipping)
- Distributed transactions across services
- Multi-stage data updates

```python
from temporalio import workflow
from temporalio.exceptions import ActivityError
from datetime import timedelta

@workflow.defn
class OrderWorkflow:
    @workflow.run
    async def run(self, order):
        compensations = []

        try:
            # Reserve inventory
            compensations.append({
                "activity": revert_inventory,
                "input": order
            })
            await workflow.execute_activity(
                reserve_inventory,
                order,
                start_to_close_timeout=timedelta(seconds=10),
            )

            # Charge payment
            compensations.append({
                "activity": refund_payment,
                "input": order
            })
            payment_id = await workflow.execute_activity(
                charge_payment,
                order,
                start_to_close_timeout=timedelta(seconds=10),
            )

            # Create shipment
            compensations.append({
                "activity": cancel_shipment,
                "input": payment_id
            })
            shipment_id = await workflow.execute_activity(
                create_shipment,
                order,
                start_to_close_timeout=timedelta(seconds=10),
            )

            return {"payment_id": payment_id, "shipment_id": shipment_id}

        except ActivityError as e:
            workflow.logger.error(f"Order failed: {e.cause}, rolling back...")

            # Execute compensations in reverse order
            for compensation in reversed(compensations):
                try:
                    await workflow.execute_activity(
                        compensation["activity"],
                        compensation["input"],
                        start_to_close_timeout=timedelta(seconds=10),
                    )
                except ActivityError as comp_err:
                    # Log compensation failure but continue with others
                    workflow.logger.error(f"Compensation failed: {comp_err.cause}")

            # Re-raise the original error
            raise ApplicationError(
                f"Order failed: {e.cause}",
                type="OrderFailed"
            )
```

Key points:
- Add compensating actions to a list **before** executing each Activity
- Use `reversed(compensations)` to undo operations in the correct order
- Handle compensation failures gracefully (they might fail too)
- Temporal manages all state and retry logic, making Saga implementation straightforward

## Understand Temporal's failure types {#understand-failure-types}

Temporal uses specialized exception types to represent different failure scenarios.
All exceptions inherit from [`TemporalError`](https://python.temporal.io/temporalio.exceptions.TemporalError.html).

**Do not extend `TemporalError` or its children.**
Use the provided exception types to ensure:
- Consistent behavior across process and language boundaries
- Compatibility with the Temporal Service
- Proper serialization via Protocol Buffers

### Common failure types

**`ApplicationError`**: Raised by your code to indicate application-specific failures.
This is the only Temporal exception you should raise manually.
When you raise an `ApplicationError`, you can optionally provide a `type` string and mark it as `non_retryable`.

**`ActivityError`**: Wraps exceptions raised from Activities.
The `cause` field contains the original error (`ApplicationError`, `TimeoutError`, `CancelledError`, etc.).
Catch this in Workflows to handle Activity failures.

**`TimeoutError`**: Occurs when an Activity or Workflow exceeds its configured timeout.

**`CancelledError`**: Results from cancellation of a Workflow, Activity, or Timer.
You can catch and ignore this to continue execution despite cancellation.

**`TerminatedError`**: Occurs when a Workflow Execution is forcefully terminated.

**`ChildWorkflowError`**: Raised when a Child Workflow Execution fails.

**`WorkflowAlreadyStartedError`**: Raised when attempting to start a Workflow with an ID that's already running.

**`ServerError`**: Used for exceptions from the Temporal Service itself (like database failures).

### Workflow Task vs Workflow Execution failures

**Workflow Task failures** occur when Workflow code raises a non-Temporal exception (like `ValueError`, `TypeError`, or non-determinism errors).
These retry automatically, letting you fix bugs and redeploy without losing Workflow state.

**Workflow Execution failures** occur when Workflow code raises a Temporal exception like `ApplicationError`.
These put the Workflow in "Failed" state with no automatic retries.

Example of a permanent failure that should fail the Workflow:

```python
if distance.kilometers > MAX_DELIVERY_DISTANCE:
    # Retrying won't change the distance - this is permanent
    raise ApplicationError(
        "Customer lives outside service area",
        type="OutsideServiceArea"
    )
```

### Protecting sensitive information

The default Failure Converter copies exception messages and stack traces as plain text visible in the Web UI.
If your exceptions might contain sensitive information, configure a custom Failure Converter to encrypt this data.
See the [Securing Application Data course](https://learn.temporal.io/courses/appdatasec/) for details.
