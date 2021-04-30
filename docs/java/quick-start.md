---
id: quick-start
title: Quick Start
---

This topic helps you install the Temporal server and implement a Workflow.

## Install Temporal Server Locally

To run samples locally you need to run Temporal server locally using [instructions](/docs/server/quick-install/).

## Implement Hello World Java Workflow

### Include Temporal Java SDK Dependency

Go to the [Maven Repository Temporal Java Client Page](https://search.maven.org/artifact/io.temporal/temporal-sdk)
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
import io.temporal.workflow.WorkflowInterface;
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

Also add the following logback.xml config file somewhere in your classpath (for example with gradle it can be under `src/main/resources/logback.xml`):

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
import io.temporal.workflow.Workflow;
import io.temporal.workflow.WorkflowInterface;
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

To link the Workflow implementation to the Temporal framework, it should be registered with a worker that connects to
a Temporal Service. By default the worker connects to the locally running Temporal service.

```java
import io.temporal.client.WorkflowClient;
import io.temporal.serviceclient.WorkflowServiceStubs;
import io.temporal.worker.Worker;
import io.temporal.worker.WorkerFactory;

public class HelloWorker {
    public static void main(String[] args) {
        // gRPC stubs wrapper that talks to the local docker instance of temporal service.
        WorkflowServiceStubs service = WorkflowServiceStubs.newInstance();
        // client that can be used to start and signal Workflows
        WorkflowClient client = WorkflowClient.newInstance(service);
        // worker factory that can be used to create workers for specific task queues
        WorkerFactory factory = WorkerFactory.newInstance(client);
        Worker worker = factory.newWorker("HelloWorldTaskQueue");
        worker.registerWorkflowImplementationTypes(GettingStarted.HelloWorldImpl.class);
        factory.start();
    }
}
```

### Execute Hello World Workflow using the CLI

Now run the worker program. Following is an example log:

```text
18:39:45.522 [main] INFO  i.t.i.WorkflowServiceStubsImpl - Created GRPC client for channel: ManagedChannelOrphanWrapper{delegate=ManagedChannelImpl{logId=1, target=127.0.0.1:7233}}
18:39:45.674 [main] INFO  io.temporal.internal.worker.Poller - start(): Poller{options=PollerOptions{maximumPollRateIntervalMilliseconds=1000, maximumPollRatePerSecond=0.0, pollBackoffCoefficient=2.0, pollBackoffInitialInterval=PT0.1S, pollBackoffMaximumInterval=PT1M, pollThreadCount=1, pollThreadNamePrefix='Workflow Poller taskQueue="HelloWorldTaskQueue", namespace="default"'}, identity=unknown-mac}
18:39:45.676 [main] INFO  io.temporal.internal.worker.Poller - start(): Poller{options=PollerOptions{maximumPollRateIntervalMilliseconds=1000, maximumPollRatePerSecond=0.0, pollBackoffCoefficient=2.0, pollBackoffInitialInterval=PT0.1S, pollBackoffMaximumInterval=PT1M, pollThreadCount=1, pollThreadNamePrefix='null'}, identity=95963a78-641d-434b-841e-a2efe7f8a19f}
```

No Hello printed. This is expected because a worker is just a Workflow code host. The Workflow has to be started to execute. Let's use Temporal CLI to start the Workflow:

```bash
docker run --network=host --rm temporalio/tctl:1.9.0 workflow run --taskqueue HelloWorldTaskQueue --workflow_type HelloWorld --execution_timeout 3600 --input \"World\"
```

CLI output:

```bash
Running execution:
  Workflow Id : d58237c9-2ae7-4e17-9cbd-311beeedfbe2
  Run Id      : 7a948e0b-0b0a-4aea-9457-994821c7f7be
  Type        : HelloWorld
  Namespace   : default
  Task Queue  : HelloWorldTaskQueue
  Args        : [World]
Progress:
  1, 2020-10-13T20:40:12Z, WorkflowExecutionStarted
  2, 2020-10-13T20:40:12Z, WorkflowTaskScheduled
  3, 2020-10-13T20:40:12Z, WorkflowTaskStarted
  4, 2020-10-13T20:40:12Z, WorkflowTaskCompleted
  5, 2020-10-13T20:40:12Z, WorkflowExecutionCompleted

Result:
  Run Time: 1 seconds
  Status: COMPLETED
  Output: []
```

The last line of output in the HelloWorker's log should now be:

```text
18:40:28.354 [workflow-1029765531] INFO  main - Hello World!
```

Let's start another Workflow execution:

```bash
docker run --network=host --rm temporalio/tctl:1.9.0 workflow run --taskqueue HelloWorldTaskQueue --workflow_type HelloWorld --execution_timeout 3600 --input \"Temporal\"
```

The last two lines of output in the HelloWorker's log should now be:

```text
13:40:12.294 [workflow-method] INFO  c.t.s.javaquickstart.GettingStarted - Hello World!
13:41:06.359 [workflow-method] INFO  c.t.s.javaquickstart.GettingStarted - Hello Temporal!
```

### List Workflows and Workflow History

Let's list our Workflows in the CLI:

```bash
docker run --network=host --rm temporalio/tctl:1.9.0 workflow list
```

CLI output should be similar to:
```text
  WORKFLOW TYPE |             WORKFLOW ID              |                RUN ID                |     TASK QUEUE      | START TIME | EXECUTION TIME | END TIME
  HelloWorld    | 08c0259f-c1d5-41d9-b51f-8c70c203ccca | f0c04163-833f-490b-99a9-ee48b6199213 | HelloWorldTaskQueue | 20:41:06   | 20:41:06       | 20:41:06
  HelloWorld    | d58237c9-2ae7-4e17-9cbd-311beeedfbe2 | 7a948e0b-0b0a-4aea-9457-994821c7f7be | HelloWorldTaskQueue | 20:40:12   | 20:40:12       | 20:40:12
```

Now let's look at the Workflow execution history more closely:

```bash
docker run --network=host --rm temporalio/tctl:1.9.0 workflow showid 08c0259f-c1d5-41d9-b51f-8c70c203ccca
```

CLI output:

```text
  1  WorkflowExecutionStarted    {WorkflowType:{Name:HelloWorld}, ParentInitiatedEventId:0,
                                  TaskQueue:{Name:HelloWorldTaskQueue, Kind:Normal},
                                  Input:[Temporal], WorkflowExecutionTimeout:1h0m0s,
                                  WorkflowRunTimeout:1h0m0s, WorkflowTaskTimeout:10s,
                                  Initiator:Unspecified, LastCompletionResult:[],
                                  OriginalExecutionRunId:f0c04163-833f-490b-99a9-ee48b6199213,
                                  Identity:tctl@z0mb1e,
                                  FirstExecutionRunId:f0c04163-833f-490b-99a9-ee48b6199213,
                                  Attempt:1, WorkflowExecutionExpirationTime:2020-10-13
                                  21:41:06.349 +0000 UTC, FirstWorkflowTaskBackoff:0s}
  2  WorkflowTaskScheduled       {TaskQueue:{Name:HelloWorldTaskQueue,
                                  Kind:Normal},
                                  StartToCloseTimeout:10s, Attempt:1}
  3  WorkflowTaskStarted         {ScheduledEventId:2, Identity:15079@z0mb1e,
                                  RequestId:731f7b41-5ae4-42e4-9695-ecd857d571f1}
  4  WorkflowTaskCompleted       {ScheduledEventId:2,
                                  StartedEventId:3,
                                  Identity:15079@z0mb1e}
  5  WorkflowExecutionCompleted  {Result:[],
                                  WorkflowTaskCompletedEventId:4}
```

Even for such a trivial Workflow, the history gives a lot of useful information about all steps that were executed and their inputs.
For complex Workflows this is a really useful tool for production and development troubleshooting.

### Workflow Id Uniqueness

Before proceeding to a more complex Workflow implementation, let's take a look at the Workflow Id semantic.
When starting a Workflow without providing an Id, the client generates one in the form of a UUID. In most real-life scenarios this is not a desired behavior. The business Id should be used instead. Here, we'll specify the Id when starting a Workflow:

```bash
docker run --network=host --rm temporalio/tctl:1.9.0 workflow start  --workflow_id "HelloTemporal1" --taskqueue HelloWorldTaskQueue --workflow_type HelloWorld --execution_timeout 3600 --input \"Temporal\"
```

CLI output:

```text
Started Workflow Id: HelloTemporal1, run Id: 78ca0a3f-8cd2-46a2-8d23-076c3f0f187c
```

Now the list operation is more meaningful as the WORKFLOW ID is our business Id:

```bash
docker run --network=host --rm temporalio/tctl:1.9.0 workflow list
```

CLI output:

```text
     WORKFLOW TYPE    |      WORKFLOW ID      |                RUN ID                | START TIME | EXECUTION TIME | END TIME
  HelloWorld_sayHello | HelloTemporal1        | 78ca0a3f-8cd2-46a2-8d23-076c3f0f187c | 01:47:24   | 01:47:24       | 01:47:25
```

After the previous Workflow completes, let's try to start another one with the same Id:

```bash
docker run --network=host --rm temporalio/tctl:1.9.0 workflow start  --workflow_id "HelloTemporal1" --taskqueue HelloWorldTaskQueue --workflow_type HelloWorld --execution_timeout 3600 --input \"Temporal\"
```

Output:

```text
Started Workflow Id: HelloTemporal1, run Id: 9b5e36a3-9868-4de5-bbdf-eda9cedcd865
```

After the second start list Workflows with:

```bash
docker run --network=host --rm temporalio/tctl:1.9.0 workflow list
```

CLI output:

```text
  WORKFLOW TYPE |             WORKFLOW ID              |                RUN ID                |     TASK QUEUE      | START TIME | EXECUTION TIME | END TIME
  HelloWorld    | HelloTemporal1                       | 0514b7fe-6ba7-4f94-ad1a-60557018da7b | HelloWorldTaskQueue | 20:44:40   | 20:44:40       | 20:44:40
  HelloWorld    | HelloTemporal1                       | a90989f0-e629-46c8-9dbd-f7e6c374ceea | HelloWorldTaskQueue | 20:43:36   | 20:43:36       | 20:43:36
```

As you can see Workflow Id can be reused while system-generated Run Id uniquely identifies a particular execution of a Workflow.

Note - Under no circumstances does Temporal allow more than one instance of an open Workflow with the same Id. Multiple Workflow Ids are required in the case that paralell invocations wish to be supported (such as an Actor patern)

### CLI Help

See the CLI help command for all of the options supported:

```bash
docker run --network=host --rm temporalio/tctl:1.9.0 workflow help start
```

CLI output:

```text
NAME:
   tctl workflow start - start a new Workflow execution

USAGE:
   tctl workflow start [command options] [arguments...]

OPTIONS:
   --taskqueue value, --tq value               TaskQueue
   --workflow_id value, --wid value, -w value  WorkflowId
   --workflow_type value, --wt value           WorkflowTypeName
   --execution_timeout value, --et value       Execution start to close timeout in seconds (default: 0)
   --workflow_task_timeout value, --wtt value  Workflow task start to close timeout in seconds (default: 10)
   --cron value                                Optional cron schedule for the Workflow. Cron spec is as following:
                                               ┌───────────── minute (0 - 59)
                                               │ ┌───────────── hour (0 - 23)
                                               │ │ ┌───────────── day of the month (1 - 31)
                                               │ │ │ ┌───────────── month (1 - 12)
                                               │ │ │ │ ┌───────────── day of the week (0 - 6) (Sunday to Saturday)
                                               │ │ │ │ │
                                               * * * * *
   --workflowidreusepolicy value, --wrp value  Configure if the same workflow Id is allowed for use in new Workflow execution. Options: AllowDuplicate, AllowDuplicateFailedOnly, RejectDuplicate
   --input value, -i value                     Optional input for the Workflow in JSON format. If there are multiple parameters, pass each as a separate input flag. Pass "null" for null values
   --input_file value, --if value              Optional input for the Workflow from JSON file. If there are multiple JSON, concatenate them and separate by space or newline. Input from file will be overwrite by input from command line
   --memo_key value                            Optional key of memo. If there are multiple keys, concatenate them and separate by space
   --memo value                                Optional info that can be showed when list Workflow, in JSON format. If there are multiple JSON, concatenate them and separate by space. The order must be same as memo_key
   --memo_file value                           Optional info that can be listed in list Workflow, from JSON format file. If there are multiple JSON, concatenate them and separate by space or newline. The order must be same as memo_key
   --search_attr_key value                     Optional search attributes keys that can be be used in list query. If there are multiple keys, concatenate them and separate by |. Use 'cluster get-search-attr' cmd to list legal keys.
   --search_attr_value value                   Optional search attributes value that can be be used in list query. If there are multiple keys, concatenate them and separate by |. If value is array, use json array like ["a","b"], [1,2], ["true","false"], ["2019-06-07T17:16:34-08:00","2019-06-07T18:16:34-08:00"]. Use 'cluster get-search-attr' cmd to list legal keys and value types
```

## Signals

So far our Workflow was simply printing a message and completing execution.
Let's change Workflow implementation to listen for external events and save the state accordingly.
Restart the worker to pick up your changes.

```java
import io.temporal.workflow.SignalMethod;
import io.temporal.workflow.Workflow;
import io.temporal.workflow.WorkflowInterface;
import io.temporal.workflow.WorkflowMethod;
import org.slf4j.Logger;

import java.util.Objects;

public class GettingStarted {

    private static Logger logger = Workflow.getLogger(GettingStarted.class);

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

}
```

The Workflow interface now has a new method annotated with @SignalMethod. It is a callback method that is invoked
every time a new signal of "HelloWorld*updateGreeting" is delivered to a Workflow. The Workflow interface can have only
one @WorkflowMethod which is a \_main* function of the Workflow and as many signal methods as needed.

The updated Workflow implementation demonstrates a few important Temporal concepts. The first is that Workflow is stateful and can
have fields of any complex type. Another is that the `Workflow.await` function that blocks until the function it receives as a parameter evaluates to true. The condition is going to be evaluated only on Workflow state changes, so it is not a busy wait in traditional sense.

```bash
docker run --network=host --rm temporalio/tctl:1.9.0 workflow start  --workflow_id "HelloSignal" --taskqueue HelloWorldTaskQueue --workflow_type HelloWorld --execution_timeout 3600 --input \"World\"
```

Worker output:

```text
13:57:44.258 [workflow-method] INFO  c.t.s.javaquickstart.GettingStarted - 1: Hello World!
```

Let's send a signal using CLI:

```bash
docker run --network=host --rm temporalio/tctl:1.9.0 workflow signal --workflow_id "HelloSignal" --name "updateGreeting" --input \"Hi\"
```

Worker output:

```text
13:57:44.258 [workflow-method] INFO  c.t.s.javaquickstart.GettingStarted - 1: Hello World!
13:58:22.352 [workflow-method] INFO  c.t.s.javaquickstart.GettingStarted - 2: Hi World!
```

Try sending the same signal with the same input again. Note that the output doesn't change. This happens because the await condition
doesn't unblock when it sees the same value. But a new greeting unblocks it:

```bash
docker run --network=host --rm temporalio/tctl:1.9.0 workflow signal --workflow_id "HelloSignal" --name "updateGreeting" --input \"Welcome\"
```

Worker output:

```text
13:57:44.258 [workflow-method] INFO  c.t.s.javaquickstart.GettingStarted - 1: Hello World!
13:58:22.352 [workflow-method] INFO  c.t.s.javaquickstart.GettingStarted - 2: Hi World!
13:59:29.097 [workflow-method] INFO  c.t.s.javaquickstart.GettingStarted - 3: Welcome World!
```

Now shut down the worker and send the same signal again:

```bash
docker run --network=host --rm temporalio/tctl:1.9.0 workflow signal --workflow_id "HelloSignal" --name "updateGreeting" --input \"Welcome\"
```

CLI output:

```text
Signal workflow succeeded.
```

Note that sending signals as well as starting Workflows does not need a worker running. The requests are queued inside the Temporal server.

Now bring the worker back. Note that it doesn't log anything besides the standard startup messages.
This occurs because it ignores the queued signal that contains the same input as the current value of greeting.
Note that the restart of the worker didn't affect the Workflow execution. It is still blocked on the same line of code as before the failure.
This is the most important feature of Temporal. The Workflow code doesn't need to deal with worker failures at all. Its state is fully recovered to its current state that includes all the local variables and threads.

Let's look at the line where the Workflow is blocked:

```bash
docker run --network=host --rm temporalio/tctl:1.9.0 workflow stack --workflow_id HelloSignal
```

CLI output:

```text
Query result:
[workflow-method: (BLOCKED on await)
app//io.temporal.internal.sync.WorkflowThreadContext.yield(WorkflowThreadContext.java:79)
app//io.temporal.internal.sync.WorkflowThreadImpl.yield(WorkflowThreadImpl.java:402)
app//io.temporal.internal.sync.WorkflowThread.await(WorkflowThread.java:45)
app//io.temporal.internal.sync.SyncWorkflowContext.await(SyncWorkflowContext.java:775)
app//io.temporal.internal.sync.WorkflowInternal.await(WorkflowInternal.java:274)
app//io.temporal.workflow.Workflow.await(Workflow.java:748)
app//com.temporal.samples.javaquickstart.GettingStarted$HelloWorldImpl.sayHello(GettingStarted.java:34)
java.base@14.0.1/jdk.internal.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
java.base@14.0.1/jdk.internal.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:62)
java.base@14.0.1/jdk.internal.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
java.base@14.0.1/java.lang.reflect.Method.invoke(Method.java:564)
app//io.temporal.internal.sync.POJOWorkflowImplementationFactory$POJOWorkflowImplementation$RootWorkflowInboundCallsInterceptor.execute(POJOWorkflowImplementationFactory.java:289)
]
```

Yes, indeed the Workflow is blocked on await. Stack feature works for any open Workflow, greatly simplifying troubleshooting in production.
Let's complete the Workflow by sending a signal with a "Bye" greeting:

```bash
docker run --network=host --rm temporalio/tctl:1.9.0 workflow signal --workflow_id "HelloSignal" --name "updateGreeting" --input \"Bye\"
```

You can make sure that Workflow execution has been completed by looking at the Workflow execution history:

```bash
docker run --network=host --rm temporalio/tctl:1.9.0 workflow showid HelloSignal
```

Note that the value of the count variable was not lost during the restart.
This is one of key features of temporal, which allows us to restore Workflow state on any worker based on previous Workflow events.

Also note that while a single worker instance was used for this walkthrough, any real production deployment has multiple worker instances running. So any worker failure or restart does not delay any
Workflow execution because it is just migrated to any other available worker.

## Query

So far we have learned that the Workflow code is fault tolerant and can update its state in reaction to external events in the form of signals.
Temporal provides a query feature that supports synchronously returning any information from a Workflow to an external caller.

Update the Workflow code to:

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

The new `getCount` method annotated with `@QueryMethod` was added to the Workflow interface definition. It is allowed
to have multiple query methods per Workflow interface.

The main restriction on the implementation of the query method is that it is not allowed to modify Workflow state in any form.
It also is not allowed to block its thread in any way. It usually just returns a value derived from the fields of the Workflow object.
Let's run the updated worker and send a couple signals to it:

```bash
temporal: docker run --network=host --rm temporalio/tctl:1.9.0 workflow start  --workflow_id "HelloQuery" --taskqueue HelloWorldTaskQueue --workflow_type HelloWorld --execution_timeout 3600 --input \"World\"
Started Workflow Id: HelloQuery, run Id: 1925f668-45b5-4405-8cba-74f7c68c3135
temporal: docker run --network=host --rm temporalio/tctl:1.9.0 workflow signal --workflow_id "HelloQuery" --name "updateGreeting" --input \"Hi\"
Signal workflow succeeded.
temporal: docker run --network=host --rm temporalio/tctl:1.9.0 workflow signal --workflow_id "HelloQuery" --name "updateGreeting" --input \"Welcome\"
Signal workflow succeeded.
```

The worker output:

```text
17:35:50.485 [workflow-root] INFO  c.u.c.samples.hello.GettingStarted - 1: Hello World!
17:36:10.483 [workflow-root] INFO  c.u.c.samples.hello.GettingStarted - 2: Hi World!
17:36:16.204 [workflow-root] INFO  c.u.c.samples.hello.GettingStarted - 3: Welcome World!
```

Now let's query the Workflow using the CLI:

```bash
temporal: docker run --network=host --rm temporalio/tctl:1.9.0 workflow query --workflow_id "HelloQuery" --query_type "getCount"
Query result as JSON:
3
```

One limitation of the query is that it requires a worker process running because it is executing callback code.
An interesting feature of the query is that it works for completed Workflows as well. Let's complete the Workflow by sending "Bye" and query it.

```bash
temporal: docker run --network=host --rm temporalio/tctl:1.9.0 workflow signal --workflow_id "HelloQuery" --name "updateGreeting" --input \"Bye\"
Signal workflow succeeded.
temporal: docker run --network=host --rm temporalio/tctl:1.9.0 workflow query --workflow_id "HelloQuery" --query_type "getCount"
Query result as JSON:
4
```

The Query method can accept parameters. This might be useful if only part of the Workflow state should be returned.

## Activities

Having fault tolerant code that maintains state, updates it in reaction to external events, and supports querying is already very useful.
But in most practical applications, the Workflow is expected to act upon the external world. Temporal supports such externally-facing code in the form of Activities.

An Activity is essentially a function that can execute any code like DB updates or service calls. The Workflow is not allowed to
directly call any external APIs; it can do this only through Activities. The Workflow is essentially an orchestrator of Activities.
Let's change our program to print the greeting from an Activity on every change.

First let's define an Activities interface and implement it:

```java
  @ActivityInterface
  public interface HelloWorldActivities {
    void say(String message);
  }
```

`@ActivityInterface` annotation is required for an Activity interface. Each method that belongs to an Activity interface
defines a separate Activity type.

Activity implementation is just a normal [POJO](https://en.wikipedia.org/wiki/Plain_old_Java_object).
The `out` stream is passed as a parameter to the constructor to demonstrate that the
Activity object can have any dependencies. Examples of real application dependencies are database connections and service clients.

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

Let's create a separate main method for the Activity worker. It is common to have a single worker that hosts both Activities and Workflows,
but here we keep them separate to demonstrate how Temporal deals with worker failures.
To make the Activity implementation known to Temporal, register it with the worker:

```java
public class GettingStartedActivityWorker {

  public static void main(String[] args) {
    WorkflowServiceStubs service = WorkflowServiceStubs.newInstance();
    WorkflowClient client = WorkflowClient.newInstance(service);
    WorkerFactory factory = WorkerFactory.newInstance(client);
    Worker worker = factory.newWorker("HelloWorldTaskQueue");
    worker.registerActivitiesImplementations(new HelloWordActivitiesImpl(System.out));
    factory.start();
  }
}
```

A single instance of an Activity object is registered per Activity interface type. This means that the Activity implementation should be thread-safe since the Activity method can be simultaneously called from multiple threads.

Let's modify the Workflow code to invoke the Activity instead of logging:

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

Activities are invoked through a stub that implements their interface. So an invocation is just a method call on an Activity stub.

Now run the Workflow worker. Do not run the Activity worker yet. Then start a new Workflow execution:

```bash
temporal: docker run --network=host --rm temporalio/tctl:1.9.0 workflow start  --workflow_id "HelloActivityWorker" --taskqueue HelloWorldTaskQueue --workflow_type HelloWorld_sayHello --execution_timeout 3600 --input \"World\"
Started Workflow Id: HelloActivityWorker, run Id: ff015637-b5af-43e8-b3f6-8b6c7b919b62
```

The Workflow is started, but nothing visible happens. This is expected as the Activity worker is not running. What are the options to understand the currently running Workflow state?

The first option is look at the stack trace:

```text
temporal: docker run --network=host --rm temporalio/tctl:1.9.0 workflow stack  --workflow_id "HelloActivityWorker"
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

It shows that the Workflow code is blocked on the "say" method of a Proxy object that implements the Activity stub.
You can restart the Workflow worker if you want to make sure that restarting it does not change that. It works for Activities
of any duration. It is okay for the Workflow code to block on an Activity invocation for a month for example.

Another way to see what exactly happened in the Workflow execution is to look at the Workflow execution history:

```text
temporal: docker run --network=host --rm temporalio/tctl:1.9.0 workflow show  --workflow_id "HelloActivityWorker"
  1  WorkflowExecutionStarted  {WorkflowType:{Name:HelloWorld_sayHello},
                                TaskQueue:{Name:HelloWorldTaskQueue},
                                Input:["World"],
                                ExecutionStartToCloseTimeoutSeconds:3600,
                                TaskStartToCloseTimeoutSeconds:10,
                                ContinuedFailureDetails:[],
                                LastCompletionResult:[],
                                Identity:temporal-cli@linuxkit-025000000001,
                                Attempt:0,
                                FirstDecisionTaskBackoffSeconds:0}
  2  DecisionTaskScheduled     {TaskQueue:{Name:HelloWorldTaskQueue},
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
                                TaskQueue:{Name:HelloWorldTaskQueue},
                                Input:["1: Hello World!"],
                                ScheduleToCloseTimeoutSeconds:100,
                                ScheduleToStartTimeoutSeconds:100,
                                StartToCloseTimeoutSeconds:100,
                                HeartbeatTimeoutSeconds:100,
                                DecisionTaskCompletedEventId:4}
```

The last event in the Workflow history is `ActivityTaskScheduled`. It is recorded when Workflow invoked the Activity, but it wasn't picked up by an Activity worker yet.

Another useful API is `DescribeWorkflowExecution` which, among other information, contains the list of outstanding Activities:

```text
temporal: docker run --network=host --rm temporalio/tctl:1.9.0 workflow describe  --workflow_id "HelloActivityWorker"
{
  "ExecutionConfiguration": {
    "taskQueue": {
      "name": "HelloWorldTaskQueue"
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

Let's start the Activity worker. It starts and immediately prints:

```text
1: Hello World!
```

Let's look at the Workflow execution history:

```text
temporal: docker run --network=host --rm temporalio/tctl:1.9.0 workflow show  --workflow_id "HelloActivityWorker"
   1  WorkflowExecutionStarted  {WorkflowType:{Name:HelloWorld_sayHello},
                                TaskQueue:{Name:HelloWorldTaskQueue},
                                Input:["World"],
                                ExecutionStartToCloseTimeoutSeconds:3600,
                                TaskStartToCloseTimeoutSeconds:10,
                                ContinuedFailureDetails:[],
                                LastCompletionResult:[],
                                Identity:temporal-cli@linuxkit-025000000001,
                                Attempt:0,
                                FirstDecisionTaskBackoffSeconds:0}
   2  DecisionTaskScheduled     {TaskQueue:{Name:HelloWorldTaskQueue},
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
                                TaskQueue:{Name:HelloWorldTaskQueue},
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
   8  DecisionTaskScheduled     {TaskQueue:{Name:maxim-C02XD0AAJGH6:fd3a85ed-752d-4662-a49d-2665b7667c8a},
                                StartToCloseTimeoutSeconds:10, Attempt:0}
   9  DecisionTaskStarted       {ScheduledEventId:8,
                                Identity:fd3a85ed-752d-4662-a49d-2665b7667c8a,
                                RequestId:601ef30a-0d1b-4400-b034-65b8328ad34c}
  10  DecisionTaskCompleted     {ExecutionContext:[],
                                ScheduledEventId:8,
                                StartedEventId:9,
                                Identity:37694@maxim-C02XD0AAJGH6}
```

_ActivityTaskStarted_ event is recorded when the Activity task is picked up by an Activity worker. The Identity field
contains the Id of the worker (you can set it to any value on worker startup).

_ActivityTaskCompleted_ event is recorded when Activity completes. It contains the result of the Activity execution.

Let's look at various failure scenarios. Modify Activity task timeout:

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
