---
id: hello-world-tutorial
title: Build a Temporal "Hello World!" app from scratch
sidebar_label: Build "Hello World!" app
tags: helloworld, java, sdk, intellij, gradle, tutorial
---

<img class="docs-image-centered" src="https://raw.githubusercontent.com/temporalio/documentation-images/main/static/astronaut-hello-java.jpg" />

:::note Tutorial information
- **Level:** ⭐ Temporal beginner
- **Time:** ⏱️ ~20 minutes
- **Goals:** 🙌
  - Learn how to set up, build, and test a Temporal application project from scratch using the [Java SDK](https://github.com/temporalio/java-sdk).
  - Become more familiar with core concepts and the application structure.
:::

## Overview

This tutorial focuses on the practicalities of building an application from scratch. To better understand *why* you should use Temporal, we recommend that you follow the tutorial where you [run a Temporal money transfer application](/docs/java/run-your-first-app-tutorial) to get a taste of its value propositions.

Before starting, make sure you have looked over the [tutorial prerequisites](/docs/java/tutorial-prerequisites).

All of the code in this tutorial is available in the [Java "Hello World!" application template](https://github.com/temporalio/hello-world-project-template-java).

## ![](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/harbor-crane.png) Scaffold Gradle

In a terminal, create a new project directory named "hello-world-project", or something similar and `cd` into it.

We use [Gradle](https://gradle.org/) to build and manage Java projects in these tutorials. You can scaffold a new Gradle project from the terminal or from within IntelliJ.

**Terminal:**

Change your working directory to the one created for the project and follow Gradle's [Building Java Applications](https://guides.gradle.org/building-java-applications/) guide. When you get to the step where you define your source package, use "helloworldapp".

**IntelliJ**

Open IntelliJ and create a new Gradle project by following Step 1 of the [Getting started with Gradle guide](https://www.jetbrains.com/help/idea/getting-started-with-gradle.html#create_project). When you get to the step where you name the project, use
"helloworldapp" and make sure you choose the "hello-world-tutorial" directory as the project location. It will take a few moments to complete.

Once Gradle has finished scaffolding you will need to customize the project dependencies. To do this, open the build.gradle file that is in the root of your project and add the following lines to the dependencies section. If you want to try using different versions of dependencies, you can find them on [search.maven.org](https://search.maven.org/) ([Temporal SDK versions](https://search.maven.org/artifact/io.temporal/temporal-sdk)):

<!--SNIPSTART hello-world-project-template-java-gradle-dependencies-->
[build.gradle](https://github.com/temporalio/hello-world-project-template-java/blob/master/build.gradle)
```gradle
dependencies {
    // Application dependencies
    implementation 'com.google.guava:guava:29.0-jre'
    implementation 'io.temporal:temporal-sdk:1.0.0'
    implementation 'ch.qos.logback:logback-classic:1.2.3'

    // Testing dependencies
    testImplementation 'junit:junit:4.13'
    testImplementation 'org.mockito:mockito-all:1.10.19'
}
```
<!--SNIPEND-->

- `com.google.guava:guava` offers a suit of core and expanded libraries that Gradle uses.
- `io.temporal:temporal-sdk` enables communication with the Temporal server.
- `ch.qos.logback:logback-classic` will ensure that there is a logger to bind to within the SDK and prevent a default logger warning message.

To limit the logging output from the SDK, within src/main/resources/ create a logback.xml file and paste in the following XML:

<!--SNIPSTART hello-world-project-template-java-logback-dependency-configuration-->
[src/main/resources/logback.xml](https://github.com/temporalio/hello-world-project-template-java/blob/master/src/main/resources/logback.xml)
```xml
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <!-- encoders are assigned the type
             ch.qos.logback.classic.encoder.PatternLayoutEncoder by default -->
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    <logger name="io.grpc.netty" level="INFO" />
    <root level="INFO">
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
```
<!--SNIPEND-->

If you are editing the files in IntelliJ, a "refresh" icon will appear on the screen. Click it to load the changes. Gradle will rebuild with the dependencies. Otherwise you can run `./gradlew build` from the root of the project again.

All of the files for our application will be created in src/main/java/helloworldapp/. However, if you have selected Gradle through IntelliJ instead of scaffolding it from the terminal, you may have to create the directory helloworldapp by yourself. If you have scaffolded Gradle through the terminal, Gradle will have generated a default App.java class in that location. Remove it before proceeding.


## ![](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/apps.png) "Hello World!" app

Now we are ready to build our Temporal Workflow application. Our app will consist of four pieces:

1. An Activity: An Activity is just a function that contains your business logic. Ours will simply format some text and return it.
2. A Workflow: Workflows are functions that organize Activity method calls. Our Workflow will orchestrate the call of a single Activity function.
3. A Worker: Workers host the Activity and Workflow code and execute the code piece by piece.
4. An initiator: To start a Workflow, we must send a signal to the Temporal server to tell it to track the state of the Workflow. We'll write a separate function to do this.

### Activity

First, let's define our Activity. Activities are meant to handle non-deterministic code that could result in unexpected results or errors. But for this tutorial all we are doing is taking a string, appending it to "Hello", and returning it back to the Workflow.

An Activity object is defined like any other object in Java. You need an interface and an implementation. The only difference is that the interface includes Temporal decorators. Let's create a `Format` object with a `composeGreeting()` method.

Create Format.java and add the following interface definition:

<!--SNIPSTART hello-world-project-template-java-activity-interface-->
[src/main/java/helloworldapp/Format.java](https://github.com/temporalio/hello-world-project-template-java/blob/master/src/main/java/helloworldapp/Format.java)
```java
package helloworldapp;

import io.temporal.activity.ActivityInterface;
import io.temporal.activity.ActivityMethod;

@ActivityInterface
public interface Format {

    @ActivityMethod
    String composeGreeting(String name);
}
```
<!--SNIPEND-->

Create FormatImpl.java and define the implementation of the Format interface:

<!--SNIPSTART hello-world-project-template-java-activity-->
[src/main/java/helloworldapp/FormatImpl.java](https://github.com/temporalio/hello-world-project-template-java/blob/master/src/main/java/helloworldapp/FormatImpl.java)
```java
package helloworldapp;

public class FormatImpl implements Format {

    @Override
    public String composeGreeting(String name) {
        return "Hello " + name + "!";
    }
}
```
<!--SNIPEND-->

### Workflow

Next is our Workflow. Workflow functions are where you configure and organize the execution of Activity functions. Again, the Workflow object is defined like any other, except the interface includes Temporal decorators. Our Workflow has just a single entry method which calls the `composeGreeting()` Activity method and returns the result.

Create HelloWorldWorkflow.java and define the Workflow interface:

<!--SNIPSTART hello-world-project-template-java-workflow-interface-->
[src/main/java/helloworldapp/HelloWorldWorkflow.java](https://github.com/temporalio/hello-world-project-template-java/blob/master/src/main/java/helloworldapp/HelloWorldWorkflow.java)
```java
package helloworldapp;

import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;

@WorkflowInterface
public interface HelloWorldWorkflow {

    @WorkflowMethod
    String getGreeting(String name);
}
```
<!--SNIPEND-->

Create HelloWorldWorkflowImpl.java and define the Workflow:

<!--SNIPSTART hello-world-project-template-java-workflow-->
[src/main/java/helloworldapp/HelloWorldWorkflowImpl.java](https://github.com/temporalio/hello-world-project-template-java/blob/master/src/main/java/helloworldapp/HelloWorldWorkflowImpl.java)
```java
package helloworldapp;

import io.temporal.activity.ActivityOptions;
import io.temporal.workflow.Workflow;

import java.time.Duration;

public class HelloWorldWorkflowImpl implements HelloWorldWorkflow {

    ActivityOptions options = ActivityOptions.newBuilder()
            .setScheduleToCloseTimeout(Duration.ofSeconds(2))
            .build();

    // ActivityStubs enable calls to Activities as if they are local methods, but actually perform an RPC.
    private final Format format = Workflow.newActivityStub(Format.class, options);

    @Override
    public String getGreeting(String name) {
        // This is the entry point to the Workflow.
        // If there were other Activity methods they would be orchestrated here or from within other Activities.
        return format.composeGreeting(name);
    }
}
```
<!--SNIPEND-->

### Task Queue

[Task Queues](/docs/glossary/#task-queue) are how the Temporal server supplies information to Workers. When you start a Workflow, you tell the server which Task Queue the Workflow and/or Activities use as an information queue. We will configure our Worker to listen to the same Task Queue that our Workflow and Activities use. Since the Task Queue name is used by multiple things, let's create Shared.java and define our Task Queue name there:

<!--SNIPSTART hello-world-project-template-java-shared-constants-->
[src/main/java/helloworldapp/Shared.java](https://github.com/temporalio/hello-world-project-template-java/blob/master/src/main/java/helloworldapp/Shared.java)
```java
package helloworldapp;

public interface Shared {

    String HELLO_WORLD_TASK_QUEUE = "HELLO_WORLD_TASK_QUEUE";
}
```
<!--SNIPEND-->

### Worker

Our [Worker](/docs/glossary/#worker) hosts Workflow and Activity functions and executes them one at a time. The Worker is instructed to execute the specific functions via information it gets from the Task Queue, and after execution, it communicates results back to the server.

Create HelloWorldWorker.java and define the Worker:

<!--SNIPSTART hello-world-project-template-java-worker-->
[src/main/java/helloworldapp/HelloWorldWorker.java](https://github.com/temporalio/hello-world-project-template-java/blob/master/src/main/java/helloworldapp/HelloWorldWorker.java)
```java
package helloworldapp;

import io.temporal.client.WorkflowClient;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.worker.Worker;
import io.temporal.worker.WorkerFactory;

public class HelloWorldWorker {

    public static void main(String[] args) {
        // This gRPC stubs wrapper talks to the local docker instance of the Temporal service.
        WorkflowServiceStubs service = WorkflowServiceStubs.newInstance();
        WorkflowClient client = WorkflowClient.newInstance(service);
        // Create a Worker factory that can be used to create Workers that poll specific Task Queues.
        WorkerFactory factory = WorkerFactory.newInstance(client);
        Worker worker = factory.newWorker(Shared.HELLO_WORLD_TASK_QUEUE);
        // This Worker hosts both Workflow and Activity implementations.
        // Workflows are stateful, so you need to supply a type to create instances.
        worker.registerWorkflowImplementationTypes(HelloWorldWorkflowImpl.class);
        // Activities are stateless and thread safe, so a shared instance is used.
        worker.registerActivitiesImplementations(new FormatImpl());
        // Start polling the Task Queue.
        factory.start();
    }
}
```
<!--SNIPEND-->

### Workflow initiator

There are two ways to start a Workflow, via the Temporal CLI or Temporal SDK. In this tutorial we will use the SDK to start the Workflow which is how most Workflows are started in live environments. Additionally, the call to the Temporal server can be made [synchronously or asynchronously](/docs/java/starting-workflow-executions). Here we do it synchronously, so you will see the caller wait for the result of the Workflow.

Create InitiateHelloWorld.java and use the SDK to define the start of the Workflow:

<!--SNIPSTART hello-world-project-template-java-workflow-initiator-->
[src/main/java/helloworldapp/InitiateHelloWorld.java](https://github.com/temporalio/hello-world-project-template-java/blob/master/src/main/java/helloworldapp/InitiateHelloWorld.java)
```java
package helloworldapp;

import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowOptions;
import io.temporal.serviceclient.WorkflowServiceStubs;

public class InitiateHelloWorld {

    public static void main(String[] args) throws Exception {
        // This gRPC stubs wrapper talks to the local docker instance of the Temporal service.
        WorkflowServiceStubs service = WorkflowServiceStubs.newInstance();
        // WorkflowClient can be used to start, signal, query, cancel, and terminate Workflows.
        WorkflowClient client = WorkflowClient.newInstance(service);
        WorkflowOptions options = WorkflowOptions.newBuilder()
                .setTaskQueue(Shared.HELLO_WORLD_TASK_QUEUE)
                .build();
        // WorkflowStubs enable calls to methods as if the Workflow object is local, but actually perform an RPC.
        HelloWorldWorkflow workflow = client.newWorkflowStub(HelloWorldWorkflow.class, options);
        // Synchronously execute the Workflow and wait for the response.
        String greeting = workflow.getGreeting("World");
        System.out.println(greeting);
        System.exit(0);
    }
}
```
<!--SNIPEND-->

## ![](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/check.png) Test the app

Let's add a simple unit test to our application to make sure things are working as expected. Test code lives in src/test/java/helloworldapp. If you don't see the helloworldapp-directory, go ahead and create it yourself. Gradle might have generated a default AppTest.java in that location. If AppTest.java is there, remove that file. Create a new class HelloWorldWorkflowTest.java that contains the following code:

<!--SNIPSTART hello-world-project-template-java-workflow-test-->
[src/test/java/helloworldapp/HelloWorldWorkflowTest.java](https://github.com/temporalio/hello-world-project-template-java/blob/master/src/test/java/helloworldapp/HelloWorldWorkflowTest.java)
```java
package helloworldapp;

import static org.mockito.Matchers.eq;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;

import io.temporal.client.WorkflowClient;
import io.temporal.client.WorkflowOptions;
import io.temporal.testing.TestWorkflowEnvironment;
import io.temporal.worker.Worker;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

public class HelloWorldWorkflowTest {

    private TestWorkflowEnvironment testEnv;
    private Worker worker;
    private WorkflowClient workflowClient;

    @Before
    public void setUp() {
        testEnv = TestWorkflowEnvironment.newInstance();
        worker = testEnv.newWorker(Shared.HELLO_WORLD_TASK_QUEUE);
        worker.registerWorkflowImplementationTypes(HelloWorldWorkflowImpl.class);
        workflowClient = testEnv.getWorkflowClient();
    }

    @After
    public void tearDown() {
        testEnv.close();
    }

    @Test
    public void testGetGreeting() {
        Format format = mock(Format.class);
        worker.registerActivitiesImplementations(format);
        testEnv.start();
        WorkflowOptions options = WorkflowOptions.newBuilder()
                .setTaskQueue(Shared.HELLO_WORLD_TASK_QUEUE)
                .build();
        HelloWorldWorkflow workflow = workflowClient.newWorkflowStub(HelloWorldWorkflow.class, options);
        workflow.getGreeting("test");
        verify(format).composeGreeting(eq("test"));
    }
}
```
<!--SNIPEND-->

**Terminal**

From the root of the project, run this command:

```
./gradlew test
```

**IntelliJ**

From within IntelliJ, right click on HelloWorldWorkflowTest and select Run.

Look for "BUILD SUCCESSFUL" in the output to confirm.

## ![](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/running.png) Run the app

To run the app we need to start the Workflow and the Worker. You can start them in any order. Make sure you have the [Temporal server](https://docs.temporal.io/docs/server/quick-install) running in a terminal and have the [Temporal Web UI](localhost:8088) open in your browser

If you are using the terminal, add tasks to the build.gradle file so that you can run the main methods from there.

<!--SNIPSTART hello-world-project-template-java-gradle-tasks-->
[build.gradle](https://github.com/temporalio/hello-world-project-template-java/blob/master/build.gradle)
```gradle
task sayHello(type: JavaExec) {
    main = 'helloworldapp.InitiateHelloWorld'
    classpath = sourceSets.main.runtimeClasspath
}

task startWorker(type: JavaExec) {
    main = 'helloworldapp.HelloWorldWorker'
    classpath = sourceSets.main.runtimeClasspath
}
```
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

To start the Workflow fromw Within IntelliJ, right click on InitiateHelloWorld and select Run.

<br/>

<img class="docs-image-centered docs-image-max-width-20" src="https://raw.githubusercontent.com/temporalio/documentation-images/main/static/confetti.png" />

**Congratulations** you have successfully built a Temporal application from scratch!

## ![](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/wisdom.png) Lore check

Great work! You now know how to build a Temporal Workflow application using the Java SDK and Gradle. Let's do a quick review to make sure you remember some fo the more important pieces.

![One](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/one.png) &nbsp;&nbsp; **What are the minimum four pieces of a Temporal Workflow application?**

1. An Activity object and method.
2. A Workflow object and method.
3. A Worker to host the Activity and Workflow code.
4. A function to start the Workflow.

![Two](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/two.png) &nbsp;&nbsp; **How does the Temporal server get information to the Worker?**

It puts information into a Task Queue.

![Three](https://raw.githubusercontent.com/temporalio/documentation-images/main/static/three.png) &nbsp;&nbsp; **What makes Temporal Activity and Workflow objects different from any other Java object?**

The only difference is the interfaces have Temporal decorators.
