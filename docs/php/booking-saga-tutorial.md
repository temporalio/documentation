---
id: booking-saga-tutorial 
title: Booking Saga Walkthrough in PHP 
sidebar_label: Booking Saga 
description: In this tutorial, we'll go over the different components that make up the Temporal Booking Saga code sample.
---

## The Project

Imagine that we provide a service where people can book a trip. Booking a regular trip often consists of several steps:
- Booking a taxi or a car.
- Booking a hotel.
- Booking a flight.

It is obvious that the customer either wants everything to be booked or nothing. There is no sense in booking a hotel
without booking a plane. Also, chances high that each booking step in this transaction is represented via a dedicated
service or microservice. Thus, we may consider the whole thing, all these steps as a distributed transaction. In our
case, the transaction boundary crosses multiple services and databases. To ensure a successful booking, all three
microservices must complete the individual local transactions. Where when any of the steps fail, all the completed
preceding transactions should be rolled back to ensure data integrity.

## Saga Architecture Pattern

Managing a distributed transaction is really a challenging thing. There are several ways to manage distributed
transactions and Saga is one of them. Saga provides transaction management using a sequence of local transactions. A
local transaction is the unit of work performed by a saga participant, a microservice. Every operation that is part of
the Saga can be rolled back by a compensating transaction. Saga pattern guarantees that either all operations are
completed successfully or the corresponding compensation transactions are run to undo the previously completed work.

Implementing the Saga pattern is quite a complex thing even for senior architects and developers. But we are lucky that 
Temporal provides native support for the Saga pattern. It means that handling all the rollbacks and running
compensation transactions are performed internally by Temporal. Our job as developers is only to implement the business 
logic. It means that we need to implement a flight booking service that can book and cancel a flight. And the same
thing for a hotel and a car. That's it. Everything else will be done by Temporal. We just need to tell it via a workflow
what activities and when should be called. 

![Booking saga flow](/img/tutorials/booking-saga-flow.png)

The above diagram shows how to visualize the Saga pattern for the previously discussed online trip booking scenario.

## Workflow Implementation

The first thing we need to do is to write a business process - the high-level flow of the trip booking. Let's call
it `TripBookingWorkflow`:

```php
class TripBookingWorkflow implements TripBookingWorkflowInterface
{
    /** @var \Temporal\Internal\Workflow\ActivityProxy|TripBookingActivitiesInterface */
    private $activities;

    public function __construct()
    {
        $this->activities = Workflow::newActivityStub(
            TripBookingActivitiesInterface::class,
            ActivityOptions::new()->withStartToCloseTimeout(CarbonInterval::hour(1))
        );
    }

    public function bookTrip(string $name)
    {
        
    }
}
```

For simplicity, let's assume that all booking services (car, hotel, and flight) are managed under one single 
activity `TripBookingActivitiesInterface`. But it is not a requirement. Ok, now we need to tell Temporal that
we are going to use Saga.

:::info Saga Orchestration Pattern

There are two implementations of Saga Pattern: **Choreography** and **Orchestration**. The first one is based on events where
**each microservice that is part of the transaction publishes an event that is processed by the next microservice**. Temporal
uses Orchestration Pattern. In the Orchestration pattern, **a single orchestrator is responsible for managing the overall
transaction status**. If any of the microservice encounters a failure, then the orchestrator is responsible for 
invoking the necessary compensating transactions. Temporal plays the role of such an orchestrator. 

:::

```php
class TripBookingWorkflow implements TripBookingWorkflowInterface
{
    // ...

    public function bookTrip(string $name)
    {
        $saga = new Workflow\Saga();
        
        try {
             
        } catch (\Throwable $e) {
        
        }
    }
}
```

We start with a new object `Workflow\Saga`. It is an entry point to distributed transaction management. After that, we
have an empty `try/catch` block. Consider everything inside `try` as a happy path, and if some steps within a distributed
transaction fail, we go into `catch` block and run compensations. Now, let's fill our saga with some logic. First, we add
booking steps:

```php
public function bookTrip(string $name)
{
    $saga = new Workflow\Saga();

    try {
        $carReservationID = yield $this->activities->reserveCar($name);
        $hotelReservationID = yield $this->activities->bookHotel($name);
        $flightReservationID = yield $this->activities->bookFlight($name);

        return [
            'car' => $carReservationID,
            'hotel' => $hotelReservationID,
            'flight' => $flightReservationID
        ];             
    } catch (\Throwable $e) {
    
    }
}
```

In the snippet above, we sequentially reserve a car, a hotel, and a flight. Each step here returns a corresponding ID.
Later we will use this ID to make compensations:

```php
public function bookTrip(string $name)
{
    $saga = new Workflow\Saga();

    try {
        $carReservationID = yield $this->activities->reserveCar($name);
        $saga->addCompensation(fn() => yield $this->activities->cancelCar($carReservationID, $name));

        $hotelReservationID = yield $this->activities->bookHotel($name);
        $saga->addCompensation(fn() => yield $this->activities->cancelHotel($hotelReservationID, $name));

        $flightReservationID = yield $this->activities->bookFlight($name);
        $saga->addCompensation(fn() => yield $this->activities->cancelFlight($flightReservationID, $name));

        return [
            'car' => $carReservationID,
            'hotel' => $hotelReservationID,
            'flight' => $flightReservationID
        ];         
    } catch (\Throwable $e) {
    
    }
}
```

To add a compensation, we use `Saga::addCompensation()` method and provide a callable that should be used, once we want
to roll back a distributed transaction. Having that, we can finish our saga and fill `catch` block:


```php
public function bookTrip(string $name)
{
    $saga = new Workflow\Saga();
    
    try {
        $carReservationID = yield $this->activities->reserveCar($name);
        $saga->addCompensation(fn() => yield $this->activities->cancelCar($carReservationID, $name));

        $hotelReservationID = yield $this->activities->bookHotel($name);
        $saga->addCompensation(fn() => yield $this->activities->cancelHotel($hotelReservationID, $name));

        $flightReservationID = yield $this->activities->bookFlight($name);
        $saga->addCompensation(fn() => yield $this->activities->cancelFlight($flightReservationID, $name));

        return [
            'car' => $carReservationID,
            'hotel' => $hotelReservationID,
            'flight' => $flightReservationID
        ];         
    } catch (\Throwable $e) {
        yield $saga->compensate();
        throw $e;    
    }
}
```

Inside `catch()` we call method `compensate()`, which starts compensation strategy and runs all previously registered
compensation callbacks. Once done we throw an exception to understand what had happened. By default, compensations
will run sequentially. You can tell Saga to run them in parallel by calling `$saga->setParallelCompensation(true)`.

## Conclusion

In this tutorial, we covered the Saga architecture pattern to implement distributed transactions in a microservice-based application.
Saga on its own is quite a complex thing. Temporal allows us to focus only on application details. All the hard work with
Saga orchestration: calling microservices and invoking the necessary compensating transactions - is managed by Temporal. 

:::note Working example

We don't cover activity implementation details in this tutorial. Activities may be written in different languages, and the
main Saga workflow doesn't depend on them. If you want to test things you can find a fully working example in our 
[Booking Saga Workflow repo](https://github.com/temporalio/samples-php/tree/master/app/src/BookingSaga).

:::
