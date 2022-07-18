---
id: why-temporal
title: What are the differences between Temporal and a traditional system?
description: This page compares a function execution in a traditional system and a Workflow Execution in Temporal.
tags:
  - explanation
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

One of the aspects of the Temporal System is that it abstracts the complexity of a distributed system.
Distributed systems exist to scale computation across multiple machines as the potential load of a system changes.
In theory, a distributed system facilitates a reliable and highly performant application.

However, any failure that leaves the downstream part of the application waiting for a response can make things very complicated, especially at a large scale.

![Distributed application failures](/diagrams/basic-distributed-system.svg)

How will a downstream part of the application know if there was a failure before or a failure after changes to the state if there is no response?
How will the application track and reconcile an inconsistent state?

In traditional systems, a large investment is often made to maintain the health of each individual component, visualize the health of the overall system, define timeout constraints for computations, orchestrate retries for computations that fail, and maintain a consistent state.

These systems are often a mixture of stateless services, databases, cron jobs, and queues.
And as these systems scale, responding to multiple asynchronous events, communicating with unreliable external resources, or tracking the state of something very complex becomes more and more challenging.

Temporal restructures the use of services, databases, cron jobs, queues, host processes, and SDKs, into the Temporal Platform, and addresses failures head on.

In a traditional system, the service exists to spawn function executions.
The Temporal Platform exists to facilitate [Workflow Executions](/concepts/what-is-a-workflow-execution).

![Temporal vs Traditional system](/diagrams/temporal-vs-traditional.svg)

Although the two systems seem similar at first glance, they differ in several significant ways.

**Failure**

With a traditional system, a service function execution is both volatile and short-lived.

- If a function execution fails, it's not resumable because all execution state is lost. The longer a function execution awaits, the higher the chance of failure.
- A traditional function execution typically has a limited lifespan, often measured in minutes.

With Temporal, a Workflow Execution is resumable.

- A Workflow Execution is fully resumable after a failure.
- Temporal imposes no deadlines on Workflow Executions.

**State**

With a traditional system, stoppage or failure means that all execution state is lost.
Your application (or a supporting component) must monitor the service's response to initiate a retry of the service execution.
A retry starts from its _initial_ state.

With Temporal, computation resumes from its _latest_ state. All progress is retained.

**Communication**

With a traditional system, you can't communicate with a function execution.

With Temporal, [Signals](/concepts/what-is-a-signal) and [Queries](/concepts/what-is-a-query) enable data to be sent to or extracted from a Workflow Execution.

**Scope**

With a traditional system, a service function execution can at best represent a business process.
Typically, it represents only a part of a business process.

A Temporal Workflow Execution can represent a business process or an entire business object.

### Example subscription use case

Let's look at a subscription-based use case to compare the difference between a Temporal Application and other traditional approaches.

The basic business steps are as follows:

1. A customer signs up for a service that has a trial period.
2. After the trial period, if the customer has not canceled, they should be charged once a month.
3. The customer has to be notified via email about the charges and should be able to cancel the subscription at any time.

This business logic is not very complicated and can be expressed in a few dozen lines of code.
Any practical implementation also has to ensure that the business process is fault-tolerant and scalable.

**Database-centric design approach**

The first approach might be to center everything around a database where an application process would periodically scan the database tables for customers in specific states, execute necessary actions, and update the database to reflect changes.

However, there are various drawbacks.

- The most obvious one is that the application state machine of the customer's state quickly becomes extremely complicated.
  For example, if a credit card charge attempt fails or sending an email fails due to a downstream system's unavailability, the state is now in limbo.
- Failed calls likely need to be retried for a long time, and these calls need to be throttled to not overload external resources.
- There needs to be logic to handle corrupted customer records to avoid blocking the whole process.
- Additionally, databases have performance and scalability limitations (eventually requiring sharding) and are not efficient for scenarios that require constant polling.

**Queue system design approach**

The next commonly employed approach is to use a timer service and queues.
Updates are pushed to a queue while a service consumes them one at a time, updating a database, and possibly pushing more messages into other downstream queues.
A timer service can be used to schedule queue polling or database actions.

While this approach has shown to scale a bit better, the programming model can become very complex and error-prone, as there are usually no transactional updates between a queuing system, a timer service, and a database.

**Temporal design approach**

