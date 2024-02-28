/* dacx */
package backgroundcheckreplay;

import io.temporal.activity.ActivityOptions;
import io.temporal.workflow.Workflow;
import org.slf4j.Logger;

import java.time.Duration;
import java.util.Random;

/*
Referred to as "intrinsic non-determinism" this kind of "bad" Workflow code can prevent the Workflow code from completing because the Workflow can take a different code path than the one expected from the Event History.

The following are some common operations that **can't** be done inside of a Workflow Definition:

- Generate and rely on random numbers (Use Activites instead).
- Accessing / mutating external systems or state.
  This includes calling an external API, conducting a file I/O operation, talking to another service, etc. (use Activities instead).
- Relying on system time.
  - Use `Workflow.currentTimeMillis()` as a replacement for `System.CurrentTimeMillis()`.
  - Use `Workflow.Sleep()` as a replacement for `Thread.Sleep()`.
- Working directly with threads.
- Iterating over data structures with unknown ordering.
  This includes iterating over HashMaps using `for` as the order is randomized.
  Instead you can collect the keys of the map, sort them, and then iterate over the sorted keys to access the map or consider using a `LinkedHashMap` or other ordered data structure.
  This technique provides deterministic results.
- Storing or evaluating the run Id.

One way to produce a non-deterministic error is to use a random number to determine whether to sleep inside the Workflow.
*/


public class BackgroundCheckReplayNonDeterministicWorkflowImpl implements BackgroundCheckReplayNonDeterministicWorkflow {

  // Define the Activity Execution options
  // StartToCloseTimeout or ScheduleToCloseTimeout must be set
  ActivityOptions options = ActivityOptions.newBuilder()
          .setStartToCloseTimeout(Duration.ofSeconds(5))
          .build();

  // Create an client stub to activities that implement the given interface
  private final BackgroundCheckReplayActivities activities =
      Workflow.newActivityStub(BackgroundCheckReplayActivities.class, options);

  @Override
  public String backgroundCheck(String socialSecurityNumber) {

    // highlight-start
    // CAUTION, the following code is an anti-pattern showing what NOT to do
    Random random = new Random();
    if(random.nextInt(101)>= 50){
      Workflow.sleep(Duration.ofSeconds(60));
    }
    //highlight-end

    // Execute the Activity synchronously (wait for the result before proceeding)
    String ssnTraceResult = activities.ssnTraceActivity(socialSecurityNumber);

    // Make the results of the Workflow available
    return ssnTraceResult;
  }

}

