---
id: sdk-tutorial-run-your-first-app
title: Run your first Temporal application
sidebar_label: Run your first app
---

import { ResponsivePlayer } from '../src/components';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img class="docs-image-centered" src={require('../static/img/docs/rocket-launch.jpg').default} />

:::note Tutorial information

**Level:** Temporal beginner

**Time:** ~20 minutes

**Goals:**

- Complete several runs of a Temporal Workflow application using the Temporal server and the SDK of your choice:
    - [Java](https://github.com/temporalio/java-sdk)
    - [Go](https://github.com/temporalio/go-sdk)
- Practice accessing and using the visibility of the Workflow's state.
- Understand the inherent reliability of Workflow functions.
- Learn many of Temporal's core terminology and concepts.

:::

## Overview

The [Temporal server](/docs/install-temporal-server) and a language specific SDK provide a comprehensive solution to the complexities which arise from modern application development. You can think of Temporal as a sort of "cure all" for the pains you experience as a developer when trying to build reliable applications. Temporal provides reliability primitives right out of the box, such as seamless and fault tolerant application state tracking, automatic retries, timeouts, databases to track application states, rollbacks due to process failures, and more.

Let's run our first Temporal Workflow application and forever change the way you approach application development.

Keep reading or follow along via a video walkthrough:

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

<ResponsivePlayer url='https://www.youtube.com/watch?v=aUUhFAupUbk' />

</TabItem>
<TabItem value="java">

<ResponsivePlayer url='https://youtu.be/jjRu8GJgL1k'/>

</TabItem>
</Tabs>

## ![](/img/docs/repair-tools.png) Project setup

Before starting, make sure you have looked over the [tutorial prerequisites](/docs/sdk-tutorial-prerequisites).

Each SDK has a fully working application template which can be downloaded as a zip or converted to a new repository in your own Github account and cloned.

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

- [**Github source**](https://github.com/temporalio/money-transfer-project-template-go)
- [**Zip download**](https://github.com/temporalio/money-transfer-project-template-go/archive/main.zip)

If you convert the template to a new repo, make sure you use the same repository name in your own Github account so that you don't have to make changes to the Go module name when you clone it. Once you have it, open your terminal in the project's root directory and you are ready to go.

</TabItem>
<TabItem value="java">

- [**Github source**](https://github.com/temporalio/money-transfer-project-template-java)
- [**Zip download**](https://github.com/temporalio/money-transfer-project-template-java/archive/master.zip)

To build the project, either open it with [IntelliJ](https://www.jetbrains.com/idea/) and the project will build automatically or make sure you have [Gradle](https://gradle.org/install/) installed and run the Gradle build command from the root of the project:

```
./gradlew build
```

Once your project has finished building, you are ready to go.

</TabItem>
</Tabs>

## ![](/img/docs/workflow.png) Application overview

Each project template mimics a "money transfer" application that has a single [Workflow function](/docs/workflows) which orchestrates the execution of withdraw and deposit functions, representing a transfer of money from one account to another. Temporal calls these orchestrated functions [Activity functions](/docs/activities).

To run the application you will do the following:

1. Send a signal to the Temporal server to start the money transfer. The Temporal server will then start tracing the progress of your Workflow function execution.
2. Run a Worker. A Worker is a wrapper around your compiled Workflow and Activity code. A Worker's only job is to execute the Activity and Workflow functions and communicate the results back to the Temporal server.

Here's a high-level illustration of what's happening:

![High level project design](/img/docs/temporal-high-level-application-design.png)

### The Workflow function

The Workflow function is the application entry point. Below you can see how the money transfer Workflow looks in each language.

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

<!--SNIPSTART money-transfer-project-template-go-workflow-->
<!--SNIPEND-->

</TabItem>
<TabItem value="java">

<!--SNIPSTART money-transfer-project-template-java-workflow-implementation-->
<!--SNIPEND-->

</TabItem>
</Tabs>

When you "start" a Workflow you are basically telling the Temporal server, "track the state of the Workflow with this signature". But it will be the Workers that will execute the Workflow code, piece by piece, relaying the execution events and results back to the server.

### Initiate transfer

There are two ways to start a Workflow with Temporal, either via the SDK or via the [CLI](/docs/tctl). For this tutorial we use the SDK to start the Workflow, which is how most Workflows get started in a live environment. The call to the Temporal server can be done [synchronously or asynchronously](/docs/java-starting-workflow-executions). Here we do it asynchronously, so you will see the program run, tell you the transaction is processing, and exit.

Take a look at the code below that is used to start the Workflow. Make sure the [Temporal server](/docs/install-temporal-server) is running in a terminal, and then follow the language specific instructions to start the Workflow.

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

<!--SNIPSTART money-transfer-project-template-go-start-workflow-->
<!--SNIPEND-->

Run start/main.go from the project root using the following command:

```
go run start/main.go
```

</TabItem>
<TabItem value="java">

<!--SNIPSTART money-transfer-project-template-java-workflow-initiator-->
<!--SNIPEND-->

Run the InitiateMoneyTransfer class within IntelliJ or from the project root using the following command:

```
./gradlew initiateTransfer
```

</TabItem>
</Tabs>

### State visibility

OK, now it's time to check out one of the really cool value propositions offered by Temporal: application state visibility. Visit the [Temporal Web UI](localhost:8088) where you will see your Workflow listed.

Next, click the "Run Id" for your Workflow. Now we can see everything we want to know about the execution of the Workflow code we told the server to track, such as what parameter values it was given, timeout configurations, scheduled retries, number of attempts, stack traceable errors, and more.

It seems that our Workflow is "running", but why hasn't the Workflow and Activity code executed yet? Investigate by clicking on the Task Queue name to view active "Pollers" registered to handle these Tasks. The list will be empty. There are no Workers polling the Task Queue!

<ResponsivePlayer url='https://youtu.be/oUGf2D4kX3U' loop='true' playing='true'/>

### The Worker

It's time to start the Worker. A Worker is responsible for executing pieces of Workflow and Activity code, and it knows which piece to execute from Tasks that it gets from the Task Queue it is listening to. After The Worker executes code, it returns the results back to the Temporal server. Note that the Worker listens to the same Task Queue that the Workflow and Activity tasks are sent to. This is called "Task routing", and is a built-in mechanism for load balancing. Take a look at the code below that is used to start the Worker and follow the language specific instructions

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

This is what our Worker looks like:

<!--SNIPSTART money-transfer-project-template-go-worker-->
<!--SNIPEND-->

Task Queues are defined by a simple string name:

<!--SNIPSTART money-transfer-project-template-go-shared-task-queue-->
<!--SNIPEND-->

Run worker/main.go from the project root using the following command:

```
go run worker/main.go
```

</TabItem>
<TabItem value="java">

This is what our Worker looks like:

<!--SNIPSTART money-transfer-project-template-java-worker-->
<!--SNIPEND-->

Task Queues are defined by a simple string name:

<!--SNIPSTART money-transfer-project-template-java-shared-constants-->
<!--SNIPEND-->

Run the TransferMoneyWorker class from IntelliJ, or run the following command from the project root in separate terminal:

```
./gradlew startWorker
```

</TabItem>
</Tabs>

When you start the Worker it begins polling the Task Queue. The first Task the Worker finds is the one that tells it to execute the Workflow function. The Worker communicates the event back to the server which then causes the server to send Activity Tasks to the Task Queue as well. The Worker then grabs each of the Activity Tasks in their respective order from the Task Queue and executes each of the corresponding Activities.

<img class="docs-image-centered docs-image-max-width-20" src={require('../static/img/docs/confetti.png').default} />

**Congratulations**, you just ran a Temporal Workflow application!


## ![](/img/docs/warning.png) Failure simulation

So, you've just got a taste of one of Temporal's amazing value propositions: visibility into the Workflow and the status of the Workers executing the code. Let's explore another key value proposition, maintaining the state of a Workflow, even in the face of failures. To demonstrate this we will simulate some failures for our Workflow. Make sure your Worker is stopped before proceeding.

### Server crash

Unlike many modern applications that require complex leader election processes and external databases to handle failure, Temporal automatically preserves the state of your Workflow even if the server is down. You can easily test this by following these steps (again, make sure your Worker is stopped so your Workflow doesn't finish before you turn off the server):

1. Start the Workflow again.
2. Verify the Workflow is running in the UI.
3. Shut down the Temporal server by either using 'Ctrl c' or via the Docker dashboard.
4. After the Temporal server has stopped, restart it and visit the UI.

Your Workflow is still there!

### Activity error

Next let's simulate a bug in one of the Activity functions. Change the code in the deposit function so that it errors.

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

Open the activity.go file and switch out the comments on the return statements such that the `Deposit()` function returns an error:

<!--SNIPSTART money-transfer-project-template-go-activity-->
<!--SNIPEND-->

</TabItem>
<TabItem value="java">

Inside your project open the AccountActivityImpl.java file and uncomment the line that throws an exception in the `deposit()` method:

<!--SNIPSTART money-transfer-project-template-java-activity-implementation-->
<!--SNIPEND-->

</TabItem>
</Tabs>

Save your changes and run the Worker. You will see the Worker complete the withdraw Activity function but throw the error when it attempts the deposit Activity function. The important thing to note here is that the Worker keeps retrying the deposit function.

You can view more information about what is happening in the [UI](localhost:8088). Click on the RunId of the Workflow. You will see the pending Activity listed there with details such as its state, the number of times it has been attempted, and the next scheduled attempt.

<ResponsivePlayer url='https://youtu.be/sMotKSI5xxE' loop='true' playing='true'/>

<br/>

Traditionally application developers are forced to implement timeout and retry logic within the business code itself. With Temporal, one of the key value propositions is that [timeout configurations](/docs/activities/#timeouts) and [retry policies](/docs/activities/#retries) can be specified in the Workflow code as Activity options.

In our Workflow code above you can see that we have specified a StartToCloseTimeout and a retry policy that tells the server to retry the Activities up to 500 times. But we did that as an example for this tutorial as Temporal automatically uses a default retry policy if one isn't specified!

So, your Workflow is running, but only the withdraw Activity function succeeded. In any other application, the whole process would likely have to be abandoned and rolled back. So, here is the last value proposition of this tutorial: With Temporal, we can debug the issue while the Workflow is running!

Pretend that you found a potential fix for the issue; Revert the code so that it doesn't error and save your changes. Now restart the Worker. Restarting the Worker causes it to pick up the most recent changes to your code. On the next scheduled attempt, the Worker will pick up right where the Workflow was failing and successfully execute the deposit Activity completing the Workflow. Basically, you have just fixed a bug "on the fly" with out losing the state of the Workflow.

<img class="docs-image-centered docs-image-max-width-20" src={require('../static/img/docs/boost.png').default} />

## ![](/img/docs/wisdom.png) Lore check

Great work! You now know how to run a Temporal Workflow and understand some of the key values Temporal offers. Let's do a quick review to make sure you remember some of the more important pieces.

![One](/img/docs/one.png) &nbsp;&nbsp; **What are four of Temporal's value propositions that we touched on in this tutorial?**

1. Temporal gives you full visibility in the state of your Workflow and code execution.
2. Temporal maintains the state of your Workflow, even through server outages and errors.
3. Temporal makes it easy to timeout and retry Activity code using options that exist outside of your business logic.
4. Temporal enables you to perform "live debugging" of your business logic while the Workflow is running.

![Two](/img/docs/two.png) &nbsp;&nbsp; **How do you pair up Workflow initiation with a Worker that executes it?**

Use the same Task Queue.

![Three](/img/docs/three.png) &nbsp;&nbsp; **What do we have to do if we make changes to Activity code for a Workflow that is running?**

Restart the Worker.
