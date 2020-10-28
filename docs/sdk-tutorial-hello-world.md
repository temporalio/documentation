---
id: sdk-tutorial-hello-world
title: Build a Temporal "Hello World!" app from scratch
sidebar_label: Build "Hello World!" app
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<img class="docs-image-centered" src={require('../static/img/docs/astronaut-hello.jpg').default} />

:::note Tutorial information

🎚️ **Level:** Temporal beginner ⏱️ **Time:** ~20 minutes 🙌 &nbsp;**Goals:**

- Learn how to set up, build, and test a Temporal application project from scratch using the SDK of your choice.
  - [Java](https://github.com/temporalio/java-sdk)
  - [Go](https://github.com/temporalio/go-sdk)
- Become more familiar with core concepts and the application structure.

:::

## Overview

This tutorial focuses on the practicalities of building an application from scratch. To better understand *why* you should use Temporal, we recommend that you follow the tutorial where you [run a Temporal money transfer application](/docs/java-run-your-first-app) to get a taste of its value propositions.

Before starting, make sure you have looked over the [tutorial prerequisites](/docs/sdk-tutorial-prerequisites).

All of the code in this tutorial can be found in the project templates:

- [Go "Hello World!" application template](https://github.com/temporalio/hello-world-project-template-go)
- [Java "Hello World!" application template](https://github.com/temporalio/hello-world-project-template-java)

## ![](/img/docs/harbor-crane.png) Scaffold project & add dependencies

In a terminal, create a new project directory named "hello-world-project", or something similar and `cd` into it.

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

From the root of your new project directory, initialize a new Go module. Make sure the module path (i.e. hello-world-project) matches that of the directory in which you creating the module:

```
go mod init hello-world-project/app
```

Then, add the Temporal Go SDK as a project dependency:

```
go get go.temporal.io/sdk@latest
```

</TabItem>
<TabItem value="java">

We use [Gradle](https://gradle.org/) to build and manage Java projects in these tutorials. You can scaffold a new Gradle project from the terminal or from within IntelliJ.

**Terminal:**

Change your working directory to the one created for the project and follow Gradle's [Building Java Applications](https://guides.gradle.org/building-java-applications/) guide. When you get to the step where you define your source package, use "helloworldapp".

**IntelliJ**

Open IntelliJ and create a new Gradle project by following Step 1 of the [Getting started with Gradle guide](https://www.jetbrains.com/help/idea/getting-started-with-gradle.html#create_project). When you get to the step where you name the project, use
"helloworldapp" and make sure you choose the "hello-world-tutorial" directory as the project location. It will take a few moments to complete.

Once Gradle has finished scaffolding you will need to customize the project dependencies. To do this, open the build.gradle file that is in the root of your project and add the following lines to the dependencies section. If you want to try using different versions of dependencies, you can find them on [search.maven.org](https://search.maven.org/) ([Temporal SDK versions](https://search.maven.org/artifact/io.temporal/temporal-sdk)):

<!--SNIPSTART hello-world-project-template-java-gradle-dependencies-->
<!--SNIPEND-->

- `com.google.guava:guava` offers a suit of core and expanded libraries that Gradle uses.
- `io.temporal:temporal-sdk` enables communication with the Temporal server.
- `ch.qos.logback:logback-classic` will ensure that there is a logger to bind to within the SDK and prevent a default logger warning message.

To limit the logging output from the SDK, within src/main/resources/ create a logback.xml file and paste in the following XML:

<!--SNIPSTART hello-world-project-template-java-logback-dependency-configuration-->
<!--SNIPEND-->

If you are editing the files in IntelliJ, a "refresh" icon will appear on the screen, click it to load the changes. Gradle will rebuild with the dependencies. Otherwise you can run `./gradlew build` from the root of the project again.

All of the files for our application will be created in src/main/java/helloworldapp/. Gradle will have generated a default App.java class in that location. Remove it before proceeding.

</TabItem>
</Tabs>

## ![](/img/docs/apps.png) "Hello World!" app

Now we are ready to build our Temporal Workflow application. Our app will consist of four pieces:

1. An Activity: An Activity is just a function that contains your business logic. Ours will simply format some text and return it.
2. A Workflow: Workflows are functions that organize Activity method calls. Our Workflow will orchestrate the call of a single Activity function.
3. A Worker: Workers host the Activity and Workflow code and execute the code piece by piece.
4. An initiator: To start a Workflow, we must send a signal to the Temporal server to tell it to track the state of the Workflow. We'll write a separate function to do this.

### Activity

First, let's define our Activity. Activities are meant to handle non-deterministic code that could result in unexpected results or errors. But for this tutorial all we are doing is taking a string, appending it to "Hello", and returning it back to the Workflow.

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

An Activity function which is just like any other function in Go.

Create activity.go in the project root and add the following code:

<!--SNIPSTART hello-world-project-template-go-activity-->
<!--SNIPEND-->

</TabItem>
<TabItem value="java">

An Activity object is defined like any other object in Java. You need an interface and an implementation. The only difference is that the interface includes Temporal decorators. Let's create a `Format` object with a `composeGreeting()` method.

Create Format.java and add the following interface definition:

<!--SNIPSTART hello-world-project-template-java-activity-interface-->
<!--SNIPEND-->

Create FormatImpl.java and define the implementation of the Format interface:

<!--SNIPSTART hello-world-project-template-java-activity-->
<!--SNIPEND-->

</TabItem>
</Tabs>

### Workflow

Next is our Workflow. Workflow functions are where you configure and organize the execution of Activity functions.

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

Next is our Workflow. Workflow functions are where you configure and organize the execution of Activity functions. Again, the Workflow function is defined like any other Go function. Our Workflow just calls `ComposeGreeting()` and returns the result.

Create workflow.go and add the following code:

<!--SNIPSTART hello-world-project-template-go-workflow-->
<!--SNIPEND-->

</TabItem>
<TabItem value="java">

Again, the Workflow object is defined like any other, except the interface includes Temporal decorators. Our Workflow has just a single entry method which calls the `composeGreeting()` Activity method and returns the result.

Create HelloWorldWorkflow.java and define the Workflow interface:

<!--SNIPSTART hello-world-project-template-java-workflow-interface-->
<!--SNIPEND-->

Create HelloWorldWorkflowImpl.java and define the Workflow:

<!--SNIPSTART hello-world-project-template-java-workflow-->
<!--SNIPEND-->

</TabItem>
</Tabs>

### Task Queue

Task Queues are how the Temporal server supplies information to Workers. When you start a Workflow, you tell the server which Task Queue the Workflow and/or Activities use as an information queue. We will configure our Worker to listen to the same Task Queue that our Workflow and Activities use.

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

Since the Task Queue name is used by multiple things, let's create shared.go and define our Task Queue name there:

<!--SNIPSTART hello-world-project-template-go-shared-->
<!--SNIPEND-->

</TabItem>
<TabItem value="java">

Since the Task Queue name is used by multiple things, let's create Shared.java and define our Task Queue name there:

<!--SNIPSTART hello-world-project-template-java-shared-constants-->
<!--SNIPEND-->

</TabItem>
</Tabs>

### Worker

Our [Worker](/docs/glossary/#worker) hosts Workflow and Activity functions and executes them one at a time. The Worker is instructed to execute the specific functions via information it gets from the Task Queue, and after execution, it communicates results back to the server.

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

Create worker/main.go and add the following code:

<!--SNIPSTART hello-world-project-template-go-worker-->
<!--SNIPEND-->

</TabItem>
<TabItem value="java">

Create HelloWorldWorker.java and define the Worker:

<!--SNIPSTART hello-world-project-template-java-worker-->
<!--SNIPEND-->

</TabItem>
</Tabs>

### Workflow initiator

There are two ways to start a Workflow, via the Temporal CLI or the Temporal SDK. In this tutorial we will use the SDK to start the Workflow which is how most Workflows get started in live environments. Additionally, the call to the Temporal server can be done [synchronously or asynchronously](/docs/sdk-tutorial-sync-vs-async-start). Here we do it synchronously, so you will see the start process wait for the result of the Workflow.

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

Create start/main.go and add the following code:

<!--SNIPSTART hello-world-project-template-go-start-workflow-->
<!--SNIPEND-->

</TabItem>
<TabItem value="java">

Create InitiateHelloWorld.java and add the following code:

<!--SNIPSTART hello-world-project-template-java-workflow-initiator-->
<!--SNIPEND-->

</TabItem>
</Tabs>

##  ![](/img/docs/check.png) Test the app

Let's add a simple unit test to our application to make sure things are working as expected.

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

Let's add a simple unit test to our application to make sure things are working as expected. Create workflow_test.go in the project root and add the following code:

<!--SNIPSTART hello-world-project-template-go-workflow-test-->
<!--SNIPEND-->

Run this command from the project root to execute the unit tests:

```
go test
```

</TabItem>
<TabItem value="java">

Test code lives in src/test/java/helloworldapp. Gradle will have generated a default AppTest.java in that location. Remove that file and replace it with HelloWorldWorkflowTest.java that contains the following code:

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

</TabItem>
</Tabs>

## ![](/img/docs/running.png) Run the app

To run the app we need to start the Workflow and the Worker. You can start them in any order. Make sure you have the Temporal server running in a terminal and have the [Temporal Web UI](localhost:8088) open in your browser.

<Tabs
  defaultValue="go"
  groupId="codePreference"
  values={[
    { label: 'Go', value: 'go', },
    { label: 'Java', value: 'java', },
  ]
}>
<TabItem value="go">

To start the Worker, run this command from the project root:

```
go run worker/main.go
```

To start the Workflow, run this command from the project root:

```
go run start/main.go
```

</TabItem>
<TabItem value="java">

If you are using the terminal, add tasks to the build.gradle file so that you can run the main methods from there.

<!--SNIPSTART hello-world-project-template-java-gradle-tasks-->
<!--SNIPEND-->

**Terminal**

To start the Worker, run this command from the project root:

```
./gradlew startWorker
```

To start the Workflow, run this command from the project root:

```
./gradlew sayHello
```

**IntelliJ**

To start the Worker from within IntelliJ, right click on HelloWorldWorker and select Run.

To start the Workflow fromwWithin IntelliJ, right click on InitiateHelloWorld and select Run.

</TabItem>
</Tabs>

<br/>

<img class="docs-image-centered docs-image-max-width-20" src={require('../static/img/docs/confetti.png').default} />

**Congratulations** you have successfully built a Temporal application from scratch!

## ![](/img/docs/wisdom.png) Lore check

Great work! You now know how to build a Temporal Workflow application from scratch. Let's do a quick review to make sure you remember some fo the more important pieces.

![One](/img/docs/one.png) &nbsp;&nbsp; **What are the four pieces of a Temporal Workflow application that we built?**

1. An Activity function.
2. A Workflow function.
3. A Worker to host the Activity and Workflow code.
4. A function to start the Workflow.

![Two](/img/docs/two.png) &nbsp;&nbsp; **How does the Temporal server get information to the Worker?**

It puts information into a Task Queue.

![Three](/img/docs/three.png) &nbsp;&nbsp; **What makes Temporal Activity and Workflow functions different from any other function in language of the SDK?**

Nothing, they are defined like any other function.