The Temporal Platform approach aims to encapsulate and implement the entire business logic in a simple function or object method.
Thanks to the Temporal Platform, the function/method is durably stateful, and the implementer doesn't need to employ any additional systems to ensure consistency and fault tolerance.

Here are example Workflow Definitions that implement the subscription management use case in Java, Go, Typescript and PHP:

<Tabs
defaultValue="java"
values={[
{label: 'Go', value: 'go'},
{label: 'Java', value: 'java'},
{label: 'Typescript', value: 'ts'},
{label: 'PHP', value: 'php'},
]
}>

<TabItem value="go">

<!--SNIPSTART subscription-go-workflow-definition-->
[workflow.go](https://github.com/temporalio/subscription-workflow-project-template-go/blob/master/workflow.go)
```go
package subscription

import (
	"log"
	"time"

	"go.temporal.io/sdk/workflow"
)

func SubscriptionWorkflow(ctx workflow.Context, customer Customer) (string, error) {
	workflowCustomer := customer
	subscriptionCancelled := false
	billingPeriodNum := 0
	actResult := ""

	QueryCustomerIdName := "customerid"
	QueryBillingPeriodNumberName := "billingperiodnumber"
	QueryBillingPeriodChargeAmountName := "billingperiodchargeamount"

	logger := workflow.GetLogger(ctx)

	// Define query handlers
	// Register query handler to return trip count
	err := workflow.SetQueryHandler(ctx, QueryCustomerIdName, func() (string, error) {
		return workflowCustomer.Id, nil
	})
	if err != nil {
		logger.Info("QueryCustomerIdName handler failed.", "Error", err)
		return "Error", err
	}

	err = workflow.SetQueryHandler(ctx, QueryBillingPeriodNumberName, func() (int, error) {
		return billingPeriodNum, nil
	})
	if err != nil {
		logger.Info("QueryBillingPeriodNumberName handler failed.", "Error", err)
		return "Error", err
	}

	err = workflow.SetQueryHandler(ctx, QueryBillingPeriodChargeAmountName, func() (int, error) {
		return workflowCustomer.Subscription.BillingPeriodCharge, nil
	})
	if err != nil {
		logger.Info("QueryBillingPeriodChargeAmountName handler failed.", "Error", err)
		return "Error", err
	}
	// end defining query handlers

	// Define signal channels
	// 1) billing period charge change signal
	chargeSelector := workflow.NewSelector(ctx)
	signalCh := workflow.GetSignalChannel(ctx, "billingperiodcharge")
	chargeSelector.AddReceive(signalCh, func(ch workflow.ReceiveChannel, _ bool) {
		var chargeSignal int
		ch.Receive(ctx, &chargeSignal)
		workflowCustomer.Subscription.BillingPeriodCharge = chargeSignal
	})
	// 2) cancel subscription signal
	cancelSelector := workflow.NewSelector(ctx)
	cancelCh := workflow.GetSignalChannel(ctx, "cancelsubscription")
	cancelSelector.AddReceive(cancelCh, func(ch workflow.ReceiveChannel, _ bool) {
		var cancelSubSignal bool
		ch.Receive(ctx, &cancelSubSignal)
		subscriptionCancelled = cancelSubSignal
	})
	// end defining signal channels

	ao := workflow.ActivityOptions{
		StartToCloseTimeout: time.Minute * 5,
	}

	ctx = workflow.WithActivityOptions(ctx, ao)
	logger.Info("Subscription workflow started for: " + customer.Id)

	var activities *Activities

	// Send welcome email to customer
	err = workflow.ExecuteActivity(ctx, activities.SendWelcomeEmail, workflowCustomer).Get(ctx, &actResult)
	if err != nil {
		log.Fatalln("Failure executing SendWelcomeEmail", err)
	}

	// Start the free trial period. User can still cancel subscription during this time
	workflow.AwaitWithTimeout(ctx, workflowCustomer.Subscription.TrialPeriod, func() bool {
		return subscriptionCancelled == true
	})

	// If customer cancelled their subscription during trial period, send notification email
	if subscriptionCancelled == true {
		err = workflow.ExecuteActivity(ctx, activities.SendCancellationEmailDuringTrialPeriod, workflowCustomer).Get(ctx, &actResult)
		if err != nil {
			log.Fatalln("Failure executing SendCancellationEmailDuringTrialPeriod", err)
		}
		// We have completed subscription for this customer.
		// Finishing workflow execution
		return "Subscription finished for: " + workflowCustomer.Id, err
	}

	// Trial period is over, start billing until
	// we reach the max billing periods for the subscription
	// or sub has been cancelled
	for {
		if billingPeriodNum >= workflowCustomer.Subscription.MaxBillingPeriods {
			break
		}

		// Charge customer for the billing period
		err = workflow.ExecuteActivity(ctx, activities.ChargeCustomerForBillingPeriod, workflowCustomer).Get(ctx, &actResult)
		if err != nil {
			log.Fatalln("Failure executing ChargeCustomerForBillingPeriod", err)
		}
		// Wait 1 billing period to charge customer or if they cancel subscription
		// whichever comes first
		workflow.AwaitWithTimeout(ctx, workflowCustomer.Subscription.BillingPeriod, cancelSelector.HasPending)

		if subscriptionCancelled {
			err = workflow.ExecuteActivity(ctx, activities.SendCancellationEmailDuringActiveSubscription, workflowCustomer).Get(ctx, &actResult)
			if err != nil {
				log.Fatalln("Failure executing SendCancellationEmailDuringActiveSubscription", err)
			}
			break
		}

		billingPeriodNum++

		for chargeSelector.HasPending() {
			chargeSelector.Select(ctx)
		}
	}

	// if we get here the subscription period is over
	// notify the customer to buy a new subscription
	if !subscriptionCancelled {
		err = workflow.ExecuteActivity(ctx, activities.SendSubscriptionOverEmail, workflowCustomer).Get(ctx, &actResult)
		if err != nil {
			log.Fatalln("Failure executing SendSubscriptionOverEmail", err)
		}
	}

	return "Completed Subscription Workflow", err
}
```
<!--SNIPEND-->

</TabItem>
<TabItem value="java">

<!--SNIPSTART subscription-java-workflow-definition-implementation-->
[src/main/java/io/temporal/sample/workflow/SubscriptionWorkflowImpl.java](https://github.com/temporalio/subscription-workflow-project-template-java/blob/master/src/main/java/io/temporal/sample/workflow/SubscriptionWorkflowImpl.java)
```java
package io.temporal.sample.workflow;

import io.temporal.activity.ActivityOptions;
import io.temporal.sample.activities.SubscriptionActivities;
import io.temporal.sample.model.Customer;
import io.temporal.workflow.Workflow;
import java.time.Duration;

/** Subscription Workflow implementation. Note this is just a POJO. */
public class SubscriptionWorkflowImpl implements SubscriptionWorkflow {

  private int billingPeriodNum;
  private boolean subscriptionCancelled;
  private Customer customer;

  /*
   * Define our Activity options:
   * setStartToCloseTimeout: maximum Activity Execution time after it was sent to a Worker
   */
  private final ActivityOptions activityOptions =
      ActivityOptions.newBuilder().setStartToCloseTimeout(Duration.ofSeconds(5)).build();

  // Define subscription Activities stub
  private final SubscriptionActivities activities =
      Workflow.newActivityStub(SubscriptionActivities.class, activityOptions);

  @Override
  public void startSubscription(Customer customer) {
    // Set the Workflow customer
    this.customer = customer;

    // Send welcome email to customer
    activities.sendWelcomeEmail(customer);

    // Start the free trial period. User can still cancel subscription during this time
    Workflow.await(customer.getSubscription().getTrialPeriod(), () -> subscriptionCancelled);

    // If customer cancelled their subscription during trial period, send notification email
    if (subscriptionCancelled) {
      activities.sendCancellationEmailDuringTrialPeriod(customer);
      // We have completed subscription for this customer.
      // Finishing Workflow Execution
      return;
    }

    // Trial period is over, start billing until
    // we reach the max billing periods for the subscription
    // or sub has been cancelled
    while (billingPeriodNum < customer.getSubscription().getMaxBillingPeriods()) {

      // Charge customer for the billing period
      activities.chargeCustomerForBillingPeriod(customer, billingPeriodNum);

      // Wait 1 billing period to charge customer or if they cancel subscription
      // whichever comes first
      Workflow.await(customer.getSubscription().getBillingPeriod(), () -> subscriptionCancelled);

      // If customer cancelled their subscription send notification email
      if (subscriptionCancelled) {
        activities.sendCancellationEmailDuringActiveSubscription(customer);

        // We have completed subscription for this customer.
        // Finishing Workflow Execution
        break;
      }

      billingPeriodNum++;
    }

    // if we get here the subscription period is over
    // notify the customer to buy a new subscription
    if (!subscriptionCancelled) {
      activities.sendSubscriptionOverEmail(customer);
    }
  }

  @Override
  public void cancelSubscription() {
    subscriptionCancelled = true;
  }

  @Override
  public void updateBillingPeriodChargeAmount(int billingPeriodChargeAmount) {
    customer.getSubscription().setBillingPeriodCharge(billingPeriodChargeAmount);
  }

  @Override
  public String queryCustomerId() {
    return customer.getId();
  }

  @Override
  public int queryBillingPeriodNumber() {
    return billingPeriodNum;
  }

  @Override
  public int queryBillingPeriodChargeAmount() {
    return customer.getSubscription().getBillingPeriodCharge();
  }
}
```
<!--SNIPEND-->

</TabItem>
<TabItem value="ts">

<!--SNIPSTART subscription-ts-workflow-definition-->
[src/workflows.ts](https://github.com/temporalio/subscription-workflow-project-template-typescript/blob/master/src/workflows.ts)
```ts
import * as wf from "@temporalio/workflow";
import type * as activitiesTypes from "./activities";
import { Customer } from "./types";

const activities = wf.proxyActivities<typeof activitiesTypes>({
  startToCloseTimeout: "5s", // short only because we are just console.logging
});

export const cancelSubscription = wf.defineSignal("cancelSubscription");

export async function SubscriptionWorkflow(
  customer: Customer
): Promise<string> {
  let subscriptionCancelled = false;
  let totalCharged = 0;

  const CustomerIdName = querysignalState("CustomerIdName", "customerid");
  const BillingPeriodNumber = querysignalState("BillingPeriodNumber", 0);
  const BillingPeriodChargeAmount = querysignalState(
    "BillingPeriodChargeAmount",
    customer.Subscription.initialBillingPeriodCharge
  );

  wf.setHandler(CustomerIdName.query, () => customer.Id);
  wf.setHandler(cancelSubscription, () => void (subscriptionCancelled = true));

  // Send welcome email to customer
  await activities.sendWelcomeEmail(customer);

  // Start the free trial period. User can still cancel subscription during this time
  if (
    await wf.condition(
      customer.Subscription.TrialPeriod,
      () => subscriptionCancelled
    )
  ) {
    // If customer cancelled their subscription during trial period, send notification email
    await activities.sendCancellationEmailDuringTrialPeriod(customer);
    // We have completed subscription for this customer.
    // Finishing workflow execution
    return "Subscription finished for: " + customer.Id;
  } else {
    // Trial period is over, start billing until
    // we reach the max billing periods for the subscription
    // or sub has been cancelled
    // eslint-disable-next-line no-constant-condition
    while (true) {
      if (BillingPeriodNumber.value >= customer.Subscription.MaxBillingPeriods)
        break;
      console.log("charging", customer.Id, BillingPeriodChargeAmount.value);
      await activities.chargeCustomerForBillingPeriod(
        customer,
        BillingPeriodChargeAmount.value
      );
      totalCharged += BillingPeriodChargeAmount.value;
      // Wait 1 billing period to charge customer or if they cancel subscription
      // whichever comes first
      if (
        await wf.condition(
          customer.Subscription.BillingPeriod,
          () => subscriptionCancelled
        )
      ) {
        // If customer cancelled their subscription send notification email
        await activities.sendCancellationEmailDuringActiveSubscription(
          customer
        );
        break;
      }
      BillingPeriodNumber.value++;
    }
    // if we get here the subscription period is over
    // notify the customer to buy a new subscription
    if (!subscriptionCancelled) {
      await activities.sendSubscriptionOverEmail(customer);
    }
    return (
      "Completed " +
      wf.workflowInfo().workflowId +
      ", Total Charged: " +
      totalCharged
    );
  }
}

function querysignalState<T = any>(name: string, initialValue: T) {
  const signal = wf.defineSignal<[T]>(name);
  const query = wf.defineQuery<T>(name);
  let state: T = initialValue;
  wf.setHandler(signal, (newValue: T) => {
    console.log("updating ", name, newValue);
    state = newValue;
  });
  wf.setHandler(query, () => state);
  return {
    signal,
    query,
    get value() {
      // need to use closure because function doesn't rerun unlike React Hooks
      return state;
    },
    set value(newVal: T) {
      state = newVal;
    },
  };
}
```
<!--SNIPEND-->

</TabItem>
<TabItem value="php">

<!--SNIPSTART subscription-php-workflow-definition-implementation-->
[src/subscription/SubscriptionWorkflow.php](https://github.com/temporalio/subscription-workflow-project-template-php/blob/master/src/subscription/SubscriptionWorkflow.php)
```php
declare(strict_types=1);

namespace Temporal\Samples\Subscription;

use Carbon\CarbonInterval;
use Temporal\Activity\ActivityOptions;
use Temporal\Workflow;

class SubscriptionWorkflow implements SubscriptionWorkflowInterface
{

    private int $billingPeriodNum = 0;
    private bool $subscriptionCancelled = false;
    private Subscription $subscription;
    private Customer $workflowCustomer;

    private $subscriptionActivity;

    public function __construct()
    {
        $this->subscriptionActivity = Workflow::newActivityStub(
            SubscriptionActivityInterface::class,
            ActivityOptions::new()
                ->withStartToCloseTimeout(CarbonInterval::seconds(5))
                ->withScheduleToCloseTimeout(CarbonInterval::seconds(10))
                ->withTaskQueue("SubscriptionsTaskQueue")
        );

        $this->subscription = new Subscription(
            CarbonInterval::seconds(10),
            CarbonInterval::seconds(10),
            24,
            120
        );
    }

    public function startSubscription(int $cid)
    {
        $this->workflowCustomer = new Customer(
            "First Name" . $cid,
            "Last Name" . $cid,
            "Id-" . $cid,
            "Email" . $cid,
            $this->subscription
        );

        yield $this->subscriptionActivity->sendWelcomeEmail($cid);

        yield Workflow::awaitWithTimeout(
            $this->workflowCustomer->getSubscription()->getTrialPeriod(),
            fn () => $this->subscriptionCancelled == true
        );

        if ($this->subscriptionCancelled) {
            $this->subscriptionActivity->sendCancellationEmailDuringTrialPeriod($cid);
            return;
        }

        while ($this->billingPeriodNum  < $this->workflowCustomer->getSubscription()->getMaxBillingPeriods()) {

            // Charge customer for the billing period
            $this->subscriptionActivity->chargeCustomerForBillingPeriod(
                $cid,
                $this->billingPeriodNum
            );

            // Wait 1 billing period to charge customer or if they cancel subscription
            // whichever comes first
            yield Workflow::awaitWithTimeout(
                $this->workflowCustomer->getSubscription()->getBillingPeriod(),
                fn () => $this->subscriptionCancelled == true
            );

            // If customer cancelled their subscription send notification email
            if ($this->subscriptionCancelled) {
                $this->subscriptionActivity->sendCancellationEmailDuringActiveSubscription($cid);
                // We have completed subscription for this customer.
                // Finishing workflow execution
                break;
            }

            $this->billingPeriodNum++;
        }

        if (!$this->subscriptionCancelled) {
            $this->subscriptionActivity->sendSubscriptionOverEmail($cid);
        }
    }

    public function cancelSubscription(bool $cancel): void
    {
        $this->subscriptionCancelled = $cancel;
    }

    public function updateBillingPeriodChargeAmount(int $billingPeriodCharge): void
    {
        $this->workflowCustomer->getSubscription()->setBillingPeriodCharge($billingPeriodCharge);
    }

    public function getCustomerId(): string
    {
        return $this->workflowCustomer->getId();
    }

    public function getBillingPeriodNumber(): int
    {
        return $this->billingPeriodNum;
    }

    public function getBillingPeriodChargeAmount(): int
    {
        return $this->workflowCustomer->getSubscription()->getBillingPeriodCharge();
    }
}
```
<!--SNIPEND-->

</TabItem>
</Tabs>

Again, it is important to note that this is working application code that directly implements the business logic.
If any of the operations take a long time, the code is not going to change.

It is completely okay to be blocked on `chargeCustomerForBillingPeriod` for a day or more if the downstream processing service is down or not responding.
In the same way, it is a completely normal operation to sleep for 30 days directly inside the Workflow code.
This is possible because infrastructure failures won't affect the Workflow state—including threads, blocking calls, and any variables.

The Temporal Platform has practically no scalability limits on the number of open Workflow Executions, so this code can be used over and over even if your application has hundreds of millions of customers.
