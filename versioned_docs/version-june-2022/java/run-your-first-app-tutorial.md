---
id: run-your-first-app-tutorial
title: Run your first Temporal application with the Java SDK
sidebar_label: Run your first app
---

import { ResponsivePlayer } from '../../../src/components'

<img alt="" class="docs-image-centered" src="https://raw.githubusercontent.com/temporalio/documentation-images/main/static/rocket-launch-java.jpg" />

:::note Tutorial information

- **Level**: ⭐ Temporal beginner
- **Time**: ⏱️ ~20 minutes
- **Goals**: 🙌
  - Complete several runs of a Temporal Workflow application using the Temporal server and the [Java SDK](https://github.com/temporalio/java-sdk).
  - Practice reviewing the state of the Workflow.
  - Understand the inherent reliability of Workflow functions.
  - Learn many of Temporal's core terminology and concepts.

:::

## Overview

The [Temporal server](https://github.com/temporalio/temporal) and a language specific SDK, in this case the [Java SDK](https://github.com/temporalio/java-sdk), provide a comprehensive solution to the complexities which arise from modern application development. You can think of Temporal as a sort of "cure all" for the pains you experience as a developer when trying to build reliable applications. Temporal provides reliability primitives right out of the box, such as seamless and fault tolerant application state tracking, automatic retries, timeouts, databases to track application states, rollbacks due to process failures, and more.

Let's run our first Temporal Workflow application and forever change the way you approach application development.

Keep reading or follow along with this video walkthrough:

<ResponsivePlayer url='https://youtu.be/jjRu8GJgL1k'/>

## ![](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/repair-tools.png) Project setup

Before starting, make sure you have looked over the [tutorial prerequisites](/java/tutorial-prerequisites) setup.

This tutorial uses a fully working template application which can be downloaded as a zip or converted to a new repository in your own Github account and cloned. Github's [creating a repository from a template guide](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template) will walk you through the steps.

- [Github source](https://github.com/temporalio/money-transfer-project-template-java)
- [Zip download](https://github.com/temporalio/money-transfer-project-template-java/archive/master.zip)

To build the project, either open it with [IntelliJ](https://www.jetbrains.com/idea/) (the project will build automatically) or make sure you have [Gradle](https://gradle.org/install/) installed and run the Gradle build command from the root of the project:

```
./gradlew build
```

Once your project has finished building, you are ready to go.

## ![](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/workflow.png) Application overview

This project template mimics a "money transfer" application that has a single [Workflow function](/java/workflows) which orchestrates the execution of an Account object's `withdraw()` and `deposit()` methods, representing a transfer of money from one account to another. Temporal calls these particular methods [Activity functions](/java/activities).

To run the application you will do the following:

1. Send a signal to the Temporal server to start the money transfer. The Temporal server will then start tracking the progress of your Workflow function execution.
2. Run a Worker. A Worker is a wrapper around your compiled Workflow and Activity code. A Worker's only job is to execute the Activity and Workflow functions and communicate the results back to the Temporal server.

Here's a high-level illustration of what's happening:

![High level project design](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/temporal-high-level-application-design.png)

### The Workflow function

The Workflow function is the application entry point. This is what our money transfer Workflow looks like:

<!--SNIPSTART money-transfer-project-template-java-workflow-implementation-->
<!--SNIPEND-->

When you "start" a Workflow you are basically telling the Temporal server, "track the state of the Workflow with this function signature". Workers will execute the Workflow code below, piece by piece, relaying the execution events and results back to the server.

### Initiate transfer

There are two ways to start a Workflow with Temporal, either via the SDK or via the [CLI](/tctl). For this tutorial we used the SDK to start the Workflow, which is how most Workflows get started in a live environment. The call to the Temporal server can be done [synchronously or asynchronously](/java/workflows). Here we do it asynchronously, so you will see the program run, tell you the transaction is processing, and exit.

<!--SNIPSTART money-transfer-project-template-java-workflow-initiator-->
<!--SNIPEND-->

Run the InitiateMoneyTransfer class within IntelliJ or from the project root using the following command:

```bash
./gradlew initiateTransfer
```

<details>
<summary>Troubleshooting</summary>

If you get `Connection refused: /127.0.0.1:7233` error, make sure the [Temporal server is running](/clusters/quick-install).

If you get `ALREADY_EXISTS: Workflow execution is already running. WorkflowId: money-transfer-workflow, RunId:<...>`, stop your Temporal docker-compose process [started earlier](/clusters/quick-install) and recreate Temporal docker-compose containers using:

```bash
docker-compose rm -f
docker-compose up
```

</details>

### State visibility

OK, now it's time to check out one of the really cool value propositions offered by Temporal: application state visibility. Visit the [Temporal Web UI](http://localhost:8080) where you will see your Workflow listed.

Next, click the "Run Id" for your Workflow. Now we can see everything we want to know about the execution of the Workflow code we told the server to track, such as what parameter values it was given, timeout configurations, scheduled retries, number of attempts, stack traceable errors, and more.

It seems that our Workflow is "running", but why hasn't the Workflow and Activity code executed yet? Investigate by clicking on the Task Queue name to view active "Pollers" registered to handle these Tasks. The list will be empty. There are no Workers polling the Task Queue!

<ResponsivePlayer url='https://youtu.be/oUGf2D4kX3U' loop='true' playing='true'/>

### The Worker

It's time to start the Worker. A Worker is responsible for executing pieces of Workflow and Activity code.

- It can only execute code that has been registered to it.
- It knows which piece of code to execute from Tasks that it gets from the Task Queue.
- It only listens to the Task Queue that it is registered to.

After The Worker executes code, it returns the results back to the Temporal server. Note that the Worker listens to the same Task Queue that the Workflow and Activity tasks are sent to. This is called "Task routing", and is a built-in mechanism for load balancing.

<!--SNIPSTART money-transfer-project-template-java-worker-->
<!--SNIPEND-->

Task Queues are defined by a simple string name.

<!--SNIPSTART money-transfer-project-template-java-shared-constants-->
<!--SNIPEND-->

Run the TransferMoneyWorker class from IntelliJ, or run the following command from the project root in separate terminal:

```
./gradlew startWorker
```

When you start the Worker it begins polling the Task Queue.
The first Task the Worker finds is the one that tells it to execute the Workflow function.
The Worker communicates the event back to the server which then causes the server to send Activity Tasks to the Task Queue as well.
The Worker then grabs each of the Activity Tasks in their respective order from the Task Queue and executes each of the corresponding Activities.
You will get a console output showing that both activity tasks were executed by the Worker:

```
Withdrawing $18.740000 from account 001-001. ReferenceId: 2ab46ccb-3791-4dd2-84e6-62319eb710a2

Depositing $18.740000 into account 002-002. ReferenceId: 2ab46ccb-3791-4dd2-84e6-62319eb710a2
```

<img alt="Celebratory confetti" class="docs-image-centered docs-image-max-width-20" src="https://raw.githubusercontent.com/temporalio/documentation-images/main/static/confetti.png" />

**Congratulations**, you just ran a Temporal Workflow application!

## ![](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/warning.png) Failure simulation

So, you've just got a taste of one of Temporal's amazing value propositions: visibility into the Workflow and the status of the Workers executing the code. Let's explore another key value proposition, maintaining the state of a Workflow, even in the face of failures. To demonstrate this we will simulate some failures for our Workflow. Make sure your Worker is stopped before proceeding.

### Server crash

Unlike many modern applications that require complex leader election processes and external databases to handle failure, Temporal automatically preserves the state of your Workflow even if the server is down. You can easily test this by following these steps (again, make sure your Worker is stopped so your Workflow doesn't finish):

1. Start the Workflow again.
2. Verify the Workflow is running in the UI.
3. Shut down the Temporal server by either using 'Ctrl+C' or via the Docker dashboard.
4. After the Temporal server has stopped, restart it and visit the UI.

Your Workflow is still there!

### Activity error

Next let's simulate a bug in one of the Activity functions. Inside your project, open the `AccountActivityImpl.java` file and uncomment the line that throws an Exception in the `deposit()` method.

<!--SNIPSTART money-transfer-project-template-java-activity-implementation-->
<!--SNIPEND-->

Save your changes and run the Worker. You will see the Worker complete the `withdraw()` Activity method, but throw the Exception when it attempts the `deposit()` Activity method. The important thing to note here is that the Worker keeps retrying the `deposit()` method.

You can view more information about what is happening in the [UI](http://localhost:8080). Click on the RunId of the Workflow. You will see the pending Activity listed there with details such as its state, the number of times it has been attempted, and the next scheduled attempt.

<ResponsivePlayer url='https://youtu.be/sMotKSI5xxE' loop='true' playing='true'/>

<br/>

Traditionally application developers are forced to implement timeout and retry logic within the business code itself. With Temporal, one of the key value propositions is that timeout configurations ([Schedule-To-Start Timeout](/concepts/what-is-a-schedule-to-start-timeout), [Schedule-To-Close Timeout](/concepts/what-is-a-schedule-to-close-timeout), [Start-To-Close Timeout](/concepts/what-is-a-start-to-close-timeout), and [Heartbeat Timeout](/concepts/what-is-a-heartbeat-timeout)) and [Retry Policies](/concepts/what-is-a-retry-policy) are specified in the Workflow code as Activity options. In our Workflow code you can see that we have specified a setStartToCloseTimeout for our Activities, and set a retry policy that tells the server to retry them up to 500 times. But we did that as an example for this tutorial, as Temporal automatically uses a default retry policy if one isn't specified!

So, your Workflow is running, but only the `withdraw()` Activity method succeeded. In any other application, the whole process would likely have to be abandoned and rolled back. So, here is the last value proposition of this tutorial: With Temporal, we can debug the issue while the Workflow is running! Pretend that you found a potential fix for the issue; Re-comment the Exception in the AccountActivityImpl.java file and save your changes. How can we possibly update Workflow code that is already halfway complete? With Temporal, it is actually very simple: just restart the Worker!

On the next scheduled attempt, the Worker will pick up right where the Workflow was failing and successfully execute the newly compiled `deposit()` Activity method, completing the Workflow. Basically, you have just fixed a bug "on the fly" with out losing the state of the Workflow.

<img alt="Business person blasting off with a backpack rocket" class="docs-image-centered docs-image-max-width-20" src="https://raw.githubusercontent.com/temporalio/documentation-images/main/static/boost.png" />

## ![](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/wisdom.png) Lore check

Great work! You now know how to run a Temporal Workflow and understand some of the key values Temporal offers. Let's do a quick review to make sure you remember some of the more important pieces.

![One](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/one.png) &nbsp;&nbsp; **What are four of Temporal's value propositions that we touched on in this tutorial?**

1. Temporal gives you full visibility in the state of your Workflow and code execution.
2. Temporal maintains the state of your Workflow, even through server outages and errors.
3. Temporal makes it easy to timeout and retry Activity code using options that exist outside of your business logic.
4. Temporal enables you to perform "live debugging" of your business logic while the Workflow is running.

![Two](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/two.png) &nbsp;&nbsp; **How do you pair up Workflow initiation with a Worker that executes it?**

Use the same Task Queue.

![Three](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/three.png) &nbsp;&nbsp; **What do we have to do if we make changes to Activity code for a Workflow that is running?**

Restart the Worker.
