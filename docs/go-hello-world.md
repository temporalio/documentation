---
id: java-hello-world
title: Build a Temporal "Hello World!" app from scratch
sidebar_label: Build "Hello World!" app
tags: helloworld, java, sdk, intellij, gradle, tutorial
---

You're taking the next step in your journey towards building better apps!

This tutorial is for developers who are relatively new to [Temporal](/docs/overview) and have some basic knowledge of Go. We recommend setting aside ~20 minutes to complete. By following this tutorial you will achieve a few things:

- Learn how to set up a Temporal Go application project.
- Become more familiar with core concepts and the application structure.
- Build and test a simple "Hello World!" Temporal Workflow application from scratch using the [Temporal Go SDK](https://github.com/temporalio/sdk-go).

<img class="docs-image-centered" src={require('../static/img/docs/hello.png').default} />

This tutorial focuses on the practicalities of building an application from scratch. To better understand *why* you should use Temporal, we recommend that you follow the tutorial where you [run a Temporal money transfer application](/docs/go-run-your-first-app) to get a taste of its value propositions.

All of the code in this tutorial is available in the [hello-world Go template repository](https://github.com/temporalio/hello-world-project-template-go).

## ![](/img/docs/harbor-crane.png) &nbsp;&nbsp; Scaffold Go project

Before starting, make sure you have looked over the [tutorial prerequisites](/docs/go-sdk-tutorial-prerequisites).

In a terminal, create a new project directory called "hello-world-project", or something similar and cd into it.

From the root of your new project directory, initialize a new Go module:

```
go mod init hello-world-project/app
```

Then, add the Temporal Go SDK as a project dependency:

```
go get go.temporal.io/sdk@latest
```

## ![](/img/docs/apps.png) &nbsp;&nbsp; "Hello World!" app

Now we are ready to build our Temporal Workflow application. Our app will consist of four pieces:

1. An Activity: An Activity is just a function, that contains your business logic. Ours will simply format some text and return it.
2. A Workflow: Workflows are functions that organize Activity method calls. Our Workflow will orchestrate the call of a single Activity function.
3. A Worker: Workers host the Activity and Workflow code and execute the code piece by piece.
4. An initiator: To start a Workflow, we must send a signal to the Temporal server that tells it to track the state of the Workflow. We will write a separate function to do this.

### Activity

First, let's define our Activity function which is just like any other function in Go. Activities are meant to handle non-deterministic code that could result in unexpected results or errors. But for this tutorial all we are doing is taking a string, appending it to "Hello", and returning it back to the Workflow.

Create activity.go and add the following code:

<!--SNIPSTART hello-world-project-template-go-activity-->
<!--SNIPEND-->

### Workflow

Next is our Workflow. Workflow functions are where you configure and organize the execution of Activity functions. Again, the Workflow function is defined like any other Go function. Our Workflow just calls `ComposeGreeting()` and returns the result.

Create workflow.go and add the following code:

<!--SNIPSTART hello-world-project-template-go-workflow-->
<!--SNIPEND-->

### Task Queue

Task Queues are how the Temporal server supplies information to Workers. When you start a Workflow, you tell the server which Task Queue the Workflow and/or Activities use as an information queue. We will configure our Worker to listen to the same Task Queue that our Workflow and Activities use. Since the Task Queue name is used by multiple things, let's create shared.go and define our Task Queue name there:

<!--SNIPSTART hello-world-project-template-go-shared-->
<!--SNIPEND-->

### Worker

Our Worker hosts Workflow and Activity functions and executes them one at a time. The Worker is instructed to execute the specific functions via information it gets from the Task Queue, and after execution, it communicates results back to the server.

Create worker/main.go and add the following code:

<!--SNIPSTART hello-world-project-template-go-worker-->
<!--SNIPEND-->

### Workflow starter

There are two ways to start a Workflow, via the Temporal CLI or Temporal SDK. In this tutorial we use the SDK to start the Workflow which is how most Workflows are started in live environments.

Create start/main.go and add the following code:

<!--SNIPSTART hello-world-project-template-go-start-workflow-->
<!--SNIPEND-->

##  ![](/img/docs/check.png) &nbsp;&nbsp; Test the app

Let's add a simple unit test to our application to make sure things are working as expected. Create workflow_test.go and add the following code:

<!--SNIPSTART hello-world-project-template-go-workflow-test-->
<!--SNIPEND-->

Test the app with this command:

```
go test
```

## ![](/img/docs/running.png) &nbsp;&nbsp; Run the app

At this stage you should have the Temporal server running in a terminal and have a project directory that has the following:

```
hello-world-project/
  - start/main.go
  - worker/main.go
  - activity.go
  - shared.go
  - workflow.go
  - workflow_test.go
```

You can start the Workflow and the Worker in any order, but run each command from separate terminal windows.

To start the Worker run this command from the project root:

```
go run worker/main.go
```

To start the Workflow run this command from the project root:

```
go run start/main.go
```

<img class="docs-image-centered docs-image-max-width-20" src={require('../static/img/docs/confetti.png').default} />

**Congratulations** you have successfully built a Temporal application from scratch!

## ![](/img/docs/wisdom.png) &nbsp;&nbsp; Lore check

Great work! You now know how to build a Temporal Workflow application using the Go SDK. Let's do a quick review to make sure you remember some fo the more important pieces.

![One](/img/docs/one.png) &nbsp;&nbsp; **What are the minimum four pieces of a Temporal Workflow application?**

1. An Activity function.
2. A Workflow function.
3. A Worker to host the Activity and Workflow code.
4. A function to start the Workflow.

![Two](/img/docs/two.png) &nbsp;&nbsp; **How does the Temporal server get information to the Worker?**

It puts information into a Task Queue.

![Three](/img/docs/three.png) &nbsp;&nbsp; **True or false, Temporal Activity and Workflow functions are just normal Go functions?**

True
