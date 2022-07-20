---
tags:
  - temporal
  - community
posted_on_: 2022-07-13T00:00:00Z
slug: using-temporal-as-a-node-task-queue
title: 'Using Temporal as a Node.js Task Queue'
author: Valeri Karpov
author_title: Community Member
author_image_url: https://avatars.githubusercontent.com/u/1620265?v=4
release_version: V1.15
---

<!--truncate-->

There are numerous task queues for Node.js. [Bull](https://optimalbits.github.io/bull/) is the most popular, but [Bee Queue](https://www.npmjs.com/package/bee-queue), [Agenda](https://www.npmjs.com/package/agenda), and [Kue](https://www.npmjs.com/package/kue) are also common.

All these task queue libraries solve a similar problem.
They let you put a task onto a queue, and define a worker that consumes tasks from the queue.
While Temporal is much more than a task queue, Temporal does solve the same problems as these task queue libraries.
Plus, Temporal's feature set provides several advantages over conventional task queues.

## Setting Up a Task Queue With Temporal

A common use case for a task queue is sending a welcome email when a new user registers.
Sending email is a good candidate for a task queue, because sending an email often requires a slow API call and is more of a "side effect" of registering the user.
The following is a basic example of defining an email queue with Bull.
If you're interested in a more complete tutorial, here's a [tutorial about building an email queue with Bull in TypeScript](https://blog.taskforce.sh/implementing-mail-microservice-with-bullmq/).

`email-queue.js`

```javascript
const Queue = require('bull');
const axios = require('axios');

const emailQueue = new Queue('email');
const mailgunAPI = 'https://api.mailgun.net/v3';

queue.process(async function sendEmail(job) {
  const { to, from, subject, html } = job.data;
  await axios({
    url: `${mailgunAPI}/${domain}/messages`,
    method: 'post',
    params: { to, from, subject, html },
    auth: {
      username: 'api',
      password: apiKey
    }
  })
});
```

`create-test-task.js`

```javascript
const Queue = require('bull');

const emailQueue = new Queue('email');

emailQueue.add({
  to: 'john.smith@gmail.com',
  from: 'test@temporal.io',
  subject: 'Welcome to Temporal!',
  html: 'This is a test email'
});
```

With Temporal, the setup is similar.
A task or job corresponds to a [Workflow](https://docs.temporal.io/concepts/what-is-a-workflow-execution).
But, first, you need to define an [Activity](https://docs.temporal.io/concepts/what-is-an-activity) to send the email as follows.

`src/activities.ts`

```ts
import axios from 'axios';
import { SendEmailParams } from './interfaces';

interface MailgunSettings {
  apiKey: string;
  domain: string;
}

const mailgunAPI = 'https://api.mailgun.net/v3';

export const createActivities = ({ apiKey, domain }: MailgunSettings) => ({
  async sendEmail(params: SendEmailParams): Promise<void> {
    const { to, from, subject, html } = params;
    await axios({
      url: `${mailgunAPI}/${domain}/messages`,
      method: 'post',
      params: { to, from, subject, html },
      auth: {
        username: 'api',
        password: apiKey,
      },
    });
  },
});
```

Next, you need to define a Workflow that calls this activity.

`src/workflows.ts`

```ts
import { proxyActivities } from '@temporalio/workflow';
import type { createActivities } from './activities';
import { SendEmailParams } from './interfaces';

const { sendEmail } = proxyActivities<ReturnType<typeof createActivities>>({
  startToCloseTimeout: '5m',
});

export async function sendEmailWorkflow(params: SendEmailParams): Promise<void> {
  await sendEmail(params);
}
```

Finally, you need to create [Worker](https://docs.temporal.io/concepts/what-is-a-worker-entity) to process tasks as follows.

`src/worker.ts`

```ts
import { Worker } from '@temporalio/worker';
import dotenv from 'dotenv';
import { createActivities } from './activities';

dotenv.config();

const {
  MAILGUN_API: apiKey,
  MAILGUN_DOMAIN: domain
} = process.env;

async function run(): Promise<void> {
  if (apiKey === undefined) throw new Error('No API key');
  if (domain === undefined) throw new Error('No domain');

  const activities = createActivities({
    apiKey,
    domain,
  });

  const worker = await Worker.create({
    taskQueue: 'email',
    activities,
    workflowsPath: require.resolve('./workflows'),
  });
  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
```

Finally, to start a Workflow, you need to create a `WorkflowClient` and `start()` the Workflow as follows.

`src/client.ts`

```ts
import { Connection, WorkflowClient } from '@temporalio/client';
import { sendEmailWorkflow } from './workflows';
import { nanoid } from 'nanoid';

const connection = new Connection({});
const client = new WorkflowClient(connection.service);

const handle = await client.start(sendEmailWorkflow, {
  args: [{
    to: 'john.smith@gmail.com',
    from: 'test@temporal.io',
    subject: 'Welcome to Temporal!',
    html: 'This is a test email'
  }],
  taskQueue: 'email',
  workflowId: 'workflow-' + nanoid(),
});
```

The Temporal code is slight more verbose, because you need a separate Activity function.
However, Temporal has several features that make it an excellent option for the task queue use case.

## Additional Features: UI, Type Checking, Retries, Delays

Most Node.js task queues have a corresponding UI for monitoring and managing tasks.
For example, [Taskforce](https://taskforce.sh/) for Bull, or [Agendash](https://github.com/agenda/agendash) for Agenda.
The Temporal UI lets you manage and monitor Workflows in a similar way.

The Temporal UI for an execution of `sendEmailWorkflow()` looks like the following.
It displays when the `sendEmailWorkflow()` started and ended, when the `sendEmail()` activity started and ended, and the data `sendEmail()` returned.

![](/img/ui-send-email.png)

Temporal has stronger built-in type safety than conventional task queues.
For example, Bull doesn't provide a way for TypeScript to tie the `email` queue to the arguments that the `sendEmail()` handler expects.
You can call `emailQueue.add(args)` with an arbitrarily typed argument.
On the other hand, TypeScript type checks `args` in the following code to make sure it lines up with the parameters `sendEmailWorkflow()` expects.

```ts
const handle = await client.start(sendEmailWorkflow, {
  args: [{
    to: 'john.smith@gmail.com',
    from: 'test@temporal.io',
    subject: 'Welcome to Temporal!',
    html: 'This is a test email'
  }], // TypeScript can type check `args`
  taskQueue: 'email',
  workflowId: 'workflow-' + nanoid(),
});
```

Suppose the Mailgun API has a temporary issue.
Ideally, your task queue would retry sending the email automatically a fixed number of times before marking the task as failed.
Some task queues support retrying failed jobs: Bull does not, but [Bee Queue does](https://www.npmjs.com/package/bee-queue#retrying).

Temporal supports retrying activities with exponential backoff via [retry policies](https://docs.temporal.io/concepts/what-is-a-retry-policy/).
For example, the following code shows how you might configure Temporal to retry the `sendEmail()` activity at most 2 times.

`src/workflows.ts`

```ts
import { proxyActivities } from '@temporalio/workflow';
import type { createActivities } from './activities';
import { SendEmailParams } from './interfaces';

interface SendEmailParams {
  to: string;
  from: string;
  subject: string;
  html: string;
}

const { sendEmail } = proxyActivities<ReturnType<typeof createActivities>>({
  retry: {
    maximumAttempts: 2 // Retry `sendEmail()` twice before failing
  },
  startToCloseTimeout: '5m',
});

export async function sendEmailWorkflow(params: SendEmailParams): Promise<void> {
  await sendEmail(params);
}
```

Suppose you want to delay sending your email for 24 hours, because you want to remind the user of something.
Many task queues also support delaying processing a task.
For example, [Bull lets you specify a `delay` in milliseconds](https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueadd) when adding a task to a queue.

Temporal Workflows are durable, which means you can safely put a `sleep()` in your Workflow to add a delay.

`src/workflows.ts`

```ts
import { proxyActivities, sleep } from '@temporalio/workflow';
import type { createActivities } from './activities';
import { SendEmailParams } from './interfaces';

const { sendEmail } = proxyActivities<ReturnType<typeof createActivities>>({
  startToCloseTimeout: '5m',
});

export async function sendEmailWorkflow(params: SendEmailParams): Promise<void> {
  const delay = params.delay;
  if (delay !== undefined) {
    await sleep(delay);
  }

  await sendEmail(params);
}
```

The ability to use `sleep()` in your Workflows without sacrificing durability means you can write multiple "tasks" in one Workflow.
If you want to send another email after a certain period of time, you can write a single Workflow, rather than scheduling multiple tasks.
Let's take a look at how you can use Workflows to represent a more sophisticated series of tasks.

## Multi-Part Tasks

Many modern apps don't just send one welcome email.
They often have a whole series of emails over several days that help new customers get acquainted with the app.
With a traditional task queue, you would need a separate task for every email in the series for every customer.
Add in conditional logic, like sending a different email if a customer has no interactions with the app, and implementing a multi-part email series can be an extremely complex endeavor.

With Temporal, you can send multiple emails from one Workflow.
In the following code, the `customerWelcomeSeriesWorkflow()` sends multiple emails separated by 24 hours.

`src/workflows.ts`

```ts
import { proxyActivities, sleep } from '@temporalio/workflow';
import type { createActivities } from './activities';

interface CustomerWelcomeSeriesParams {
  to: string;
  from: string;
}

const { sendEmail } = proxyActivities<ReturnType<typeof createActivities>>({
  retry: {
    maximumAttempts: 2
  },
  startToCloseTimeout: '5m',
});

export async function customerWelcomeSeriesWorkflow(params: CustomerWelcomeSeriesParams): Promise<void> {
  const { from, to } = params;
  await sendEmail({
    to,
    from,
    subject: 'Welcome to Temporal!',
    html: 'This is a test email'
  });

  await sleep('1 days'); // Wait for 24 hours

  await sendEmail({
    to,
    from,
    subject: 'Your First Day Using Temporal',
    html: 'This is a test email'
  });

  await sleep('1 days'); // Wait for 24 hours

  await sendEmail({
    to,
    from,
    subject: 'Advanced Temporal Workflows',
    html: 'This is a test email'
  });
}
```

You can also conditionally schedule emails based on user actions using [Signals](https://docs.temporal.io/concepts/what-is-a-signal/).
For example, your app can send a Signal to `customerWelcomeSeriesWorkflow()` when a user logs in, so `customerWelcomeSeriesWorkflow()` can send a different email if a new customer hasn't logged in for 24 hours.

`src/workflows.ts`

```ts
import { defineSignal, proxyActivities, sleep } from '@temporalio/workflow';
import type { createActivities } from './activities';

export const loggedInSignal = defineSignal('loggedIn');

interface CustomerWelcomeSeriesParams {
  to: string;
  from: string;
}

const { sendEmail } = proxyActivities<ReturnType<typeof createActivities>>({
  retry: {
    maximumAttempts: 2
  },
  startToCloseTimeout: '5m',
});

export async function customerWelcomeSeriesWorkflow(params: CustomerWelcomeSeriesParams): Promise<void> {
  const { from, to } = params;

  // Assume app sends a signal to this Workflow when a customer logs in
  let hasLoggedIn = false;
  setHandler(loggedInSignal, () => {
    hasLoggedIn = true;
  });

  await sendEmail({
    to,
    from,
    subject: 'Welcome to Temporal!',
    html: 'This is a test email'
  });

  await sleep('1 days');

  // Send a different email if user hasn't logged in during first 24 hours
  if (!hasLoggedIn) {
    await sendEmail({
      to,
      from,
      subject: 'Looks Like You Haven\'t Tried Temporal Yet...',
      html: 'This is a test email'
    });
  } else {
    await sendEmail({
      to,
      from,
      subject: 'Your First Day Using Temporal',
      html: 'This is a test email'
    });
  }
}
```

While Temporal Workflows can execute just one task, they can also execute a whole series of tasks.
With a conventional task queue, you would have to schedule a separate task for each email in `customerWelcomeSeriesWorkflow()`.
Temporal Workflows make writing multi-part tasks much easier, because you can write the task orchestration logic in a single JavaScript function, rather than spread out across multiple task handlers.

## Moving On

Temporal is not a task queue, but you can use Temporal Workflows to solve the same problem that task queues solve: sending tasks to workers using a queue in a durable and observable way.
Temporal provides a lot of the same features as task queues, including retries, delays, and a sleek UI.
But Temporal Workflows also help you write more complex multi-step tasks in a single JavaScript function, including logic that would require multiple tasks in a traditional task queue.
So next time you're looking for a Node.js task queue, try Temporal instead!
