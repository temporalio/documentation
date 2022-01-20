---
tags:
  - v1
  - Temporal
posted_on_: 2022-01-20T07:00:00Z
slug: dominik-workflow-part-1
title: 'Introduction to Temporal Workflows'
author: Dominik Tornow
author_title: Engineering
author_image_url: https://avatars.githubusercontent.com/u/580718?v=4
image: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uiniawopp0cgrloiy777.png
description: Temporal 
release_version: 
---

<!--truncate-->

For the past 45 years, the database community has enjoyed an unparalleled developer experience: transactions mitigate failure in totality on a platform level, guaranteeing correctness on an application level.

Despite many advancements in the past 20 years, the distributed systems community has not enjoyed an equivalent developer experience: There is no abstraction that mitigates failure in totality on a platform level, guaranteeing correctness on an application level.

However, [Temporal](https://temporal.io/) changes that equation! 

## Introduction

Temporal’s core abstraction, its unit of execution, reliability, and scalability, is the Workflow. Therefore understanding the Workflow is key to understanding Temporal in general. In this blog post series we deep dive into the world of Temporal Workflows.

A Temporal Workflow is Temporal’s core abstraction. You may think of a Temporal Workflow Definition as a regular Function Definition—in fact, that is the developer experience that Temporal provides to its users—but a Workflow Execution provides stunning improvements over a regular Function Execution.

Let’s get to know Workflow Executions and contrast them to regular Function Executions with a straightforward example: sending reminder emails.

Our use case requires that our application sends a reminder email once a month to any user who signed up for a trial period to upgrade their plan. In pseudo code our use case can be expressed as:

<pre>
  <code>
<b>function</b> send monthly reminder (user) <b>do</b>
  <b>while</b> user has not signed up <b>do</b>
    send reminder to user
    sleep for 1 month
  <b>end</b>
<b>end</b>
  </code>
</pre>

## Regular Functions

The pseudo code looks fairly straightforward; in fact, the pseudo code looks less like an implementation and more like a specification. Could we use the pseudo code as a blueprint for a regular Function Definition?

No, not at all:

> In a typical environment we cannot just invoke a function and expect the resulting function execution to reliably execute to completion — or like in this case execute indefinitely until cancelation.

As a result, we have to “break up” the process of Send Reminder Email into many different pieces, scattered across the tech stack: A cron job here, a message in a queue there, maybe a row in some database table, you know, for good measure.

On top of that, now we need to worry about failures, retries, duplication, and idempotence.

An implementation on top of services like AWS Lambda Functions and like AWS Simple Queueing Service might look like:

```typescript


// Lambda function is bound to
// a. input queue "Reminder"
// b. output queue "Reminder"

// We assume that
// - messages are never lost
// - messages may be duplicated
// - messages are retried on failure

function SendReminderEmail(event, context) : Message {

  // UserSignup, SendEmail, Get, Set will throw an
  // Exception on failure

  // event.user Current user
  // event.iter Current iteration to limit retries (here 2)

  if (!UserSignedUp(event.user)) {

    // Retrieve the k/v pair for this user and iteration
    let kv = Get(`$(event.user)-${event.iter}`, 0);

    // Try at most twice
    if(kv.val < 2) {
      // Conditionally set the key. If the tag does not 
      // match we are racing with another instance of
      // SendReminderEmail
      if (Set(kv.key, kv.val + 1, kv.tag)) {
        // This does not prevent us from calling SendEmail
        // twice. Do you see why?
        SendEmail(user);
      }
    }
    else {
      throw;
    }
  }

  return {
    message: { user: event.user, iter: event.iter + 1},
    after: "1month"
  }
}

// Start by queueing the message {user: "<User>", iter: 0} on
// the message queue "Reminder"

```

Listing 2 looks nothing like the pseudo code in Listing 1. 

Listing 2 does not tell the story of our use case—while not overly long or verbose, it is obscure and hard to reason about.

## Temporal Workflows

Obviously we cannot use the pseudo code as a blueprint for a regular Function Definition. However, could we use the pseudo code as a blueprint for a Temporal Workflow Definition?

Well, yes, yes we can!

```typescript
import { proxyActivities, sleep } from '@temporalio/workflow';

const { sendReminderEmail, hasSignedUp } = proxyActivities({
  scheduleToCloseTimeout: '10 seconds',
  retry: { maximumAttempts: 2 }
});

async function SendReminderEmail(user: string) {
    while(!await hasSignedUp(user)) {
      await sendReminderEmail(user);
      await sleep("1 month");
    }
}
```

> In Temporal we can just invoke a Workflow Definition, and the resulting Workflow Execution reliably executes to completion — or like in this case execute indefinitely until cancelation.

Temporal Workflow Executions are to distributed systems what transactions are to databases: A great developer experience and (or maybe because of) peace of mind.

Doubts? Disbelief? Check out Part II and Part III to explore how Temporal implements this game-changing execution model.
