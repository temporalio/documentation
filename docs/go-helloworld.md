---
id: go-helloworld
title: Go SDK "Hello World!" tutorial
sidebar_label: Go hello world
---

This tutorial is aimed at developers who are new to Temporal, beginner Go programmers, or both. It will teach you how to build a simple "Hello World!" Temporal Workflow application using the [Tempora Go SDK]() as well as a few basics, such as:

- How to set up your development environment and its dependencies.
- How to define an [Activity](/docs/activities) and a [Workflow](/docs/workflows).
- How to create and execute a Worker program and a Workflow starter program.
- Where to view Workflow details.

## Prerequisites

Make sure you have tutorial [prerequisites](/docs/go-sdk-tutorial-prerequisites) set up.

## Project setup

Inside of "/temporal-go-tutorials/" create a new directory for this tutorial:

```
mkdir helloworld
cd helloworld
```

Next, initialize the use of [Go modules](https://blog.golang.org/using-go-modules) in your project. Make sure to replace {your-username} with your actual username:

```
go mod init github.com/{your-username}/temporal-go-tutorials/helloworld
```

`github.com/{your-username}/temporal-go-tutorials/helloworld` is the name of your Go module which you will use later on.

Add the Temporal Go SDK as a dependency:

```
go get -u go.temporal.io/sdk
```

You should now have the following files in your project:

- go.mod
- go.sum

## Build "Hello World!" app

Now we are ready to create our Temporal Workflow app. The following code snippets are from the [temporalio/go-samples](https://github.com/temporalio/go-samples/tree/master/helloworld) repository and can be copied and pasted directly into your Java files.

### Activity

First, let's define our Activity. In your project directory create the file "activity.go":

```
touch activity.go
```

Copy the following code and paste it into activity.go:

<!--SNIPSTART go-helloworld-sample-activity-->
<!--SNIPEND-->

Activities are meant to handle non-deterministic code that could result in unexpected results or errors. For this tutorial all we are doing is taking a string, appending it to "Hello", and returning it back to the Workflow.

### Workflow

In your project directory create the file "workflow.go":

```
touch workflow.go
```

Copy the following code and paste it into workflow.go:

<!--SNIPSTART go-helloworld-sample-workflow-->
<!--SNIPEND-->

As you can see in the code above, a Workflow is simply a function that organizes the sequence of Activity executions. Opposed to an Activity, a Workflow is deterministic in nature. It is where you can specify Activity options, such as what to do if the Activity results in an error or when to time out the Activity execution. Since our Activity is just formatting strings we will only specify the required timeout. We have also explicitly defined the name of the Task Queue to which the Workflow and Activity Tasks will be sent. This is important because the Worker will register itself to listen to the same Task Queue.

### Starter

There are two ways to start a Workflow, either via the CLI or via a starter program. In this tutorial we will start our Workflow by invoking it with a starter program.

In your project directory create a new directory called "starter" and add a new file to it called "main.go":

```
mkdir starter
touch starter/main.go
```

Copy the following code and paste it into starter/main.go, making sure to replace the import path `"github.com/temporalio/temporal-go-samples/helloworld"` with your Go module import path:

<!--SNIPSTART go-helloworld-sample-workflow-starter-->
<!--SNIPEND-->

In the code above, we are creating a Temporal client and using it to host the Workflow with the Temporal server. Said another way, this starter program is sending the Workflow to the Temporal server where it will be broken into Tasks. The Tasks will be sent to the Task Queue that we supplied in the Workflow options.

### Worker

A Worker is the process that will actually execute the Workflow and Activity functions as Tasks.

In your project directory create a new directory called "worker" and add a new file to it called "main.go".

```
mkdir worker
touch worker/main.go
```

Copy the following code and paste it into main.go, making sure to replace the import path `"github.com/temporalio/temporal-go-samples/helloworld"` with your Go module import path:

<!--SNIPSTART go-helloworld-sample-worker-->
<!--SNIPEND-->

In this function we are creating a Temporal client and using it to create a new Worker. The Worker is registered to handle the HellowWorldWorkflow and HelloWorldActivity functions and is configured to listen to the same Task Queue that the Workflow and Activity Tasks are sent to.

## Run "Hello World!" app

At this stage you should have the Temporal server running in a terminal, have the [Temporal Web UI](localhost:8088) open in your browser, and have a project directory that looks like this:

```
/temporal-helloworld/
  - starter/
    - main.go
  - worker/
    - main.go
  - workflow.go
  - activity.go
  - go.mod
  - go.sum
```

In another terminal window navigate into your project directory and run starter/main.go:

```
go run starter/main.go
```

To verify that the Workflow is running, visit the Web UI in your browser and click on the "Workflows" tab. You will see your Workflow listed there with a "running" status. Click on the RunID to see additional details, such as the payload that is being provided to it.

To actually execute the Workflow and Activity functions, we need to run the Worker. The Worker, once running, will immediately start polling the Task Queue for Tasks. Since we only have one Workflow with one Activity, then the Worker will pick these up in their respective order and actually execute the functions, returning the output to the Workflow starter process.

In another terminal window navigate into your project directory and run worker/main.go:

```
go run worker/main.go
```

You will see the Worker log each step it is taking. Since our Workflow is very simple it will finish executing the Workflow and Activity Tasks in less than a second. The result of the Workflow will be returned to the starter function where you will then see "Hello World!" printed to the starter program console.

Congratulations you have successfully run a Temporal Workflow!

## Lore check

Let's see what you have learned.

#### Q: Which function type is meant to handle non-deterministic (error prone) code?

A: Activities are functions that are meant to handle non-deterministic code such as handling API calls.

#### Q: Which function type organizes the execution of non-deterministic code?

A: Workflows are functions that organize the execution of Activities, and where you can specify timeout and retry policies for them.

#### Q: What needs to be done in code to pair Activity and Workflow Tasks with a Worker?

A: Provide the same Task Queue name to the Activity, Workflow, and Worker. The Worker must also be registered to handle the specific Activity and Workflow.

#### Q: How can you view the details of a Workflow that has not yet completed?

A: One way is to open the Temporal Web UI and click on the RunID of the Workflow.
