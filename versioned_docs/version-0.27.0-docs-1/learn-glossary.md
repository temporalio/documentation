---
id: learn-glossary
title: Glossary
---

This glossary contains terms that are used with the Temporal product.

### Activity

A business-level function that implements your application logic such as calling
a service or transcoding a media file. An activity usually implements a single
well-defined action; it can be short or long running. An activity can be implemented
as a synchronous method or fully asynchronously involving multiple processes.
An activity can be retried indefinitely according to the provided exponential retry policy.
If for any reason an activity is not completed within the specified timeout, an error is reported to the workflow and the workflow decides how to handle it. There is no limit on potential activity
duration.

### Activity Task

A task that contains an activity invocation information that is delivered to an [activity worker](#activity-worker) through and an [activity task queue](#activity-task-queue). An activity worker upon receiving activity task executes a correponding [activity](#activity)

### Activity Task Queue

Task queue that is used to deliver [activity tasks](#activity-task) to [activity workers](#activity-worker)

### Activity Worker

An object that is executed in the client application and receives [activity tasks](#activity-task) from an [activity task queue](#activity-task-queue) it is subscribed to. Once task is received it invokes a correspondent activity.

### Archival

Archival is a feature that automatically moves [histories](#event-history) from persistence to a blobstore after
the workflow retention period. The purpose of archival is to be able to keep histories as long as needed
while not overwhelming the persistence store. There are two reasons you may want
to keep the histories after the retention period has passed:

1. **Compliance:** For legal reasons, histories may need to be stored for a long period of time.
2. **Debugging:** Old histories can still be accessed for debugging.

### CLI

Temporal command-line interface.

### Client Stub

A client-side proxy used to make remote invocations to an entity that it
represents. For example, to start a workflow, a stub object that represents
this workflow is created through a special API. Then this stub is used to start,
query, or signal the corresponding workflow.

The Go client doesn't use this.

### Decision

Any action taken by the workflow durable function is called a decision. For example:
scheduling an activity, canceling a child workflow, or starting a timer. A [decision task](#decision-task) contains an optional list of decisions. Every decision is recorded in the [event history](#event-history) as an [event](#event).

### Decision Task

Every time a new external event that might affect a workflow state is recorded, a decision task that contains it is added to a [decision-task-queue](#decision-task-queue) and then picked up by a workflow worker. After the new event is handled, the decision task is completed with a list of [decisions](#decision).
Note that handling of a decision task is usually very fast and is not related to duration
of operations that the workflow invokes.

### Decision Task Queue

Task queue that is used to deliver [decision tasks](#decision-task) to [workflow workers](#workflow-worker)

### Event

An indivisible operation performed by your application. For example,
activity_task_started, task_failed, or timer_canceled. Events are recorded in the event history.

### Event History

An append log of events for your application. History is durably persisted
by the Temporal service, enabling seamless recovery of your application state
from crashes or failures. It also serves as an audit log for debugging.

### Local Activity

A [local activity](/docs/learn-activities#local-activities) is an activity that is invoked directly in the same process by a workflow code. It consumes much less resources than a normal activity, but imposes a lot of limitations like low duration and lack of rate limiting.

### Namespace

Temporal is backed by a multi tenant service. The unit of isolation is called a **namespace**. Each namespace acts as a namespace for task queue names as well as workflow Ids. For example, when a workflow is started, it is started in a
specific namespace. Temporal guarantees a unique workflow Id within a namespace, and
supports running workflow executions to use the same workflow Id if they are in
different namespaces. Various configuration options like retention period or archival destination are configured per namespace as well through a special CRUD API or through the Temporal CLI. In the multi-cluster deployment, namespace is a unit of fail-over. Each namespace can only be active on a single Temporal cluster at a time. However, different namespaces can be active in different clusters and can fail-over independently.

### Query

A synchronous (from the caller's point of view) operation that is used to
report a workflow state. Note that a query is inherently read only and cannot
affect a workflow state.

### Run Id

A UUID that a Temporal service assigns to each workflow run. If allowed by
a configured policy, you might be able to re-execute a workflow, after it has
closed or failed, with the same _Workflow Id_. Each such re-execution is called
a run. _Run Id_ is used to uniquely identify a run even if it shares a _Workflow Id_
with others.

### Signal

An external asynchronous request to a workflow. It can be used to deliver
notifications or updates to a running workflow at any point in its existence.

### Task

The context needed to execute a specific activity or workflow state transition.
There are two types of tasks: an [Activity task](#activity-task) and a [Decision task](#decision-task)
(aka workflow task). Note that a single activity execution corresponds to a single activity task,
while a workflow execution employs multiple decision tasks.

### Task Queue

Common name for [activity task queues](#activity-task-queue) and [decision task queues](#decision-task-queue)

### Task Token

A unique correlation Id for a Temporal activity. Activity completion calls take either task token
or Namespace, WorkflowId, ActivityId arguments.

### Worker

Also known as a _worker service_. A service that hosts the workflow and
activity implementations. The worker polls the Temporal service for tasks, performs
those tasks, and communicates task execution results back to the Temporal service.
Worker services are developed, deployed, and operated by Temporal customers.

### Workflow

A fault-oblivious stateful function that orchestrates activities. A _Workflow_ has full control over
which activities are executed, and in which order. A _Workflow_ must not affect
the external world directly, only through activities. What makes workflow code
a _Workflow_ is that its state is preserved by Temporal. Therefore any failure
of a worker process that hosts the workflow code does not affect the workflow
execution. The _Workflow_ continues as if these failures did not happen. At the
same time, activities can fail any moment for any reason. Because workflow code
is fully fault-oblivious, it is guaranteed to get notifications about activity
failures or timeouts and act accordingly. There is no limit on potential workflow
duration.

### Workflow Execution

An instance of a _Workflow_. The instance can be in the process of executing
or it could have already completed execution.

### Workflow Id

A unique identifier for a _Workflow Execution_. Temporal guarantees the
uniqueness of an Id within a namespace. An attempt to start a _Workflow_ with a
duplicate Id results in an **already started** error.

### Workflow Task

Synonym of the [Decision Task](#decision-task).

### Workflow Worker

An object that is executed in the client application and receives [decision tasks](#decision-task) from an [decision task queue](#decision-task-queue) it is subscribed to. Once task is received it is handled by a correponding workflow.
