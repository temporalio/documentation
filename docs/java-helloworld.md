---
id: java-hello-world
title: Build a Temporal "Hello World!" app from scratch
sidebar_label: Build "Hello World!" app
tags: helloworld, java, sdk, intellij, gradle, tutorial
---

You're taking the next step in your journey towards building better apps!

This tutorial is for developers who are relatively new to [Temporal](/docs/overview) and have some basic knowledge of Java. We recommend setting aside ~20 minutes to complete. By following this tutorial you will achieve a few things:

- Learn how to set up a Temporal Java application project.
- Become more familiar with core concepts and the application structure.
- Build and test a simple "Hello World!" Temporal Workflow application from scratch using the [Temporal Java SDK](https://github.com/temporalio/sdk-java) and [Gradle](https://gradle.org/).

<img class="docs-image-centered" src={require('../static/img/docs/hello.png').default} />

This tutorial focuses on the practicalities of building an application from scratch. To better understand *why* you should use Temporal, we recommend that you follow the tutorial where you [run a Temporal money transfer application](/docs/java-run-your-first-app) to get a taste of its value propositions.

All of the code in this tutorial is available in the [hello-world Java template repository](https://github.com/temporalio/hello-world-project-template-java).

## ![](/img/docs/harbor-crane.png) &nbsp;&nbsp; Scaffold Gradle

Before starting, make sure you have looked over the [tutorial prerequisites](/docs/java-sdk-tutorial-prerequisites).

Create a new project directory called "hello-world-tutorial", or something similar.

You can scaffold a new Gradle project from the terminal or from within IntelliJ.

**Terminal:**

Change your working directory to the one created for the project and follow Gradle's [Building Java Applications](https://guides.gradle.org/building-java-applications/) guide. When you get to the step where you define your source package, use "helloworldapp".

**IntelliJ**

Open IntelliJ and create a new Gradle project by following Step 1 of the [Getting started with Gradle guide](https://www.jetbrains.com/help/idea/getting-started-with-gradle.html#create_project). When you get to the step where you name the project, use
"helloworldapp" and make sure you choose the "hello-world-tutorial" directory as the project location. It will take a few moments to complete.

## ![](/img/docs/block.png) &nbsp;&nbsp; Project dependencies

Once Gradle has finished scaffolding you will need to customize the project dependencies. To do this, open the build.gradle file that is in the root of your project and add the following lines to the dependencies section. If you want to try using different versions of dependencies, you can find them on [search.maven.org](https://search.maven.org/) ([Temporal SDK versions](https://search.maven.org/artifact/io.temporal/temporal-sdk)):

<!--SNIPSTART hello-world-project-template-java-gradle-dependencies-->
<!--SNIPEND-->

- `com.google.guava:guava` offers a suit of core and expanded libraries that Gradle uses.
- `io.temporal:temporal-sdk` enables communication with the Temporal server.
- `ch.qos.logback:logback-classic` will ensure that there is a logger to bind to within the SDK and prevent a default logger warning message.

A "refresh" icon will appear on the screen, click it to load the changes. Gradle will rebuild with the dependencies.

To limit the logging output from the SDK, within src/main/resources/ create a logback.xml file and paste in the following XML:

<!--SNIPSTART hello-world-project-template-java-logback-dependency-configuration-->
<!--SNIPEND-->

## ![](/img/docs/apps.png) &nbsp;&nbsp; "Hello World!" app

Now we are ready to build our Temporal Workflow application. Our app will consist of four pieces:

1. An Activity: An Activity is just a function, in this case an object method, that contains your business logic. Ours will simply format some text and return it.
2. A Workflow: Workflows are functions that organize Activity method calls. Our Workflow will have a single entry method which calls the Activity object method.
3. A Worker: Workers host the Activity and Workflow code and execute the code piece by piece.
4. An initiator: To start a Workflow, we must send a signal to the Temporal server that tells it to track the state of the Workflow. We will write a separate function to do this.

All of the files for our application will be created in src/main/java/helloworldapp/. Gradle will have generated a default App.java class in that location. Remove it before proceeding.

### Activity

First, let's define our Activity object and its method. Activities are meant to handle non-deterministic code that could result in unexpected results or errors. But for this tutorial all we are doing is taking a string, appending it to "Hello", and returning it back to the Workflow.

An Activity object is defined like any other object in Java. You need an interface and an implementation. The only difference is that the interface includes Temporal decorators. Let's create a `Format` object with a `composeGreeting()` method.

Create Format.java and add the following interface definition:

<!--SNIPSTART hello-world-project-template-java-activity-interface-->
<!--SNIPEND-->

Create FormatImpl.java and define the implementation of the Format interface:

<!--SNIPSTART hello-world-project-template-java-activity-->
<!--SNIPEND-->

### Workflow

Next is our Workflow. Workflow functions are where you configure and organize the execution of Activity functions. Again, the Workflow object is defined like any other, except the interface includes Temporal decorators. Our Workflow has just a single entry method which calls the `composeGreeting()` Activity method and returns the result.

Create HelloWorldWorkflow.java and define the Workflow interface:

<!--SNIPSTART hello-world-project-template-java-workflow-interface-->
<!--SNIPEND-->

Create HelloWorldWorkflowImpl.java and define the Workflow:

<!--SNIPSTART hello-world-project-template-java-workflow-->
<!--SNIPEND-->

### Task Queue

Task Queues are how the Temporal server supplies information to Workers. When you start a Workflow, you tell the server which Task Queue the Workflow and/or Activities use as an information queue. We will configure our Worker to listen to the same Task Queue that our Workflow and Activities use. Since the Task Queue name is used by multiple things, let's create Shared.java and define our Task Queue name there:

<!--SNIPSTART hello-world-project-template-java-shared-constants-->
<!--SNIPEND-->

### Worker

Our Worker hosts Workflow and Activity functions and executes them one at a time. The Worker is instructed to execute the specific functions via information it gets from the Task Queue, and after execution, it communicates results back to the server.

Create HelloWorldWorker.java and define the Worker:

<!--SNIPSTART hello-world-project-template-java-workflow-initiator-->
<!--SNIPEND-->

### Workflow initiator

There are two ways to start a Workflow, via the Temporal CLI or Temporal SDK. In this tutorial we will use the SDK to start the Workflow which is how most Workflows are started in live environments.

Create InitiateHelloWorld.java and use the SDK to define the start of the Workflow:

<!--SNIPSTART hello-world-project-template-java-workflow-initiator-->
<!--SNIPEND-->

##  ![](/img/docs/check.png) &nbsp;&nbsp; Test the app

Let's add a simple unit test to our application to make sure things are working as expected. Test code lives in src/test/java/helloworldapp. Gradle will have generated a default AppTest.java in that location. Remove that file and replace it with HelloWorldWorkflowTest.java that contains the following code:

<!--SNIPSTART hello-world-project-template-java-workflow-test-->
<!--SNIPEND-->

**Terminal**

From the root of the project, run this command:

```
./gradlew test
```

**IntelliJ**

From within IntelliJ, right click on HelloWorldWorkflowTest and select Run.

Look for "BUILD SUCCESSFUL" in the output to confirm.

## ![](/img/docs/running.png) &nbsp;&nbsp; Run the app

At this stage you should have the Temporal server running in a terminal, have the [Temporal Web UI](localhost:8088) open in your browser, and have a project package directory that looks like this:

```
src/main/java/helloworld/
  - Format
  - FormatImpl
  - InitiateHelloWorld
  - HelloWorldWorker
  - HelloWorldWorkflow
  - HelloWorldWorkflowImpl
```

An optional step is to add tasks to the build.gradle file so that you can run the main methods from the terminal.

<!--SNIPSTART hello-world-project-template-java-gradle-tasks-->
<!--SNIPEND-->

You can start the Workflow and the Worker in any order. If you use the terminal run each command from separate terminal windows.

### Start Worker

**Terminal**

From the project root, run this command:

```
./gradlew startWorker
```

**IntelliJ**

Within IntelliJ, right click on HelloWorldWorker and select Run.

### Start Workflow

**Terminal**

From the project root, run this command:

```
./gradlew sayHello
```

**IntelliJ**

Within IntelliJ, right click on InitiateHelloWorld and select Run.

<img class="docs-image-centered docs-image-max-width-20" src={require('../static/img/docs/confetti.png').default} />

**Congratulations** you have successfully built a Temporal application from scratch!

## ![](/img/docs/wisdom.png) &nbsp;&nbsp; Lore check

Great work! You now know how to build a Temporal Workflow application using the Java SDK and Gradle. Let's do a quick review to make sure you remember some fo the more important pieces.

![One](/img/docs/one.png) &nbsp;&nbsp; **What are the minimum four pieces of a Temporal Workflow application?**

1. An Activity object and method.
2. A Workflow object and method.
3. A Worker to host the Activity and Workflow code.
4. A function to start the Workflow.

![Two](/img/docs/two.png) &nbsp;&nbsp; **How does the Temporal server get information to the Worker?**

It puts information into a Task Queue.

![Three](/img/docs/three.png) &nbsp;&nbsp; **What makes Temporal Activity and Workflow objects different from any other Java object?**

The only difference is the interfaces have Temporal decorators.
