---
id: use-cases-distributed-transactions
title: Distributed Transactions with Sagas
sidebar_label: Distributed Transactions with Sagas
---

## Motivation

Most businesses have to deal with managing complex **monetary transactions** and transfers, including

- Handling consumer's subscriptions, installment payments, and communications in a reliable and timely manner.
- Integrating with multiple payment systems and shopping platform backends.
- Detecting suspicious and fraudulent activities.

Similar to [microservices orchestration](./use-cases-orchestration), such workflows need a way to deliver the transactional **consistency**&mdash;but across multiple independent vendors. Each of these systems has a potential for failure, delays, or intermittent availability issues. Despite the challenges, the entire process represents a long-running transaction that needs to eventually complete in a predictable way.

In some cases, instead of trying to complete the process by continuously retrying, **compensation rollback** logic should be executed. [Saga Pattern](https://microservices.io/patterns/data/saga.html) is one way to standardize compensation APIs.

## Benefits of Temporal

Temporal provides an extensive toolset to deal with the unpredictability of external services reliably and transparently: built-in execution guarantees, exponential activity **retries**, timeouts.

Temporal comes with a native Saga Pattern support. You can define a compensation action for each workflow activity. If a failure happens in one of the downstream services, compensation actions will run for all activities that already succeeded.

## Example

The workflow snippet below orchestrates two activity calls: booking a hotel and reserving a flight. If the first activity fails (including all the configured retries), the workflow returns directly.

However, if the first reservation succeeds, but the second one fails, you should cancel the already booked hotel to avoid undesirable charges. The error-handling block contains a call that cancels the hotel reservation before completing the workflow.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="java"
  values={[
    { label: 'Java', value: 'java', },
    { label: 'Go', value: 'go', },
  ]
}>
<TabItem value="java">

```java
Saga.Options sagaOptions = new Saga.Options.Builder().build();
Saga saga = new Saga(sagaOptions);
try {
    // Step 1: Book a hotel.
    String hotelReservationID = activities.bookHotel(name);
    saga.addCompensation(activities::cancelHotel, hotelReservationID, name);

    // Step 2: Book a flight.
    String flightReservationID = activities.bookFlight(name);
    saga.addCompensation(activities::cancelFlight, flightReservationID, name);

    // Both reservations succeeded.
} catch (ActivityException e) {
    saga.compensate();
    throw e;
}
```


</TabItem>
<TabItem value="go">

```go
// Step 1: Book a hotel.
var hotelResID string
err := workflow.ExecuteActivity(ctx, activities.BookHotel, name).Get(ctx, &hotelResID)
if err != nil {
    // If the hotel reservation failed, fail the workflow.
    return err
}

// Step 2: Book a flight.
var flightResID string
err := workflow.ExecuteActivity(ctx, activities.BookFlight, name).Get(ctx, &flightResID)
if err != nil {
    // If the flight reservation failed, cancel the hotel.
    cancelErr := workflow.ExecuteActivity(ctx, activities.CancelHotel, hotelResID)
    if cancelErr != nil {
        // The hotel cancellation failed... probably, some manual action is needed.
        return cancelErr
    }
    
    return err
}


// Both reservations succeeded.
```

</TabItem>
</Tabs>

## Next Steps

* Explore the full [Saga example with Java SDK](https://github.com/temporalio/temporal-java-samples/tree/master/src/main/java/io/temporal/samples/bookingsaga)
