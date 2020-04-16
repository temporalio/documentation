---
id: java-quick-start
title: Quick Start
---

This topic helps you install the Temporal server and implement a workflow.

## Install Temporal Server Locally
To run samples locally you need to run Temporal server locally using [instructions](installing-server.md). 

## Implement Hello World Java Workflow

### Include Temporal Java SDK Dependency

Go to the [Maven Repository Temporal Java Client Page](https://oss.sonatype.org/service/local/repositories/snapshots/content/io/temporal/temporal-sdk/0.10.0-SNAPSHOT/)
and find the latest version of the library. Include it as a dependency into your Java project. For example if you
are using Gradle the dependency looks like:
```
    compile group: 'io.temporal', name: 'temporal-sdk', version: '<latest_version>'
```
Also add the following dependencies that temporal-sdk relies on:
```
    compile group: 'commons-configuration', name: 'commons-configuration', version: '1.9'
    compile group: 'ch.qos.logback', name: 'logback-classic', version: '1.2.3'
```
Make sure that the following code compiles:
```java
import io.temporal.workflow.Workflow;
import io.temporal.workflow.WorkflowMethod;
import org.slf4j.Logger;

public class GettingStarted {

    private static Logger logger = Workflow.getLogger(GettingStarted.class);
    
    @WorkflowInterface
    interface HelloWorld {
        @WorkflowMethod
        void sayHello(String name);
    }

}
```
If you are having problems setting up the build files use the
[Temporal Java Samples](https://github.com/temporalio/temporal-java-samples) GitHub repository as a reference.

Also add the following logback config file somewhere in your classpath:
```xml
<configuration>
    <appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <!-- encoders are assigned the type
             ch.qos.logback.classic.encoder.PatternLayoutEncoder by default -->
        <encoder>
            <pattern>%d{HH:mm:ss.SSS} [%thread] %-5level %logger{36} - %msg%n</pattern>
        </encoder>
    </appender>
    <logger name="io.netty" level="INFO"/>
    <root level="INFO">
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
```

### Implement Hello World Workflow

Let's add `HelloWorldImpl` with the `sayHello` method that just logs the "Hello ..." and returns.
```java
import io.temporal.worker.Worker;
import io.temporal.workflow.Workflow;
import io.temporal.workflow.WorkflowMethod;
import org.slf4j.Logger;

public class GettingStarted {

    private static Logger logger = Workflow.getLogger(GettingStarted.class);

    @WorkflowInterface
    public interface HelloWorld {
        @WorkflowMethod
        void sayHello(String name);
    }

    public static class HelloWorldImpl implements HelloWorld {

        @Override
        public void sayHello(String name) {
            logger.info("Hello " + name + "!");
        }
    }
}
```
To link the workflow implementation to the Temporal framework, it should be registered with a worker that connects to
a Temporal Service. By default the worker connects to the locally running Temporal service.
```java
    public static void main(String[] args) {
        // gRPC stubs wrapper that talks to the local docker instance of temporal service.
        WorkflowServiceStubs service = WorkflowServiceStubs.newInstance();
        // client that can be used to start and signal workflows
        WorkflowClient client = WorkflowClient.newInstance(service);
        // worker factory that can be used to create workers for specific task lists
        WorkerFactory factory = WorkerFactory.newInstance(client);
        Worker worker = factory.newWorker("HelloWorldTaskList");
        worker.registerWorkflowImplementationTypes(HelloWorldImpl.class);
        factory.start();
    }
```
### Execute Hello World Workflow using the CLI

Now run the worker program. Following is an example log:
```text
18:39:45.522 [main] INFO  i.t.i.WorkflowServiceStubsImpl - Created GRPC client for channel: ManagedChannelOrphanWrapper{delegate=ManagedChannelImpl{logId=1, target=127.0.0.1:7233}}
18:39:45.674 [main] INFO  io.temporal.internal.worker.Poller - start(): Poller{options=PollerOptions{maximumPollRateIntervalMilliseconds=1000, maximumPollRatePerSecond=0.0, pollBackoffCoefficient=2.0, pollBackoffInitialInterval=PT0.1S, pollBackoffMaximumInterval=PT1M, pollThreadCount=1, pollThreadNamePrefix='Workflow Poller taskList="HelloWorldTaskList", namespace="default"'}, identity=unknown-mac}
18:39:45.676 [main] INFO  io.temporal.internal.worker.Poller - start(): Poller{options=PollerOptions{maximumPollRateIntervalMilliseconds=1000, maximumPollRatePerSecond=0.0, pollBackoffCoefficient=2.0, pollBackoffInitialInterval=PT0.1S, pollBackoffMaximumInterval=PT1M, pollThreadCount=1, pollThreadNamePrefix='null'}, identity=95963a78-641d-434b-841e-a2efe7f8a19f}
```
No Hello printed. This is expected because a worker is just a workflow code host. The workflow has to be started to execute. Let's use Temporal CLI to start the workflow:
```bash
> docker run --network=host --rm temporalio/tctl:0.21.1 workflow start --tasklist HelloWorldTaskList --workflow_type HelloWorld_sayHello --execution_timeout 3600 --input \"World\"
Started Workflow Id: ef8c6cd6-de62-4481-8398-623865467696, run Id: 26eafcde-6cab-4836-9ad4-888a74e172e1
```
The last line of output of the program should now be:
```
18:40:28.354 [workflow-1029765531] INFO  main - Hello World!
```
Let's start another workflow execution:
```bash
> docker run --network=host --rm temporalio/tctl:0.21.1 workflow start --tasklist HelloWorldTaskList --workflow_type HelloWorld_sayHello --execution_timeout 3600 --input \"Temporal\"
Started Workflow Id: 7bdfba1d-b3f4-4665-88c2-cec73301dd52, run Id: d6c99e2d-7d76-458f-956b-a2f72af292bf
```
The last two lines of output of the program should now be:
```text
18:40:28.354 [workflow-1029765531] INFO  main - Hello World!
18:40:51.678 [workflow-1538256693] INFO  main - Hello Temporal!
```
### List Workflows and Workflow History

Let's list our workflows in the CLI:
```bash
> docker run --network=host --rm temporalio/tctl:0.21.1 workflow list
     WORKFLOW TYPE    |             WORKFLOW ID              |                RUN ID                | START TIME | EXECUTION TIME | END TIME
  HelloWorld_sayHello | 7bdfba1d-b3f4-4665-88c2-cec73301dd52 | d6c99e2d-7d76-458f-956b-a2f72af292bf | 01:40:51   | 01:40:51       | 01:40:51
  HelloWorld_sayHello | ef8c6cd6-de62-4481-8398-623865467696 | 26eafcde-6cab-4836-9ad4-888a74e172e1 | 01:40:28   | 01:40:28       | 01:40:28
```
Now let's look at the workflow execution history:
```bash
> docker run --network=host --rm temporalio/tctl:0.21.1 workflow showid 1965109f-607f-4b14-a5f2-24399a7b8fa7
  1  EventTypeWorkflowExecutionStarted    {WorkflowType:{Name:HelloWorld_sayHello},
                                           ParentInitiatedEventId:0, TaskList:{Name:HelloWorldTaskList,
                                           Kind:TaskListKindNormal}, Input:["Temporal"],
                                           ExecutionStartToCloseTimeoutSeconds:3600,
                                           TaskStartToCloseTimeoutSeconds:10,
                                           Initiator:ContinueAsNewInitiatorDecider,
                                           ContinuedFailureDetails:[], LastCompletionResult:[],
                                           OriginalExecutionRunId:d6c99e2d-7d76-458f-956b-a2f72af292bf,
                                           Identity:tctl@docker-desktop,
                                           FirstExecutionRunId:d6c99e2d-7d76-458f-956b-a2f72af292bf,
                                           Attempt:0, ExpirationTimestamp:0,
                                           FirstDecisionTaskBackoffSeconds:0}
  2  EventTypeDecisionTaskScheduled       {TaskList:{Name:HelloWorldTaskList,
                                           Kind:TaskListKindNormal},
                                           StartToCloseTimeoutSeconds:10,
                                           Attempt:0}
  3  EventTypeDecisionTaskStarted         {ScheduledEventId:2, Identity:unknown-mac,
                                           RequestId:1ef618db-a3ec-45c3-b545-aea5ae5d36fb}
  4  EventTypeDecisionTaskCompleted       {ExecutionContext:[],
                                           ScheduledEventId:2,
                                           StartedEventId:3,
                                           Identity:unknown-mac}
  5  EventTypeWorkflowExecutionCompleted  {Result:[],
                                           DecisionTaskCompletedEventId:4}
```
Even for such a trivial workflow, the history gives a lot of useful information. For complex workflows this is a really useful tool for production and development troubleshooting. History can be automatically archived to a long-term blob store (for example Amazon S3) upon workflow completion for compliance, analytical, and troubleshooting purposes.

### Workflow Id Uniqueness

Before proceeding to a more complex workflow implementation, let's take a look at the workflow Id semantic.
When starting a workflow without providing an Id, the client generates one in the form of a UUID. In most real-life scenarios this is not a desired behavior. The business Id should be used instead. Here, we'll specify the Id when starting a workflow:
```bash
> docker run --network=host --rm temporalio/tctl:0.21.1 workflow start  --workflow_id "HelloTemporal1" --tasklist HelloWorldTaskList --workflow_type HelloWorld_sayHello --execution_timeout 3600 --input \"Temporal\"
Started Workflow Id: HelloTemporal1, run Id: 78ca0a3f-8cd2-46a2-8d23-076c3f0f187c
```
Now the list operation is more meaningful as the WORKFLOW ID is our business Id:
```bash
> docker run --network=host --rm temporalio/tctl:0.21.1 workflow list
     WORKFLOW TYPE    |      WORKFLOW ID      |                RUN ID                | START TIME | EXECUTION TIME | END TIME
  HelloWorld_sayHello | HelloTemporal1        | 78ca0a3f-8cd2-46a2-8d23-076c3f0f187c | 01:47:24   | 01:47:24       | 01:47:25
```
After the previous one completes, let's try to start another workflow with the same Id:
```bash
> docker run --network=host --rm temporalio/tctl:0.21.1 workflow start  --workflow_id "HelloTemporal1" --tasklist HelloWorldTaskList --workflow_type HelloWorld_sayHello --execution_timeout 3600 --input \"Temporal\"
Started Workflow Id: HelloTemporal1, run Id: 9b5e36a3-9868-4de5-bbdf-eda9cedcd865
```
After the second start the workflow list is:
```bash
     WORKFLOW TYPE     |      WORKFLOW ID     |                RUN ID                | START TIME | EXECUTION TIME | END TIME
  HelloWorld_sayHello | HelloTemporal1        | 37a740e5-838c-4020-aed6-1111b0689c38 | 21:11:47   | 21:11:47       | 21:11:47
  HelloWorld_sayHello | HelloTemporal1        | 75170c60-6d72-48c6-b509-7c9d9f25a8a8 | 21:04:46   | 21:04:46       | 21:04:46
```
It might be clear why every workflow has two Ids: Workflow Id and Run Id. Because the Workflow Id can be reused, the Run Id uniquely identifies a particular run of a workflow. Run Id is system generated and cannot be controlled by client code.

Note - Under no circumstances does Temporal allow more than one instance of an open workflow with the same Id. Multiple workflow Ids are required in the case that paralell invocations wish to be supported (such as an Actor patern)

### CLI Help

See the CLI help command for all of the options supported:
```bash
> docker run --network=host --rm temporalio/tctl:0.21.1 workflow help start
NAME:
   tctl workflow start - start a new workflow execution

USAGE:
   tctl workflow start [command options] [arguments...]

OPTIONS:
   --tasklist value, --tl value                TaskList
   --workflow_id value, --wid value, -w value  WorkflowId
   --workflow_type value, --wt value           WorkflowTypeName
   --execution_timeout value, --et value       Execution start to close timeout in seconds (default: 0)
   --decision_timeout value, --dt value        Decision task start to close timeout in seconds (default: 10)
   --cron value                                Optional cron schedule for the workflow. Cron spec is as following:
                                               ┌───────────── minute (0 - 59)
                                               │ ┌───────────── hour (0 - 23)
                                               │ │ ┌───────────── day of the month (1 - 31)
                                               │ │ │ ┌───────────── month (1 - 12)
                                               │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
                                               │ │ │ │ │
                                               * * * * *
   --workflowidreusepolicy value, --wrp value  Optional input to configure if the same workflow Id is allowed to be used for a new workflow execution. Available options: 0: AllowDuplicate, 1: AllowDuplicateFailedOnly, 2: RejectDuplicate (default: 0)
   --input value, -i value                     Optional input for the workflow, in JSON format. If there are multiple parameters, concatenate them and separate by a space.
   --input_file value, --if value              Optional input for the workflow from a JSON file. If there are multiple JSON, concatenate them and separate by a space or newline. Input from the file will be overwritten by input from the command line.
   --memo_key value                            Optional key of memo. If there are multiple keys, concatenate them and separate by space.
   --memo value                                Optional info that can be shown in list workflow, in JSON format. If there are multiple JSON, concatenate them and separate by a space. The order must be the same as memo_key.
   --memo_file value                           Optional info that can be listed in list workflow, from JSON format file. If there are multiple JSON, concatenate them and separate by a space or newline. The order must be same as memo_key.
```
## Signals

So far our workflow is not very interesting. Let's change it to listen on an external event and update state accordingly.
```java
  @WorkflowInterface
  public interface HelloWorld {
    @WorkflowMethod
    void sayHello(String name);

    @SignalMethod
    void updateGreeting(String greeting);
  }

  public static class HelloWorldImpl implements HelloWorld {

    private String greeting = "Hello";

    @Override
    public void sayHello(String name) {
      int count = 0;
      while (!"Bye".equals(greeting)) {
        logger.info(++count + ": " + greeting + " " + name + "!");
        String oldGreeting = greeting;
        Workflow.await(() -> !Objects.equals(greeting, oldGreeting));
      }
      logger.info(++count + ": " + greeting + " " + name + "!");
    }

    @Override
    public void updateGreeting(String greeting) {
      this.greeting = greeting;
    }
  }
```
The workflow interface now has a new method annotated with @SignalMethod. It is a callback method that is invoked
every time a new signal of "HelloWorld_updateGreeting" is delivered to a workflow. The workflow interface can have only
one @WorkflowMethod which is a _main_ function of the workflow and as many signal methods as needed.

The updated workflow implementation demonstrates a few important Temporal concepts. The first is that workflow is stateful and can
have fields of any complex type. Another is that the `Workflow.await` function that blocks until the function it receives as a parameter evaluates to true. The condition is going to be evaluated only on workflow state changes, so it is not a busy wait in traditional sense.
```bash
temporal: docker run --network=host --rm temporalio/tctl:0.21.1 workflow start  --workflow_id "HelloSignal" --tasklist HelloWorldTaskList --workflow_type HelloWorld_sayHello --execution_timeout 3600 --input \"World\"
Started Workflow Id: HelloSignal, run Id: 6fa204cb-f478-469a-9432-78060b83b6cd
```
Program output:
```text
16:53:56.120 [workflow-root] INFO  c.u.c.samples.hello.GettingStarted - 1: Hello World!
```
Let's send a signal using CLI:
```bash
temporal: docker run --network=host --rm temporalio/tctl:0.21.1 workflow signal --workflow_id "HelloSignal" --name "HelloWorld_updateGreeting" --input \"Hi\"
Signal workflow succeeded.
```
Program output:
```text
16:53:56.120 [workflow-root] INFO  c.u.c.samples.hello.GettingStarted - 1: Hello World!
16:54:57.901 [workflow-root] INFO  c.u.c.samples.hello.GettingStarted - 2: Hi World!
```
Try sending the same signal with the same input again. Note that the output doesn't change. This happens because the await condition
doesn't unblock when it sees the same value. But a new greeting unblocks it:
```bash
temporal: docker run --network=host --rm temporalio/tctl:0.21.1 workflow signal --workflow_id "HelloSignal" --name "HelloWorld_updateGreeting" --input \"Welcome\"
Signal workflow succeeded.
```
Program output:
```text
16:53:56.120 [workflow-root] INFO  c.u.c.samples.hello.GettingStarted - 1: Hello World!
16:54:57.901 [workflow-root] INFO  c.u.c.samples.hello.GettingStarted - 2: Hi World!
16:56:24.400 [workflow-root] INFO  c.u.c.samples.hello.GettingStarted - 3: Welcome World!
```
Now shut down the worker and send the same signal again:
```bash
temporal: docker run --network=host --rm temporalio/tctl:0.21.1 workflow signal --workflow_id "HelloSignal" --name "HelloWorld_updateGreeting" --input \"Welcome\"
Signal workflow succeeded.
```
Note that sending signals as well as starting workflows does not need a worker running. The requests are queued inside the Temporal service.

Now bring the worker back. Note that it doesn't log anything besides the standard startup messages.
This occurs because it ignores the queued signal that contains the same input as the current value of greeting.
Note that the restart of the worker didn't affect the workflow execution. It is still blocked on the same line of code as before the failure.
This is the most important feature of Temporal. The workflow code doesn't need to deal with worker failures at all. Its state is fully recovered to its current state that includes all the local variables and threads.

Let's look at the line where the workflow is blocked:
```bash
> docker run --network=host --rm temporalio/tctl:0.21.1 workflow stack --workflow_id "Hello2"
Query result:
"workflow-root: (BLOCKED on await)
io.temporal.internal.sync.SyncDecisionContext.await(SyncDecisionContext.java:546)
io.temporal.internal.sync.WorkflowInternal.await(WorkflowInternal.java:243)
io.temporal.workflow.Workflow.await(Workflow.java:611)
io.temporal.samples.hello.GettingStarted$HelloWorldImpl.sayHello(GettingStarted.java:32)
sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)"
```
Yes, indeed the workflow is blocked on await. This feature works for any open workflow, greatly simplifying troubleshooting in production.
Let's complete the workflow by sending a signal with a "Bye" greeting:

```text
16:58:22.962 [workflow-root] INFO  c.u.c.samples.hello.GettingStarted - 4: Bye World!
```
Note that the value of the count variable was not lost during the restart.

Also note that while a single worker instance is used for this
walkthrough, any real production deployment has multiple worker instances running. So any worker failure or restart does not delay any
workflow execution because it is just migrated to any other available worker.

## Query

So far we have learned that the workflow code is fault tolerant and can update its state in reaction to external events in the form of signals.
Temporal provides a query feature that supports synchronously returning any information from a workflow to an external caller.

Update the workflow code to:
```java
  @WorkflowInterface
  public interface HelloWorld {
    @WorkflowMethod
    void sayHello(String name);

    @SignalMethod
    void updateGreeting(String greeting);

    @QueryMethod
    int getCount();
  }

  public static class HelloWorldImpl implements HelloWorld {

    private String greeting = "Hello";
    private int count = 0;

    @Override
    public void sayHello(String name) {
      while (!"Bye".equals(greeting)) {
        logger.info(++count + ": " + greeting + " " + name + "!");
        String oldGreeting = greeting;
        Workflow.await(() -> !Objects.equals(greeting, oldGreeting));
      }
      logger.info(++count + ": " + greeting + " " + name + "!");
    }

    @Override
    public void updateGreeting(String greeting) {
      this.greeting = greeting;
    }

    @Override
    public int getCount() {
      return count;
    }
  }
```
The new `getCount` method annotated with `@QueryMethod` was added to the workflow interface definition. It is allowed
to have multiple query methods per workflow interface.

The main restriction on the implementation of the query method is that it is not allowed to modify workflow state in any form.
It also is not allowed to block its thread in any way. It usually just returns a value derived from the fields of the workflow object.
Let's run the updated worker and send a couple signals to it:
```bash
temporal: docker run --network=host --rm temporalio/tctl:0.21.1 workflow start  --workflow_id "HelloQuery" --tasklist HelloWorldTaskList --workflow_type HelloWorld_sayHello --execution_timeout 3600 --input \"World\"
Started Workflow Id: HelloQuery, run Id: 1925f668-45b5-4405-8cba-74f7c68c3135
temporal: docker run --network=host --rm temporalio/tctl:0.21.1 workflow signal --workflow_id "HelloQuery" --name "HelloWorld_updateGreeting" --input \"Hi\"
Signal workflow succeeded.
temporal: docker run --network=host --rm temporalio/tctl:0.21.1 workflow signal --workflow_id "HelloQuery" --name "HelloWorld_updateGreeting" --input \"Welcome\"
Signal workflow succeeded.
```
The worker output:
```text
17:35:50.485 [workflow-root] INFO  c.u.c.samples.hello.GettingStarted - 1: Hello World!
17:36:10.483 [workflow-root] INFO  c.u.c.samples.hello.GettingStarted - 2: Hi World!
17:36:16.204 [workflow-root] INFO  c.u.c.samples.hello.GettingStarted - 3: Welcome World!
```
Now let's query the workflow using the CLI:
```bash
temporal: docker run --network=host --rm temporalio/tctl:0.21.1 workflow query --workflow_id "HelloQuery" --query_type "HelloWorld_getCount"
Query result as JSON:
3
```
One limitation of the query is that it requires a worker process running because it is executing callback code.
An interesting feature of the query is that it works for completed workflows as well. Let's complete the workflow by sending "Bye" and query it.
```bash
temporal: docker run --network=host --rm temporalio/tctl:0.21.1 workflow signal --workflow_id "HelloQuery" --name "HelloWorld_updateGreeting" --input \"Bye\"
Signal workflow succeeded.
temporal: docker run --network=host --rm temporalio/tctl:0.21.1 workflow query --workflow_id "HelloQuery" --query_type "HelloWorld_getCount"
Query result as JSON:
4
```
The Query method can accept parameters. This might be useful if only part of the workflow state should be returned.

## Activities

Having fault tolerant code that maintains state, updates it in reaction to external events, and supports querying is already very useful.
But in most practical applications, the workflow is expected to act upon the external world. Temporal supports such externally-facing code in the form of activities.

An activity is essentially a function that can execute any code like DB updates or service calls. The workflow is not allowed to
directly call any external APIs; it can do this only through activities. The workflow is essentially an orchestrator of activities.
Let's change our program to print the greeting from an activity on every change.

First let's define an activities interface and implement it:
```java
  @ActivityInterface
  public interface HelloWorldActivities {
    void say(String message);
  }
```
`@ActivityInterface` annotation is required for an activity interface. Each method that belongs to an activity interface
defines a separate activity type.

Activity implementation is just a normal [POJO](https://en.wikipedia.org/wiki/Plain_old_Java_object).
The `out` stream is passed as a parameter to the constructor to demonstrate that the
activity object can have any dependencies. Examples of real application dependencies are database connections and service clients.
```java
  public class HelloWordActivitiesImpl implements HelloWorldActivities {
    private final PrintStream out;

    public HelloWordActivitiesImpl(PrintStream out) {
      this.out = out;
    }

    @Override
    public void say(String message) {
      out.println(message);
    }
  }
```
Let's create a separate main method for the activity worker. It is common to have a single worker that hosts both activities and workflows,
but here we keep them separate to demonstrate how Temporal deals with worker failures.
To make the activity implementation known to Temporal, register it with the worker:
```java
public class GettingStartedActivityWorker {

  public static void main(String[] args) {
    WorkflowServiceStubs service = WorkflowServiceStubs.newInstance();
    WorkflowClient client = WorkflowClient.newInstance(service);
    WorkerFactory factory = WorkerFactory.newInstance(client);
    Worker worker = factory.newWorker("HelloWorldTaskList");
    worker.registerActivitiesImplementations(new HelloWordActivitiesImpl(System.out));
    factory.start();
  }
}
```
A single instance of an activity object is registered per activity interface type. This means that the activity implementation should be thread-safe since the activity method can be simultaneously called from multiple threads.

Let's modify the workflow code to invoke the activity instead of logging:
```java
  public static class HelloWorldImpl implements HelloWorld {

    private final HelloWorldActivities activities = Workflow.newActivityStub(HelloWorldActivities.class);
    private String greeting = "Hello";
    private int count = 0;

    @Override
    public void sayHello(String name) {
      while (!"Bye".equals(greeting)) {
        activities.say(++count + ": " + greeting + " " + name + "!");
        String oldGreeting = greeting;
        Workflow.await(() -> !Objects.equals(greeting, oldGreeting));
      }
      activities.say(++count + ": " + greeting + " " + name + "!");
    }

    @Override
    public void updateGreeting(String greeting) {
      this.greeting = greeting;
    }

    @Override
    public int getCount() {
      return count;
    }
  }
```
Activities are invoked through a stub that implements their interface. So an invocation is just a method call on an activity stub.

Now run the workflow worker. Do not run the activity worker yet. Then start a new workflow execution:
```bash
temporal: docker run --network=host --rm temporalio/tctl:0.21.1 workflow start  --workflow_id "HelloActivityWorker" --tasklist HelloWorldTaskList --workflow_type HelloWorld_sayHello --execution_timeout 3600 --input \"World\"
Started Workflow Id: HelloActivityWorker, run Id: ff015637-b5af-43e8-b3f6-8b6c7b919b62
```
The workflow is started, but nothing visible happens. This is expected as the activity worker is not running. What are the options to understand the currently running workflow state?

The first option is look at the stack trace:
```text
temporal: docker run --network=host --rm temporalio/tctl:0.21.1 workflow stack  --workflow_id "HelloActivityWorker"
Query result as JSON:
"workflow-root: (BLOCKED on Feature.get)io.temporal.internal.sync.CompletablePromiseImpl.get(CompletablePromiseImpl.java:71)
io.temporal.internal.sync.ActivityStubImpl.execute(ActivityStubImpl.java:58)
io.temporal.internal.sync.ActivityInvocationHandler.lambda$invoke$0(ActivityInvocationHandler.java:87)
io.temporal.internal.sync.ActivityInvocationHandler$$Lambda$25/1816732716.apply(Unknown Source)
io.temporal.internal.sync.ActivityInvocationHandler.invoke(ActivityInvocationHandler.java:94)
com.sun.proxy.$Proxy6.say(Unknown Source)
io.temporal.samples.hello.GettingStarted$HelloWorldImpl.sayHello(GettingStarted.java:55)
sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
"
```
It shows that the workflow code is blocked on the "say" method of a Proxy object that implements the activity stub.
You can restart the workflow worker if you want to make sure that restarting it does not change that. It works for activities
of any duration. It is okay for the workflow code to block on an activity invocation for a month for example.

Another way to see what exactly happened in the workflow execution is to look at the workflow execution history:
```text
temporal: docker run --network=host --rm temporalio/tctl:0.21.1 workflow show  --workflow_id "HelloActivityWorker"
  1  WorkflowExecutionStarted  {WorkflowType:{Name:HelloWorld_sayHello},
                                TaskList:{Name:HelloWorldTaskList},
                                Input:["World"],
                                ExecutionStartToCloseTimeoutSeconds:3600,
                                TaskStartToCloseTimeoutSeconds:10,
                                ContinuedFailureDetails:[],
                                LastCompletionResult:[],
                                Identity:temporal-cli@linuxkit-025000000001,
                                Attempt:0,
                                FirstDecisionTaskBackoffSeconds:0}
  2  DecisionTaskScheduled     {TaskList:{Name:HelloWorldTaskList},
                                StartToCloseTimeoutSeconds:10,
                                Attempt:0}
  3  DecisionTaskStarted       {ScheduledEventId:2,
                                Identity:36234@maxim-C02XD0AAJGH6,
                                RequestId:ef645576-7cee-4d2e-9892-597a08b7b01f}
  4  DecisionTaskCompleted     {ExecutionContext:[],
                                ScheduledEventId:2,
                                StartedEventId:3,
                                Identity:36234@maxim-C02XD0AAJGH6}
  5  ActivityTaskScheduled     {ActivityId:0,
                                ActivityType:{Name:HelloWorldActivities_say},
                                TaskList:{Name:HelloWorldTaskList},
                                Input:["1: Hello World!"],
                                ScheduleToCloseTimeoutSeconds:100,
                                ScheduleToStartTimeoutSeconds:100,
                                StartToCloseTimeoutSeconds:100,
                                HeartbeatTimeoutSeconds:100,
                                DecisionTaskCompletedEventId:4}
```
The last event in the workflow history is `ActivityTaskScheduled`. It is recorded when workflow invoked the activity, but it wasn't picked up by an activity worker yet.

Another useful API is `DescribeWorkflowExecution` which, among other information, contains the list of outstanding activities:
```text
temporal: docker run --network=host --rm temporalio/tctl:0.21.1 workflow describe  --workflow_id "HelloActivityWorker"
{
  "ExecutionConfiguration": {
    "taskList": {
      "name": "HelloWorldTaskList"
    },
    "executionStartToCloseTimeoutSeconds": 3600,
    "taskStartToCloseTimeoutSeconds": 10,
    "childPolicy": "TERMINATE"
  },
  "WorkflowExecutionInfo": {
    "Execution": {
      "workflowId": "HelloActivityWorker",
      "runId": "ff015637-b5af-43e8-b3f6-8b6c7b919b62"
    },
    "Type": {
      "name": "HelloWorld_sayHello"
    },
    "StartTime": "2019-06-08T23:56:41Z",
    "CloseTime": "1970-01-01T00:00:00Z",
    "Status": null,
    "HistoryLength": 5,
    "ParentNamespaceId": null,
    "ParentExecution": null,
    "AutoResetPoints": {}
  },
  "PendingActivities": [
    {
      "ActivityId": "0",
      "ActivityType": {
        "name": "HelloWorldActivities_say"
      },
      "State": "SCHEDULED",
      "ScheduledTimestamp": "2019-06-08T23:57:00Z"
    }
  ]
}
```
Let's start the activity worker. It starts and immediately prints:
```text
1: Hello World!
```
Let's look at the workflow execution history:
```text
temporal: docker run --network=host --rm temporalio/tctl:0.21.1 workflow show  --workflow_id "HelloActivityWorker"
   1  WorkflowExecutionStarted  {WorkflowType:{Name:HelloWorld_sayHello},
                                TaskList:{Name:HelloWorldTaskList},
                                Input:["World"],
                                ExecutionStartToCloseTimeoutSeconds:3600,
                                TaskStartToCloseTimeoutSeconds:10,
                                ContinuedFailureDetails:[],
                                LastCompletionResult:[],
                                Identity:temporal-cli@linuxkit-025000000001,
                                Attempt:0,
                                FirstDecisionTaskBackoffSeconds:0}
   2  DecisionTaskScheduled     {TaskList:{Name:HelloWorldTaskList},
                                StartToCloseTimeoutSeconds:10,
                                Attempt:0}
   3  DecisionTaskStarted       {ScheduledEventId:2,
                                Identity:37694@maxim-C02XD0AAJGH6,
                                RequestId:1d7cba6d-98c8-41fd-91b1-c27dffb21c7f}
   4  DecisionTaskCompleted     {ExecutionContext:[],
                                ScheduledEventId:2,
                                StartedEventId:3,
                                Identity:37694@maxim-C02XD0AAJGH6}
   5  ActivityTaskScheduled     {ActivityId:0,
                                ActivityType:{Name:HelloWorldActivities_say},
                                TaskList:{Name:HelloWorldTaskList},
                                Input:["1: Hello World!"],
                                ScheduleToCloseTimeoutSeconds:300,
                                ScheduleToStartTimeoutSeconds:300,
                                StartToCloseTimeoutSeconds:300,
                                HeartbeatTimeoutSeconds:300,
                                DecisionTaskCompletedEventId:4}
   6  ActivityTaskStarted       {ScheduledEventId:5,
                                Identity:37784@maxim-C02XD0AAJGH6,
                                RequestId:a646d5d2-566f-4f43-92d7-6689139ce944,
                                Attempt:0}
   7  ActivityTaskCompleted     {Result:[], ScheduledEventId:5,
                                StartedEventId:6,
                                Identity:37784@maxim-C02XD0AAJGH6}
   8  DecisionTaskScheduled     {TaskList:{Name:maxim-C02XD0AAJGH6:fd3a85ed-752d-4662-a49d-2665b7667c8a},
                                StartToCloseTimeoutSeconds:10, Attempt:0}
   9  DecisionTaskStarted       {ScheduledEventId:8,
                                Identity:fd3a85ed-752d-4662-a49d-2665b7667c8a,
                                RequestId:601ef30a-0d1b-4400-b034-65b8328ad34c}
  10  DecisionTaskCompleted     {ExecutionContext:[],
                                ScheduledEventId:8,
                                StartedEventId:9,
                                Identity:37694@maxim-C02XD0AAJGH6}
```
_ActivityTaskStarted_ event is recorded when the activity task is picked up by an activity worker. The Identity field
contains the Id of the worker (you can set it to any value on worker startup).

_ActivityTaskCompleted_ event is recorded when activity completes. It contains the result of the activity execution.

Let's look at various failure scenarios. Modify activity task timeout:
```java
  @ActivityInterface
  public interface HelloWorldActivities {
    @ActivityMethod(scheduleToCloseTimeoutSeconds = 100)
    void say(String message);
  }

  public class HelloWordActivitiesImpl implements HelloWorldActivities {
    private final PrintStream out;

    public HelloWordActivitiesImpl(PrintStream out) {
      this.out = out;
    }

    @Override
    public void say(String message) {
      out.println(message);
    }
  }
```
(To be continued ...)