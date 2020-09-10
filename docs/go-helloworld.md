---
id: go-helloworld
title: Go SDK hello world tutorial
sidebar_label: Go hello world
---

By the end of this tutorial you will have a simple hello world Temporal Workflow running on your local machine. This tutorial is meant for developers who are new to Temporal or who wish to make sure their environment is working. 

## Prerequisites

1. Make sure you have [Go](https://golang.org/doc/install).
2. [Install and run the Temporal server](/docs/install-temporal-server) via docker-compose.

## Project set up

Start with a new project directory:

```
mkdir temporal-helloworld
cd temporal-helloworld
```

Next, initialize the use of [Go modules](https://blog.golang.org/using-go-modules) in your project. Make sure to replace <your-username> with your actual username:

```
go mod init github.com/<your-username>/temporal-helloworld
```

Add the Temporal Go SDK as a dependency:

```
go get -u go.temporal.io/sdk
```

You should now have the following files in your project:

- go.mod
- go.sum

## Helloworld app

Now we are ready to create our Temporal Workflow app.

For this tutorial we will write four functions:

1. Activity function
2. Workflow function
3. Worflow starter function
4. Worker run function

### Activity

In your project directory create the file activity.go:

```
touch activity.go
```

Copy the following code and put it into activity.go: 

<!--START go-helloworld-sample-activity-->
<!--END-->

Activities are meant to handle business logic, but to keep things simple all we are doing is taking a string (in this case "World"), appending it to "Hello " and returning it back to the Workflow.

### Workflow

In your project directory create the file workflow.go:

```
touch workflow.go
```




