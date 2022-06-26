---
id: testing-and-debugging
title: Testing and Debugging
sidebar_label: Testing and Debugging
---

## Overview

The Temporal Java SDK provides a test framework to facilitate Workflow unit and integration testing.
The test framework provides a `TestWorkflowEnvironment` class which includes an in-memory implementation
of the Temporal service that supports automatic time skipping. This allows you to
easily test long-running Workflows in seconds, without having to change your Workflow code.

You can use the provided `TestWorkflowEnvironment` with a Java unit testing framework of your choice,
such as JUnit.

## Setup testing dependency

To start using the Java SDK test framework, you need to add [`io.temporal:temporal-testing`](https://search.maven.org/artifact/io.temporal/temporal-testing)
as a dependency to your project:

**[Apache Maven](https://maven.apache.org/)**:

```maven
<dependency>
    <groupId>io.temporal</groupId>
    <artifactId>temporal-testing</artifactId>
    <version>1.11.0</version>
    <scope>test</scope>
</dependency>
```

**[Gradle Groovy DSL](https://gradle.org/)**:

```groovy
testImplementation ("io.temporal:temporal-testing:1.11.0")
```

Make sure to set the version that matches your dependency version of the [Temporal Java SDK](https://github.com/temporalio/sdk-java).

## Sample unit tests

The following code implements unit tests for the `HelloActivity` sample:

```java
public class HelloActivityTest {

    private TestWorkflowEnvironment testEnv;
    private Worker worker;
    private WorkflowClient client;

    // Set up the test workflow environment
    @Before
    public void setUp() {
        testEnv = TestWorkflowEnvironment.newInstance();
        worker = testEnv.newWorker(TASK_QUEUE);
        // Register your workflow implementations
        worker.registerWorkflowImplementationTypes(GreetingWorkflowImpl.class);

        client = testEnv.getWorkflowClient();
    }

    // Clean up test environment after tests are completed
    @After
    public void tearDown() {
        testEnv.close();
    }

    @Test
    public void testActivityImpl() {
        // This uses the actual activity impl
        worker.registerActivitiesImplementations(new GreetingActivitiesImpl());

        // Start test environment
        testEnv.start();

        // Create the workflow stub
        GreetingWorkflow workflow =
                client.newWorkflowStub(
                        GreetingWorkflow.class, WorkflowOptions.newBuilder().setTaskQueue(TASK_QUEUE).build());

        // Execute our workflow waiting for it to complete
        String greeting = workflow.getGreeting("World");
        assertEquals("Hello World!", greeting);
    }
}
```

In cases where you do not wish to execute your actual Activity implementations during
unit testing, you can use a framework such as Mockito to mock them.

The following code implements a unit test for the `HelloActivity` sample which shows
how activities can be mocked:

```java
public class HelloActivityTest {

    private TestWorkflowEnvironment testEnv;
    private Worker worker;
    private WorkflowClient client;

    // Set up the test workflow environment
    @Before
    public void setUp() {
        testEnv = TestWorkflowEnvironment.newInstance();
        worker = testEnv.newWorker(TASK_QUEUE);
        // Register your workflow implementations
        worker.registerWorkflowImplementationTypes(GreetingWorkflowImpl.class);

        client = testEnv.getWorkflowClient();
    }

    // Clean up test environment after tests are completed
    @After
    public void tearDown() {
        testEnv.close();
    }

    @Test
    public void testMockedActivity() {
        // Mock our workflow activity
        GreetingActivities activities = mock(GreetingActivities.class);
        when(activities.composeGreeting("Hello", "World")).thenReturn("Hello Mocked World!");
        worker.registerActivitiesImplementations(activities);

        // Start test environment
        testEnv.start();

        // Create the workflow stub
        GreetingWorkflow workflow =
                client.newWorkflowStub(
                        GreetingWorkflow.class, WorkflowOptions.newBuilder().setTaskQueue(TASK_QUEUE).build());

        // Execute our workflow waiting for it to complete
        String greeting = workflow.getGreeting("World");
        assertEquals("Hello Mocked World!", greeting);
    }
}
```

## Testing with JUnit4

For Junit4 tests, Temporal provides the TestWorkflowRule class which simplifies the Temporal test environment setup, as well as the
creation and shutdown of Workflow Workers in your tests.

Make sure to set the version that matches your dependency version of the [Temporal Java SDK](https://github.com/temporalio/sdk-java).

We can now rewrite our above mentioned "HelloActivityTest" test class as follows:

```java
public class HelloActivityJUnit4Test {
    @Rule
    public TestWorkflowRule testWorkflowRule =
            TestWorkflowRule.newBuilder()
                    .setWorkflowTypes(GreetingWorkflowImpl.class)
                    .setActivityImplementations(new GreetingActivitiesImpl())
                    .build();

    @Test
    public void testActivityImpl() {
        // Get a workflow stub using the same task queue the worker uses.
        GreetingWorkflow workflow =
                testWorkflowRule
                        .getWorkflowClient()
                        .newWorkflowStub(
                                GreetingWorkflow.class,
                                WorkflowOptions.newBuilder().setTaskQueue(testWorkflowRule.getTaskQueue()).build());
        // Execute a workflow waiting for it to complete.
        String greeting = workflow.getGreeting("World");
        assertEquals("Hello World!", greeting);

        testWorkflowRule.getTestEnvironment().shutdown();
    }
}
```

## Testing with JUnit5

For Junit5 tests, Temporal also provides the TestWorkflowExtension helped class which can be used to simplify the Temporal test environment setup
as well as Workflow Worker startup and shutdowns.

To start using JUnit5 TestWorkflowExtension in your tests with [Gradle](https://gradle.org/), you need to enable capability [`io.temporal:temporal-testing-junit5`]:

Make sure to set the version that matches your dependency version of the [Temporal Java SDK](https://github.com/temporalio/sdk-java).

We can now use JUnit5 and rewrite our above mentioned "HelloActivityTest" test class as follows:

```java
public class HelloActivityJUnit5Test {
    @RegisterExtension
    public static final TestWorkflowExtension testWorkflowExtension =
            TestWorkflowExtension.newBuilder()
                    .setWorkflowTypes(GreetingWorkflowImpl.class)
                    .setActivityImplementations(new GreetingActivitiesImpl())
                    .build();

    @Test
    public void testActivityImpl(
            TestWorkflowEnvironment testEnv, Worker worker, GreetingWorkflow workflow) {
        // Execute a workflow waiting for it to complete.
        String greeting = workflow.getGreeting("World");
        assertEquals("Hello World!", greeting);
    }
}
```

You can find all unit tests for the [Temporal Java samples](https://github.com/temporalio/samples-java) repository in [its test package](https://github.com/temporalio/samples-java/tree/master/src/test/java/io/temporal/samples).

## Debugging

In addition to writing unit and integration tests, debugging your Workflows is also a very
valuable testing tool. You can debug your Workflow code using a debugger provided
by your favorite Java IDE.

Note that when debugging your Workflow code, the Temporal Java SDK includes deadlock detection
which fails a Workflow Task in case the code blocks over a second without relinquishing
execution control. Because of this you can often encounter the `PotentialDeadlockException`
Exception while stepping through Workflow code during debugging.

To alleviate this issue, you can set the `TEMPORAL_DEBUG` environment variable to true before debugging your
Workflow code. Make sure to set `TEMPORAL_DEBUG` to true only during debugging.
