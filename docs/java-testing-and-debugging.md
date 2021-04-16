---
id: java-testing-and-debugging
title: Testing and Debugging
sidebar_label: Testing and Debugging
---

The Temporal Java SDK provides a test framework to facilitate Workflow unit and integration testing.
The test framework provides a `TestWorkflowEnvironment` class which includes an in-memory implementation
of the Temporal service that supports automatic time skipping. This allows you to 
easily test long-running Workflows in seconds, without having to change your Workflow code.

You can use the provided `TestWorkflowEnvironment` with a Java unit testing framework of your choice,
such as JUnit.

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

In addition to writing unit and integration tests, debugging your Workflows is also a very
valuable testing tool. You can debug your Workflow code using a debugger provided 
by your favorite Java IDE.

Note that when debugging your workflow code, the Temporal Java SDK includes deadlock detection
which fails a workflow task in case the code blocks over a second without relinquishing
execution control. Because of this you can often encounter the `PotentialDeadlockException`
exception while stepping through workflow code during debugging.

To alleviate this issue, you can set the `TEMPORAL_DEBUG` environment variable to true before debugging your
workflow code. 
