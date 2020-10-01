---
id: java-run-your-first-app
title: Run your first Temporal application with the Java SDK
sidebar_label: Run your first app
---

Welcome to the evolution of application development!

This tutorial is aimed at developers who are new to Temporal and have some basic knowledge of Java. By following this tutorial you will learn how to run a Temporal Workflow application using the [Temporal Java SDK](https://github.com/temporalio/java-sdk) and you will also witness the fundamentally resilient nature of a Workflow, getting just a taste of the value that Temporal can provide.

In case you are still wondering what [Temporal](/docs/overview) is, that is OK, there is a lot that can be said about it. In this tutorial we will focus on two of its main user facing components which are the Temporal server and its Java SDK.

![Temporal server and SDK diagram](/img/docs/temporal-server-and-sdk-icons.png)

Together they are a solution to the complexities that arise from modern application development needs. You can think of Temporal as a sort of "cure all" for the pains developers experience when trying to make reliable applications. Temporal provides reliability primitives right out of the box, such as automatic retries, timeouts, databases to track application states, rollbacks due to process failures, and more.

Let's run your first Temporal Workflow application and forever change the way you approach application development.

## Project setup &nbsp;&nbsp; ![](/img/docs/repair-tools.png)

First, make sure you have the [tutorial prerequisites](/docs/java-sdk-tutorial-prerequisites) setup.

Next, download the ['Java project template'](https://github.com/temporalio/money-transfer-project-template-java) by downloading it as a zip or by [creating a new repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template#creating-a-repository-from-a-template) in your own Github account and then cloning the repo to the location of your choice. Look for the "Use this template" button:

<img class="docs-image-centered" src={require('../static/img/docs/use-this-template.png').default} />

The last setup step is to build the project. If you open it with [IntelliJ](https://www.jetbrains.com/idea/) the project will build automatically. If you prefer to run programs from your terminal, make sure you have [Gradle](https://gradle.org/install/) installed and run the Gradle build command from the root of the project:

```
./gradlew build
```

Once your project has built, you are ready to go.

## Application overview &nbsp;&nbsp; ![](/img/docs/workflow.png)

The Java project template mimics a "money transfer" application in order to give you the minimum elements needed to both get started building your own application as well as understand some of the value that Temporal gives you right out of the box. The project includes a predefined [Workflow](/docs/workflows) that orchestrates the execution of an account object's methods `withdraw()` and `deposit()` to mock the transfer of money from one account to another. Temporal calls such methods [Activities](/docs/activities).

The first thing you will do is to call on the Temporal server to start the transfer. Temporal will then start tracking the progress of the Workflow execution. You will then run a Worker. A Worker has compiled the Workflow and Activity code and its sole job is to execute the functions and communicate the results back to the Temporal server.

![High level project design](/img/docs/temporal-high-level-application-design.png)

### The Workflow

With Temporal, when you "start" a Workflow you are saying to the Temporal server, "track the state of the Workflow with this Id". The server will then put a Task into a Task Queue that lets a Worker know to start executing that Workflow's entry method. Each method in the Workflow is represented as a Task in Temporal. A Task is basically function/method metadata, not actual code. The code below represents three Tasks, one for the Workflow itself, and one for each of the Activity methods.

<!--SNIPSTART money-transfer-project-template-java-workflow-implementation-->
<!--SNIPEND-->

### Initiate transfer

Let's tell the server that we want this Workflow code to execute. Make sure the [Temporal server](/docs/install-temporal-server) is running in a terminal, and then from within IntelliJ run the InitiateMoneyTransfer class or from the project root run the following command:

```
./gradlew initiateTransfer
```

The two ways to initiate a Workflow with Temporal is either via the SDK or via the CLI. For this tutorial we are focusing on using the SDK to start the Workflow, which is how most Workflows would be initiated in a production environment. Here is the code we just ran to start the Workflow:

<!--SNIPSTART money-transfer-project-template-java-workflow-initiator-->
<!--SNIPEND-->

The call to the Temporal service can be done synchronously or asynchronously and here we do it asynchronously. You will see the program run, tell you the transaction is processing, and exit.

### State visibility

OK, now let's check out one of the really cool value propositions that Temporal offers: application state visibility. Visit the [Temporal Web UI](localhost:8088) where you will see your Workflow listed.

![Temproal web UI](/img/docs/temporal-web-ui-transfer-money-workflow.png)

Click the RunId. Here we can view everything we want to know about the state of the execution of the code we told the server to run, such as what parameter values it was given, timeout configurations, scheduled retries, number of attempts, stack traceable errors, and more.

So, the Workflow is running, but why hasn't the Workflow and Activity code executed yet? Click on the Task Queue name to view active "Pollers" registered to handle these Tasks. The list will be empty. There are no Workers polling the Task Queue!

### The Worker

As mentioned earlier, a Worker is responsible for actually executing pieces of Workflow code. It listens to a Task Queue, polling for Tasks. A Task identifies a function/method, which the Worker executes, returning any result back to the Temporal server. This is what our Worker looks like:

<!--SNIPSTART money-transfer-project-template-java-worker-->
<!--SNIPEND-->

Notice that the Worker will listen to the same Task Queue that the Workflow and Activity tasks are sent to. This is called "Task routing", and is a built-in mechanism for load balancing.

<!--SNIPSTART money-transfer-project-template-java-shared-constants-->
<!--SNIPEND-->

Let's start the Worker. From within IntelliJ run the TransferMoneyWorker class, or from the project root, run the following command:

```
./gradlew startWorker
```

When the Worker starts it begins polling the Task Queue. The first Task it finds is the Workflow Task, which it executes. Executing the Workflow causes the Activity Tasks to be sent to the Task Queue as well. The Worker then grabs each of the Activity Tasks in their respective order from the Task Queue and executes the corresponding Activities.

Congratulations, you have run a Temporal Workflow application!

## Failure simulation &nbsp;&nbsp;![](/img/docs/warning.png)

By running the application as is, at minimum you got a taste of one of Temporal's amazing value propositions: visibility into the Workflow and the status of the Workers executing the code. Let's explore another key value proposition, maintaining the state of a Workflow, by simulating some failures. Make sure your Worker is stopped before proceeding.

### Server crash

In most modern application environments, to accommodate a host failure, leader election processes are applied to multiple application instances which are backed by databases that maintain the application state and so on. With Temporal, even if the Temporal server is down, the state of the Workflow is preserved. You can easily test this by following these steps (again, make sure your Worker is stopped so your Workflow doesn't finish):

1. Start the Workflow again.
2. Verify the Workflow is running in the UI.
3. Shut down the Temporal server by either using 'Ctrl c' or via the Docker dashboard.
4. After it has stopped, restart the Temporal server and visit the UI.

The Workflow is still there!

### Activity error

Next let's simulate a bug in the Activity method. Inside your project find the AccountActivityImpl.java file and uncomment the line that throws an exception in the deposit method:

<!--SNIPSTART money-transfer-project-template-java-activity-implementation-->
<!--SNIPEND-->

Save it and run the Workflow and the Worker. The Worker executed the Workflow, and completes the `withdraw()` Activity. But then the exception is thrown when it attempts the `deposit()` Activity. Notice how the Worker keeps retrying the Activity? Visit the [UI](localhost:8088) and click on the RunId of the Workflow. You will see the pending Activity listed there with details such as its state, the number of times it has been attempted, and the next scheduled attempt.

![Activity UI error details](/img/docs/web-ui-activity-error-info.png)

[Timeout configurations](/docs/activities/#timeouts) and [retry policies](/docs/activities/#retries) for Activities are specified in the Workflow code as Activity options. This is another key value proposition that Temporal offers, as other modern applications implement timeout and retry logic within the business process itself. In our Workflow code you can see that we have specified a setStartToCloseTimeout for our Activities, and set a retry policy that tells the server to retry them indefinitely. But we did that as an example for this tutorial, as Temporal automatically uses a default retry policy if one isn't specified!

So, your Workflow is running, but only the `withdraw()` Activity succeeded. In any other application, the whole process would likely have to be abandoned and rolled back. But with Temporal, we can test the durable state of the Workflow again by stopping either the Temporal server, the Worker, or both and then starting them back up again. The Workflow will be in the same state!

Now, pretend that you have a fix for the issue and you have commented the exception and saved the file. How do we deploy it to a process that is halfway complete? With Temporal, it is actually very simple: just restart the Worker!

On the next scheduled attempt, the Worker will successfully execute the `deposit()` Activity and complete the Workflow. You have just fixed a bug "on the fly" with out losing the state of the Workflow.

## Lore check &nbsp;&nbsp; ![](/img/docs/wisdom.png)

Great work! In this tutorial we covered practicalities of running a Temporal Workflow, code implementation, and concepts. Let's do a quick review to make sure you remember some of the more important pieces.

![One](/img/docs/one.png) &nbsp;&nbsp; **What are three of Temporal's value propositions that we touched on in this tutorial?**

1. Temporal gives you full visibility in the state of your Workflow and code execution.
2. Temporal maintains the state of your Workflow, even through server outages and errors.
3. Temporal makes it easy to timeout and retry Activity code using options that exist outside of your business logic.

![Two](/img/docs/two.png) &nbsp;&nbsp; **How do you pair up Workflow code with a Worker that executes it?**

Use the same Task Queue.

![Three](/img/docs/three.png) &nbsp;&nbsp; **What do you have to do if you make changes to Activity code for a Workflow that is running?**

Restart the Worker.
