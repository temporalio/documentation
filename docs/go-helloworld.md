---
id: go-helloworld
title: Go SDK "Hello World!" tutorial
sidebar_label: Go hello world
---

By the end of this tutorial you will have a simple "Hello World!" Temporal Workflow running on your local machine. This tutorial is meant for developers who are new to Temporal or who wish to make sure their environment is working.

## Prerequisites

1. Make sure you have [Go](https://golang.org/doc/install) installed.
2. [Install and run the Temporal server](/docs/install-temporal-server) via docker-compose.

## Project set up

Somewhere inside your GOPATH (i.e. go/src/github.com/{your-username}) create a new Temporal tutorial directory:

Start with a new project directory:

```
mkdir temporal-tutorials
cd temporal-turotials
```

Inside of that, create a new directory for the this tutorial:

```
mkdir helloworld
cd helloworld
```

Next, initialize the use of [Go modules](https://blog.golang.org/using-go-modules) in your project. Make sure to replace {your-username} with your actual username:

```
go mod init github.com/{your-username}/temporal-tutorials/helloworld
```

Add the Temporal Go SDK as a dependency:

```
go get -u go.temporal.io/sdk
```

You should now have the following files in your project:

- go.mod
- go.sum

## Hello World! app

Now we are ready to create our Temporal Workflow app.

For this tutorial we will write four functions, each in their own file:

1. Activity function
2. Workflow function
3. Worflow starter function
4. Worker run function

### Activity

In your project directory create the file "activity.go":

```
touch activity.go
```

Copy the following code and paste it into activity.go:

<!--START go-helloworld-sample-activity-->
<!--END-->

Activities are meant to handle business logic, but to keep things simple all we are doing is taking a string (in this case "World"), appending it to "Hello", and returning it back to the Workflow.

### Workflow

In your project directory create the file "workflow.go":

```
touch workflow.go
```

Copy the following code and paste it into workflow.go:

<!--START go-helloworld-sample-workflow-->
<!--END-->

As you can see in the code above, a Workflow is simply a function that utilizes the `go.temporal.io/sdk/workflow` package to create Activity options and call `workflow.ExecuteActivity()`. We have also explicitly defined the name of the Task Queue to which the Workflow and Activity Tasks will be sent. This is important because the Worker will register itself to listen to the same Task Queue.

### Starter

In this tutorial we will start our Workflow by invoking it with some "starter" code.

In your project directory create a new directory called "starter" and add a new file to it called "main.go":

```
mkdir starter
touch starter/main.go
```

Copy the following code and paste it into starter/main.go:

<!--START go-helloworld-sample-workflow-starter-->  
<!--END-->

In the code above, we are creating a Temporal client and using it to let the Temporal system know the Workflow should be executed.

### Worker

A Worker is the process that will actually execute the Workflow and Activity functions.

In your project directory create a new directory called "worker" and add a new file to it called "main.go".

```
mkdir worker
touch worker/main.go
```

Copy the following code and paste it into main.go:

<!--START go-helloworld-sample-worker-->
<!--END-->

In this function we are creating a Temporal client and using it to create a new Worker. The Worker is registered to handle the HellowWorldWorkflow and HelloWorldActivity functions and is configured to listen to the same Task Queue that the Workflow and Activity Tasks are sent to.

## Run Hello World! app

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

You will see the Worker log each step it is taking. Since our Workflow is very simple it will finish executing the Workflow and Activity Tasks in less than a second. The result of the Workflow will be returned to the starter function where you will then see "Hello World!" printed to the console.

## Lore check
