---
id: java-hello-world
title: Build a Temporal "Hello World!" app from scratch
sidebar_label: Build "Hello World!" app
tags: helloworld, java, sdk, intellij, gradle, tutorial
---

Your taking the next step in your journey to building better apps!

This tutorial is aimed at developers who are relatively new to [Temporal](/docs/overview) and have some basic knowledge of Java. It will take most developers 15-20 minutes to complete. By following this tutorial you will learn how to build a simple "Hello World!" Temporal Workflow application from scratch using the [Temporal Java SDK](https://github.com/temporalio/sdk-java) and [Gradle](https://gradle.org/).

<img class="docs-image-centered" src={require('../static/img/docs/hello.png').default} />

If you are still wondering what Temporal is, we recommend that you follow the tutorial where you [run your first Temporal application] to get a taste of its value propositions.

All of the code in this tutorial is available in the [hello-world-project-template-java](https://github.com/temporalio/hello-world-project-template-java) template repository.

## Prerequisites

Make sure you have the tutorial [prerequisites](/docs/java-sdk-tutorial-prerequisites) setup.

## Scaffold Gradle

First, we need a new project directory. Create one called "hello-world-tutorial", or something similar.

You can scaffold Gradle from the terminal or from within IntelliJ.

**Terminal:**

Change your working directory to the one created for the project and follow Gradle's [Building Java Applications](https://guides.gradle.org/building-java-applications/) guide. When you get to the step where you define your source package, use "helloworldapp".

**IntelliJ**

Open IntelliJ and create a new Gradle project by following Step 1 of the [Getting started with Gradle guide](https://www.jetbrains.com/help/idea/getting-started-with-gradle.html#create_project). When you get to the step where you name the project, use
"helloworldapp" and make sure you choose the "hello-world-tutorial" directory as the project location. It will take a few moments to complete.

## Project dependencies

Once Gradle has finished scaffolding you will need to customize the project dependencies. To do this, open the build.gradle file that is in the root of your project. Add the following lines to the dependencies section while replacing {version} with the most recent version listed on the [Temporal SDK Maven repository page](https://search.maven.org/artifact/io.temporal/temporal-sdk):

<!-- SNIPSTART hello-world-project-template-java-gradle-dependencies -->
<!-- SNIPEND -->

- `com.google.guava:guava` offers a suit of core and expanded libraries that Gradle uses.
- `io.temporal:temporal-sdk` enables communication with the Temporal server.
- `ch.qos.logback:logback-classic` will ensure that there is a logger to bind to within the SDK and prevent a default logger warning message.

A "refresh" icon will appear on the screen, click it to load the changes. Gradle will rebuild with the dependencies.

To limit the logging output from the SDK, within src/main/resources create a logback.xml file and paste in the following XML:

<!--SNIPSTART hello-world-project-template-java-logback-dependency-configuration-->
<!--SNIPEND-->

## The helloworldapp

Now we are ready to build our Temporal Workflow application.

Within src/main/java/helloworldapp create the following files:

- HelloWorldActivity.java
- HelloWorldActivityImpl.java
- HelloWorldWorkflow.java
- HelloWorldWorkflowImpl.java
- HelloWorldStarter.java
- HelloWorldWorker.java

The following code snippets can be copied and pasted directly into your Java files. However, make sure that the first line of each file specifies the package name:

```java
package helloworld;
```

### Activity

First, let's define our Activity. Activities are meant to handle non-deterministic code that could result in unexpected results or errors. But for this tutorial all we are doing is taking a string, appending it to "Hello", and returning it back to the Workflow.

Open HelloWorldActivity.java and define the Activity interface:

<!--SNIPSTART java-hello-world-sample-activity-interface-->
<!--SNIPEND-->

### Workflow

A Workflow is a special function that organizes the sequence of Activity executions. Opposed to an Activity, a Workflow is deterministic in nature. It is where you can specify Activity options, such as what to do if the Activity results in an error or when to time out the Activity execution. Since our Activity is just formatting strings we will only specify the required timeout.

Open HelloWorldWorkflow.java and define the Workflow interface:

<!--SNIPSTART java-hello-world-sample-workflow-interface-->
<!--SNIPEND-->

Open HelloWorldWorkflowImpl.java and define the Workflow:

<!--SNIPSTART java-hello-world-sample-workflow-->
<!--SNIPEND-->

### Starter

There are two ways to start a Workflow, either via the CLI or via a starter program. In this tutorial we will start our Workflow by invoking it with a starter program.

Open HelloWorldStarter.java and paste in the following code:

<!--SNIPSTART java-hello-world-sample-workflow-starter-->
<!--SNIPEND-->

In the code above, we are creating a Temporal client and using it to host the Workflow with the Temporal server. Said another way, this starter program is sending the Workflow to the Temporal server where it will be broken into Tasks. The Tasks will be sent to the Task Queue that we supplied in the Workflow options.

### Worker

A Worker is the process that will actually execute the Workflow and Activity functions as Tasks.

Open HelloWorldWorker.java and paste in the following code:

<!--SNIPSTART java-hello-world-sample-worker-->
<!--SNIPEND-->

In this function we are creating a Temporal client and using it to create a new Worker. The Worker is registered to handle both HellowWorldWorkflow and HelloWorldActivity Tasks and is configured to listen to the same Task Queue that the Workflow and Activity Tasks are sent to.

## Run "Hello World!" app

At this stage you should have the Temporal server running in a terminal, have the [Temporal Web UI](localhost:8088) open in your browser, and have a project package directory that looks like this:

```
src/main/java/helloworld/
  - HelloWorldActivity
  - HelloWorldActivityImpl
  - HelloWorldStarter
  - HelloWorldWorker
  - HelloWorldWorkflow
  - HelloWorldWorkflowImpl
```

Within IntelliJ, right click on HelloWorldStarter and select Run. This will open a terminal inside of IntelliJ which compiles and executes the starter program.

To verify that the Workflow is running, visit the Web UI in your browser and click on the "Workflows" tab. You will see your Workflow listed there with a "running" status. Click on the RunID to see additional details, such as the payload that is being provided to it.

To actually execute the Workflow and Activity functions, we need to run the Worker. The Worker, once running, will immediately start polling the Task Queue for Tasks. Since we only have one Workflow with one Activity, then the Worker will pick these up in their respective order and actually execute the functions, returning the output to the Workflow starter process.

Right click on HelloWorldWorker and select Run. Another terminal will open inside of IntelliJ and you will see the Worker log each step it is taking. Since our Workflow is very simple it will finish executing the Workflow and Activity Tasks very quickly. Switch back to the starter terminal to see "Hello World!" printed to the console.

Congratulations you have successfully run a Temporal Workflow!

## Lore check

Let's see what you have learned.

**Q**: Which function type is meant to handle non-deterministic (error prone) code?

**A**: Activities are functions that are meant to handle non-deterministic code such as handling API calls.

**Q**: Which function type organizes the execution of non-deterministic code?

**A**: Workflows are functions that organize the execution of Activities, and where you can specify timeout and retry policies for them.

**Q**: What needs to be done in code to pair Activity and Workflow Tasks with a Worker?

**A**: Provide the same Task Queue name to the Activity, Workflow, and Worker. The Worker must also be registered to handle the specific Activity and Workflow.

**Q**: How can you view the details of a Workflow that has not yet completed?

**A**: One way is to open the [Temporal Web UI](localhost:8088) and click on the RunID of the Workflow.