/*
If you run the BackgroundCheckReplayNonDeterministicWorkflow Workflow enough times, eventually you will see a Workflow Task failure.

The Worker logs will show something similar to the following:

```shell
13:47:20.429 WARN  - Workflow task processing failure. startedEventId=8, WorkflowId=test, RunId=20ec9811-89c5-454e-b9ed-c284f19565e4. If seen continuously the workflow might be stuck.
io.temporal.worker.NonDeterministicException: Failure handling event 5 of type 'EVENT_TYPE_TIMER_STARTED' during replay. Event 5 of type EVENT_TYPE_TIMER_STARTED does not match command type COMMAND_TYPE_SCHEDULE_ACTIVITY_TASK. {WorkflowTaskStartedEventId=8, CurrentStartedEventId=3}
        at io.temporal.internal.statemachines.WorkflowStateMachines.handleCommandEvent(WorkflowStateMachines.java:442)
        ...
```

And you will see information about the failure in the Web UI as well.

![Web UI view of a non-determinism error](/img/java/non-deterministic-workflow-task-failure-java.png)

To inspect the Workflow Task failure using the Temporal CLI, you can use the `long` value for the `--fields` command option with the `temporal workflow show` command.

```shell
temporal workflow show \
 --workflow-id backgroundcheck_workflow_break \
 --namespace backgroundcheck_namespace \
 --fields long
```

This will display output similar to the following:

```shell
Progress:
  [95mID[0m  [95m        Time        [0m  [95m          Type          [0m  [95m                                                       Details                                                        [0m  
   1  2023-11-08T19:46:20Z  WorkflowExecutionStarted  {WorkflowType:{Name:BackgroundCheckReplayNonDeterministicWorkflow},                                                     
                                                      ParentInitiatedEventId:0,                                                                                               
                                                      TaskQueue:{Name:backgroundcheck-replay-task-queue-local,                                                                
                                                      Kind:Normal}, WorkflowExecutionTimeout:0s, WorkflowRunTimeout:0s,                                                       
                                                      WorkflowTaskTimeout:10s, Initiator:Unspecified,                                                                         
                                                      OriginalExecutionRunId:20ec9811-89c5-454e-b9ed-c284f19565e4,                                                            
                                                      Identity:temporal-cli:masonegger@Masons-Laptop,                                                                         
                                                      FirstExecutionRunId:20ec9811-89c5-454e-b9ed-c284f19565e4,                                                               
                                                      Attempt:1, FirstWorkflowTaskBackoff:0s,                                                                                 
                                                      ParentInitiatedEventVersion:0, WorkflowId:test}                                                                         
   2  2023-11-08T19:46:20Z  WorkflowTaskScheduled     {TaskQueue:{Name:backgroundcheck-replay-task-queue-local,                                                               
                                                      Kind:Normal}, StartToCloseTimeout:10s, Attempt:1}                                                                       
   3  2023-11-08T19:46:20Z  WorkflowTaskStarted       {ScheduledEventId:2,                                                                                                    
                                                      Identity:78702@Masons-Laptop,                                                                                           
                                                      RequestId:1c9363fe-cc56-4a01-a91c-99337e53b792,                                                                         
                                                      SuggestContinueAsNew:false,                                                                                             
                                                      HistorySizeBytes:680}                                                                                                   
   4  2023-11-08T19:46:20Z  WorkflowTaskCompleted     {ScheduledEventId:2, StartedEventId:3,                                                                                  
                                                      Identity:78702@Masons-Laptop,                                                                                           
                                                      WorkerVersion:{UseVersioning:false},                                                                                    
                                                      MeteringMetadata:{NonfirstLocalActivityExecutionAttempts:0}}                                                            
   5  2023-11-08T19:46:20Z  TimerStarted              {TimerId:3fa5f3b4-3739-38a8-8ec1-1cae375321c0,                                                                          
                                                      StartToFireTimeout:1m0s,                                                                                                
                                                      WorkflowTaskCompletedEventId:4}                                                                                         
   6  2023-11-08T19:47:20Z  TimerFired                {TimerId:3fa5f3b4-3739-38a8-8ec1-1cae375321c0,                                                                          
                                                      StartedEventId:5}                                                                                                       
   7  2023-11-08T19:47:20Z  WorkflowTaskScheduled     {TaskQueue:{Name:78702@Masons-Laptop:b5f929e5-0ef1-481f-8b79-8e0fc94c27fe,                                              
                                                      Kind:Sticky, NormalName:backgroundcheck-replay-task-queue-local},                                                       
                                                      StartToCloseTimeout:10s, Attempt:1}                                                                                     
   8  2023-11-08T19:47:20Z  WorkflowTaskStarted       {ScheduledEventId:7,                                                                                                    
                                                      Identity:79209@Masons-Laptop,                                                                                           
                                                      RequestId:482675a8-8e31-4f05-b1c7-4327649c7fc4,                                                                         
                                                      SuggestContinueAsNew:false,                                                                                             
                                                      HistorySizeBytes:1098}                                                                                                  
   9  2023-11-08T19:47:20Z  WorkflowTaskFailed        {ScheduledEventId:7, StartedEventId:8, Cause:NonDeterministicError, Failure:{Message:Failure handling event 5 of        
                                                      type 'EVENT_TYPE_TIMER_STARTED' during replay. Event 5 of type EVENT_TYPE_TIMER_STARTED does not match command          
                                                      type COMMAND_TYPE_SCHEDULE_ACTIVITY_TASK. {WorkflowTaskStartedEventId=8, CurrentStartedEventId=3}, Source:JavaSDK,      
                                                      StackTrace:io.temporal.internal.statemachines.WorkflowStateMachines.handleCommandEvent(WorkflowStateMachines.java:442)  
                                                      io.temporal. internal.statemachines.WorkflowStateMachines.handleSingleEvent(WorkflowStateMachines.java:346)             
                                                      io.temporal.internal.stat emachines. ... skExecutor.java:105)                                                           
                                                      java.base/java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1144)                               
                                                      java.base /java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:642)                              
                                                      java.base/java.lang.Thread.run(Thread.j ava:1623) ,                                                                     
                                                      FailureInfo:{ApplicationFailureInfo:{Type:io.temporal.worker.NonDeterministicException, NonRetryable:false}}},          
                                                      Identity:79209@Masons-Laptop, ForkEventVersion:0}                                                                       
```
*/

/* @dacx
id: backgroundcheck-replay-intrinsic-non-determinism
title: Intrinsic non-deterministic logic
description: This kind of logic prevents the Workflow code from executing to completion because the Workflow can take a different code path than the one expected from the Event History.
label: intrinsic-non-deterministic-logic
lines: 4-63
tags:
- tests
- replay
- event history
@dacx */

/* @dacx
id: backgroundcheck-replay-inspecting-the-non-deterministic-error
title: Intrinsic non-deterministic logic
description: This kind of logic prevents the Workflow code from executing to completion because the Workflow can take a different code path than the one expected from the Event History.
label: intrinsic-non-deterministic-logic
lines: 65-141
tags:
- tests
- replay
- event history
@dacx */