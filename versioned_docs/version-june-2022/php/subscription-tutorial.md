---
id: subscription-tutorial
title: Subscription Walkthrough in PHP
sidebar_label: Subscription
description: In this tutorial, we'll go over the different components that make up the Temporal Subscription code sample.
---

Let's build a realistic monthly subscription payments workflow that can be canceled while it runs.

:::info Prerequisites

We assume that you have gone through our [Hello World tutorial](/php/hello-world) and understood the basics of
getting a Temporal PHP SDK project up and running. We don't assume knowledge of the Workflow APIs.

:::

**To skip straight to a fully working example, you can check our [Subscription Workflow repo](https://github.com/temporalio/samples-php/tree/master/app/src/Subscription)**.

## Project requirements

Our task is to write a Workflow for a limited time Subscription (eg a 12-month Phone plan) that satisfies the following conditions:

1. When the user signs up, **send a welcome email** and start a free trial for `TrialPeriod`.
2. When the `TrialPeriod` expires: charge a monthly fee.
3. When charging a fee send a corresponding email.
4. At any point while subscription (or trial) is ongoing, be able to cancel subscription with sending a **cancellation email**.

Of course, this all has to be fault-tolerant, scalable to millions of customers, testable, maintainable, observable... and so on!

## Run Workflow Command

The whole task _"create a subscription"_ looks too complicated, thus we need to break it into small manageable peaces.
We can start building the whole thing step by step. From the consumer's point of view workflow is very straightforward - subscribe a user (`subscribe($userId)`):

```php
#[WorkflowInterface]
interface SubscriptionWorkflowInterface
{
    #[WorkflowMethod]
    public function subscribe(string $userID);
}
```

Having this interface we can start building our app. First, we need a console command - a PHP script that takes some input and
starts the workflow.

```php
class SubscribeCommand extends Command
{
    protected const NAME = 'subscribe:start';
    protected const DESCRIPTION = 'Execute Subscription\SubscriptionWorkflow with custom user ID';

    protected const ARGUMENTS = [
        ['userID', InputArgument::REQUIRED, 'Unique user ID']
    ];

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $userID = $input->getArgument('userID');

        $workflow = $this->workflowClient->newWorkflowStub(
            SubscriptionWorkflowInterface::class,
            WorkflowOptions::new()
                ->withWorkflowId('subscription:' . $userID)
                ->withWorkflowIdReusePolicy(IdReusePolicy::POLICY_ALLOW_DUPLICATE)
        );

        $output->writeln("Start <comment>SubscriptionWorkflow</comment>... ");

        try {
            $run = $this->workflowClient->start($workflow, $userID);
        } catch (WorkflowExecutionAlreadyStartedException $e) {
            $output->writeln('<fg=red>Already running</fg=red>');
            return self::SUCCESS;
        }

        $output->writeln(
            sprintf(
                'Started: WorkflowID=<fg=magenta>%s</fg=magenta>',
                $run->getExecution()->getID(),
            )
        );

        return self::SUCCESS;
    }
}
```

In the snippet above we grab userId as an input and use it to start the workflow. Also, userId
is used as a workflow identifier (`'subscription:' . $userID`). Later it will be used to cancel the
subscription. Now, let's implement the workflow - a long-running process that represents user subscription business process.

### Start/End Trial

The first requirement is about starting trial period and sending emails: when the trial period starts and ends.
We don't have any activities yet, but we can start coding and think about the interface. Assume that we have `AccountActivityInterface` which
handles all the subscription staff:

```php
class SubscriptionWorkflow implements SubscriptionWorkflowInterface
{
    private $account;

    public function __construct()
    {
        $this->account = Workflow::newActivityStub(
            AccountActivityInterface::class,
            ActivityOptions::new()
                ->withScheduleToCloseTimeout(CarbonInterval::seconds(2))
        );
    }

    public function subscribe(string $userID)
    {
        // ...
    }
}
```

:::info Activity implementation

We consider activity implementation as an implementation detail, so it is out of scope.
When building this subscription workflow we will walk through the business process and use only activity interfaces. It is up to you to implement all other details.

:::

The method `subscribe(string $userID)` contains all the business logic. First, we send an email that the trial period
has started. Then we start a trial for (let's say) 30 days. Once the period ends, we send a corresponding email:

```php
public function subscribe(string $userID)
{
    yield $this->account->sendWelcomeEmail($userID);
    yield Workflow::timer(CarbonInterval::month());
    yield $this->account->sendEndOfTrialEmail($userID);
}
```

As you can see, we delegate email sending to the activity and use timer to wait for a trial period to finish.

- In other words, what happens here? The workflow sends the first email, then it _sleeps_ for 30 days, and then send one more email. Looks very elegant, right?
- It looks like a regular PHP `sleep()` call. But inside the workflow we cannot use any functions that may cause side effects, thus we use `Workflow::timer` here.

:::note Comparing Temporal's Timer vs PHP's sleep()

Using `Workflow::timer` is safer because it is persisted to Temporal Server with a server-side timer.
If any part of your system (App, Worker, even Temporal Server itself) crashes, then after restart it will continue right from the crash and not from scratch.
It means that if the workflow has been waiting for 29 days and then crashes, it will be able to recover and continue from where it left off.
This is not possible when using native PHP `sleep()` function.

:::

## Receive Cancellations

Per Requirement 4, users can cancel during the trial.
Once the trial period or subscription is cancelled, we should email the user.

How can we implement subscription cancellation?
There are several ways to do it, but the simplest is just to use Temporal's API to cancel the entire workflow.
We will need a separate console command for cancellation:

```php
class CancelCommand extends Command
{
    protected const NAME = 'subscribe:cancel';
    protected const DESCRIPTION = 'Cancel Subscription\SubscriptionWorkflow for user ID';

    protected const ARGUMENTS = [
        ['userID', InputArgument::REQUIRED, 'Unique user ID']
    ];

    public function execute(InputInterface $input, OutputInterface $output)
    {
        $userID = $input->getArgument('userID');
        $workflow = $this->workflowClient->newUntypedRunningWorkflowStub('subscription:' . $userID);

        try {
            $workflow->cancel();
            $output->writeln('Cancelled');
        } catch (WorkflowNotFoundException $e) {
            $output->writeln('<fg=red>Already stopped</fg=red>');
        }

        return self::SUCCESS;
    }
```

This command accepts `$userId` as an input argument, then fetches the workflow with id of `subscription:$userID` and tries to cancel it.

Next, we can handle cancellation within the running workflow.
Once the running workflow is cancelled `CancelledFailure` exception is thrown.
We can catch it and send an email like this:

```php
public function subscribe(string $userID)
{
    yield $this->account->sendWelcomeEmail($userID);

    try {
        yield Workflow::timer(CarbonInterval::month());
        yield $this->account->sendEndOfTrialEmail($userID);
    } catch (CanceledFailure $exception) {
         yield Workflow::asyncDetached(fn() => $this->account->sendSorryToSeeYouGoEmail($userID));
    }
}
```

Here we catch `CanceledFailure` and continue with activity to send a cancellation email.

Why do we use Temporal's `Workflow::asyncDetached()` instead of plain PHP `yield`?
We are using "native way" to cancel a business process (a workflow) here.
When a workflow is cancelled, all internal coroutines will be also cancelled.
**The email should be sent even if the main workflow is already closed.**
Thus, we need to run it into a detached coroutine, that doesn't belong to the workflow.

`Workflow::asyncDetached()` does this job: everything inside the callback will be executed inside the detached coroutine, that doesn't belong to the calling workflow. Exactly what we need here.
Having that actually we can handle any cancellations: trial or monthly subscription.
So, let's continue and finally implement subscription workflow.

:::info Why not use a Signal?

Another way to cancel the subscription is to send a [signal](/php/signals) to the workflow. For example, we
can wait with condition:

```php
yield Workflow::awaitWithTimeout(
    CarbonInterval::month(),
    fn() => $this->isCancelled
);
```

It is a valid approach, but cancelling the workflow with `cancel()` method we may be 100% sure that all internal
processes and activities will be gracefully shut down.

:::

## Monthly Subscription Handling

At this moment we have a working trial period that can be cancelled. To finish our workflow we need to add several steps:

- charge a monthly fee
- send monthly charged email
- process subscription cancellation

If we assume that the subscription period is 30 days, and it should last until it is manually cancelled, then we can use an infinite loop here (subject to [Event History Limits](/php/workflows/#large-event-histories), but don't worry about that for a monthly workflow).
We "endlessly" wait for 30 days and charge monthly fee.
Also, don't forget about the trial period at the beginning.

```php
public function subscribe(string $userID)
{
    yield $this->account->sendWelcomeEmail($userID);

    try {
        $isTrialPeriod = true;
        while (true) {
            yield Workflow::timer(CarbonInterval::month());
            yield $this->account->chargeMonthlyFee($userID);

            if ($isTrialPeriod === true) {
                yield $this->account->sendEndOfTrialEmail($userID);
                $isTrialPeriod = false;
                continue;
            }

            yield $this->account->sendMonthlyChargeEmail($userID);
        }
    } catch (CanceledFailure $exception) {
        yield $this->account->sendSorryToSeeYouGoEmail($userID);
    }
}
```

In the snippet above we have a new flag `$isTrialPeriod = true`. After the first loop iteration we finish the trial:

- charge monthly fee
- change '$isTrialPeriod' flag to `false`.
- a corresponding email is sent
- move to the next loop iteration

On the next iteration we again wait for 30 days, charge monthly fee and send email.
The last thing we need to do is to handle subscription cancellation, where we just send our cancellation email, but you can do whatever other cleanup tasks you want.

## Conclusion

That's it, we have created a complete subscription workflow that can:

- handle trial periods
- charge monthly fee every N days
- handle subscription cancellations

:::note Testing With Activity

Previously it was said that we are not going to cover any activity implementation details in this tutorial. But
if you want to test things you may use this "dummy" activity implementation that just logs each step to the screen:

```php
class AccountActivity implements AccountActivityInterface
{
    private LoggerInterface $logger;

    public function __construct()
    {
        $this->logger = new Logger();
    }

    public function sendWelcomeEmail(string $userID): void
    {
        $this->log('Send welcome email to %s', $userID);
    }

    public function chargeMonthlyFee(string $userID): void
    {
        $this->log('Charge %s of monthly fee', $userID);
    }

    public function sendEndOfTrialEmail(string $userID): void
    {
        $this->log('Send %s end of trial email', $userID);
    }

    public function sendMonthlyChargeEmail(string $userID): void
    {
        $this->log('Send %s monthly charge email', $userID);
    }

    public function sendSorryToSeeYouGoEmail(string $userID): void
    {
        $this->log('Send %s sorry to see you go email', $userID);
    }

    public function processSubscriptionCancellation(string $userID): void
    {
        $this->log('Cancel subscription for %s', $userID);
    }

    /**
     * @param string $message
     * @param mixed ...$arg
     */
    private function log(string $message, ...$arg)
    {
        // by default all error logs are forwarded to the application server log and docker log
        $this->logger->debug(sprintf($message, ...$arg));
    }
}
```

:::

The beauty of using Temporal is that a relatively complex business process is written with a few lines of code.
The code of our `SubscriptionWorkflow` is very straight-forward.
Workflow code provides us with a high-level view of the business process without digging into details.
