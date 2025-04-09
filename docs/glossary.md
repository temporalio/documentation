---
id: glossary
title: Glossary
description: The following terms have specific definitions within the context of the Temporal Platform.
sidebar_label: Glossary
sidebar_position: 13
toc_max_heading_level: 4
tags:
  - Reference
---

The following terms are used in [Temporal Platform](/temporal) documentation.

#### [Action](/cloud/pricing#action)

An Action is the fundamental pricing unit in Temporal Cloud.
Temporal Actions are the building blocks for Workflow Executions.
When you execute a Temporal Workflow, its Actions create the ongoing state and progress of your Temporal Application.

<!-- _Tags: [term](/tags/term), [pricing](/tags/pricing), [temporal-cloud](/tags/temporal-cloud), [explanation](/tags/explanation)_ -->

#### [Actions Per Second (APS)](/cloud/limits#throughput)

APS, or Actions per second, is specific to Temporal Cloud.
Each Temporal Cloud Namespace enforces a rate limit, which is measured in Actions per second (APS).
This is the number of Actions, such as starting or signaling a Workflow, that can be performed per second within a specific Namespace.

<!-- _Tags: [term](/tags/term), [pricing](/tags/pricing), [temporal-cloud](/tags/temporal-cloud), [explanation](/tags/explanation)_ -->

#### [Activity](/activities)

In day-to-day conversation, the term "Activity" denotes an Activity Type, Activity Definition, or Activity Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Activity Definition](/activity-definition)

An Activity Definition is the code that defines the constraints of an Activity Task Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Activity Execution](/activity-execution)

An Activity Execution is the full chain of Activity Task Executions.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Activity Heartbeat](/encyclopedia/detecting-activity-failures#activity-heartbeat)

An Activity Heartbeat is a ping from the Worker that is executing the Activity to the Temporal Service.

Each ping informs the Temporal Service that the Activity Execution is making progress and the Worker has not crashed.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Activity Id](/activity-execution#activity-id)

A unique identifier for an Activity Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Activity Task](/tasks#activity-task)

An Activity Task contains the context needed to make an Activity Task Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Activity Task Execution](/tasks#activity-task-execution)

An Activity Task Execution occurs when a Worker uses the context provided from the Activity Task and executes the Activity Definition.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Activity Type](/activity-definition#activity-type)

An Activity Type is the mapping of a name to an Activity Definition.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Archival](/temporal-service/archival)

Archival is a feature specific to a Self-hosted Temporal Service that automatically backs up Event Histories from Temporal Service persistence to a custom blob store after the Closed Workflow Execution retention period is reached.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Asynchronous Activity Completion](/activity-execution#asynchronous-activity-completion)

Asynchronous Activity Completion occurs when an external system provides the final result of a computation, started by an Activity, to the Temporal System.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Audit Logging](/cloud/audit-logging)

Audit Logging is a feature that provides forensic access information for accounts, users, and Namespaces.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [temporal-cloud](/tags/temporal-cloud), [operations](/tags/operations)_ -->

#### [Authorizer Plugin](/self-hosted-guide/security#authorizer-plugin)

The `Authorizer` plugin contains a single `Authorize` method, which is invoked for each incoming API call. `Authorize` receives information about the API call, along with the role and permission claims of the caller.

<!-- _Tags: [term](/tags/term)_ -->

#### [Availability Zone](/cloud/high-availability)

An availability zone is a part of the Temporal system where tasks or operations are handled and executed. 
This design helps manage workloads and ensure tasks are completed.
Temporal Cloud Namespaces are automatically distributed across three availability zones, offering the 99.9% uptime outlined in our Cloud [SLA](/cloud/sla). 

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Child Workflow](/child-workflows)

A Child Workflow Execution is a Workflow Execution that is spawned from within another Workflow.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [child-workflow](/tags/child-workflow)_ -->

#### [Claim Mapper](/self-hosted-guide/security#claim-mapper)

The Claim Mapper component is a pluggable component that extracts Claims from JSON Web Tokens (JWTs).

<!-- _Tags: [term](/tags/term)_ -->

#### [Codec Server](/codec-server)

A Codec Server is an HTTP server that uses your custom Payload Codec to encode and decode your data remotely through endpoints.

<!-- _Tags: [term](/tags/term)_ -->

#### [Command](/workflow-execution#command)

A Command is a requested action issued by a Worker to the Temporal Service after a Workflow Task Execution completes.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Continue-As-New](/workflow-execution/continue-as-new)

Continue-As-New is the mechanism by which all relevant state is passed to a new Workflow Execution with a fresh Event History.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [continue-as-new](/tags/continue-as-new)_ -->

#### [Core SDK](https://temporal.io/blog/why-rust-powers-core-sdk)

The Core SDK is a shared common core library used by several Temporal SDKs.
Written in Rust, the Core SDK provides complex concurrency management and state machine logic among its standout features.
Centralizing development enables the Core SDK to support quick and reliable deployment of new features to existing SDKs, and to more easily add new SDK languages to the Temporal ecosystem.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [continue-as-new](/tags/continue-as-new)_ -->

#### [Custom Data Converter](/default-custom-data-converters#custom-data-converter)

A custom Data Converter extends the default Data Converter with custom logic for Payload conversion or Payload encryption.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Data Converter](/dataconversion)

A Data Converter is a Temporal SDK component that serializes and encodes data entering and exiting a Temporal Service.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Default Data Converter](/default-custom-data-converters#default-data-converter)

The default Data Converter is used by the Temporal SDK to convert objects into bytes using a series of Payload Converters.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Delay Workflow Execution](/workflows#delay-workflow-execution)

Start Delay determines the amount of time to wait before initiating a Workflow Execution. If the Workflow receives a Signal-With-Start during the delay, it dispatches a Workflow Task and the remaining delay is bypassed.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [delay-workflow](/tags/delay-workflow)_ -->

#### [Dual Visibility](/dual-visibility)

Dual Visibility is a feature, specific to a Self-hosted Temporal Service, that lets you set a secondary Visibility store in your Temporal Service to facilitate migrating your Visibility data from one database to another.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [filtered-lists](/tags/filtered-lists), [visibility](/tags/visibility)_ -->

#### [Durable Execution](/temporal#durable-execution)

Durable Execution in the context of Temporal refers to the ability of a Workflow Execution to maintain its state and progress even in the face of failures, crashes, or server outages.

<!-- _Tags: [temporal](/tags/temporal), [durable-execution](/tags/durable-execution), [term](/tags/term)_ -->

#### [Dynamic Handler](/dynamic-handler)

Dynamic Handlers are Workflows, Activities, Signals, or Queries that are unnamed and invoked when no other named handler matches the call from the Server at runtime.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Event](/workflows#event)

Events are created by a Temporal Service in response to external occurrences and Commands generated by a Workflow Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Event History](/workflow-execution/event#event-history)

An append-only log of Events that represents the full state a Workflow Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Failback](/cloud/high-availability)

After Temporal Cloud has resolved an outage or incident involving a failover, a failback process shifts Workflow Execution processing back to the original region that was active before the incident.

#### [Failover](/cloud/high-availability)

A failover shifts Workflow Execution processing from an active Temporal Namespace region to a standby Temporal Namespace region during outages or other incidents.
Standby Namespace regions use replication to duplicate data and prevent data loss during failover.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Failure](/temporal#failure)

Temporal Failures are representations of various types of errors that occur in the system.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Failure Converter](/failure-converter)

A Failure Converter converts error objects to proto Failures and back.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Failures](/references/failures)

A Failure is Temporal's representation of various types of errors that occur in the system.

<!-- _Tags: [failure](/tags/failure), [explanation](/tags/explanation), [term](/tags/term)_ -->

#### [Frontend Service](/temporal-service/temporal-server#frontend-service)

The Frontend Service is a stateless gateway service that exposes a strongly typed Proto API. The Frontend Service is responsible for rate limiting, authorizing, validating, and routing all inbound calls.

<!-- _Tags: [term](/tags/term)_ -->

#### [General Availability](/evaluate/development-production-features/release-stages#general-availability)

Learn more about the General Availability release stage

<!-- _Tags: [product-release-stages](/tags/product-release-stages), [term](/tags/term)_ -->

#### [Global Namespace](/global-namespace)

A Global Namespace is a Namespace that duplicates data from an active [Temporal Service](#temporal-cluster) to a standby Service using the replication to keep both Namespaces in sync.
Global Namespaces are designed to respond to service issues like network congestion.
When service to the primary Cluster is compromised, a [failover](#failover) transfers control from the active to the standby cluster.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Heartbeat Timeout](/encyclopedia/detecting-activity-failures#heartbeat-timeout)

A Heartbeat Timeout is the maximum time between Activity Heartbeats.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [timeouts](/tags/timeouts)_ -->

#### [High Availability](/cloud/high-availability/how-it-works#high-availability)

High availability ensures that a system remains operational with minimal downtime.
It achieves this with redundancy and failover mechanisms that handle failures, so end-users remain unaware of incidents.
Temporal Cloud guarantees this high availability with its Service Level Agreements ([SLA](/cloud/sla))

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [timeouts](/tags/timeouts)_ -->

#### [High Availability features](/cloud/high-availability#high-availability-features)

High Availability features automatically synchronize your data between a primary Namespace and its replica, keeping them in sync.
In case of an incident or an outage, Temporal will automatically failover your Namespace from the primary to the replica.
This supports high levels of business continuity, allowing Workflow Executions to continue with minimal interruptions or data loss.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [timeouts](/tags/timeouts)_ -->

#### [History Service](/temporal-service/temporal-server#history-service)

The History Service is responsible for persisting Workflow Execution state and determining what to do next to progress the Workflow Execution through History Shards.

<!-- _Tags: [term](/tags/term)_ -->

#### [History Shard](/temporal-service/temporal-server#history-shard)

A History Shard is an important unit within a Temporal Service by which the scale of concurrent Workflow Execution throughput can be measured.

<!-- _Tags: [term](/tags/term)_ -->

#### [Idempotency](/activity-definition#idempotency)

An "idempotent" approach avoids process duplication that could withdraw money twice or ship extra orders by mistake.
Idempotency keeps operations from producing additional effects, protecting your processes from accidental or repeated actions, for more reliable execution.
Design your activities to succeed once and only once.
Run-once actions maintain data integrity and prevent costly errors.

<!-- _Tags: [term](/tags/term)_ -->

#### [Isolation Domain](/cloud/high-availability/how-it-works)

An isolation domain is a defined area within Temporal Cloud's infrastructure.
It helps contain failures and prevents them from spreading to other parts of the system, providing redundancy and fault tolerance.

<!-- _Tags: [term](/tags/term)_ -->

#### [List Filter](/list-filter)

A List Filter is the SQL-like string that is provided as the parameter to an advanced Visibility List API.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [filtered-lists](/tags/filtered-lists), [visibility](/tags/visibility)_ -->

#### [Local Activity](/local-activity)

A Local Activity is an Activity Execution that executes in the same process as the Workflow Execution that spawns it.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Matching Service](/temporal-service/temporal-server#matching-service)

The Matching Service is responsible for hosting external Task Queues for Task dispatching.

<!-- _Tags: [term](/tags/term)_ -->

#### [Memo](/workflows#memo)

A Memo is a non-indexed user-supplied set of Workflow Execution metadata that is returned when you describe or list Workflow Executions.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Multi-Cluster Replication](/self-hosted-guide/multi-cluster-replication)

Multi-Cluster Replication is a feature which asynchronously replicates Workflow Executions from active Clusters to other passive Clusters, for backup and state reconstruction.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Multi-region Replication](/cloud/high-availability/enable)

Multi-region Replication replicates Workflows and metadata to a different region that is not co-located with the primary Namespace.
This is particularly beneficial for organizations with multi-regional architectures or those required to be highly available across regions for compliance purposes.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Namespace](/namespaces)

A Namespace is a unit of isolation within the Temporal Platform.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### Nexus Async Completion Callback

A Nexus Async Completion Callback is the completion callback for an asynchronous Nexus Operation.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### Nexus Endpoint

A Nexus Endpoint is a reverse proxy that can serve one or more Nexus Services.
It routes Nexus requests to a target Namespace and Task Queue, that a Nexus Worker is polling.
This allows service providers to present a clean service contract and hide the underlying implementation, which may consist of many internal Workflows.
Multiple Nexus Endpoints can target the same Namespace, and over time a Nexus Endpoint will be able to span multiple Namespaces with service routing rules.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### Nexus Machinery

Temporal has built-in Nexus Machinery to guarantee at-least-once execution of Nexus Operations with state-machine-based invocation and completion callbacks.
The Nexus Machinery uses [Nexus RPC](/glossary#nexus-rpc), a protocol designed with Durable Execution in mind, to communicate across Namespace boundaries.
Caller Workflows and Nexus handlers don't have to use Nexus RPC directly, since the Temporal SDK provides a streamlined developer experience to build, run, and use Nexus Services.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### Nexus Operation

An arbitrary-duration operation that may be synchronous or asynchronous, short-lived, or long-lived, and used to connect durable executions within and across Namespaces, clusters, regions, and clouds.
Unlike a traditional RPC, an asynchronous Nexus Operation has an operation token that can be used to re-attach to a long-lived Nexus Operation, for example, one backed by a Temporal Workflow.
Nexus Operations support a uniform interface to get the status of an operation or its result, receive a completion callback, or cancel the operation – all of which are fully integrated into the Temporal Platform.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### Nexus Operation Events

Nexus Operations Events are history events that surface in the Caller Workflow to indicate the state of an Operation including `Nexus Operation Scheduled`, `Nexus Operation Started`, `Nexus Operation Completed`.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->


#### Nexus Operation Handler

The Nexus handler code in a Temporal Worker typically created using Temporal SDK builder functions that make it easy to abstract Temporal primitives and expose a clean service contract for others to use.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->


#### Nexus Registry

The Nexus Registry manages Nexus Endpoints and provides lookup services for resolving Nexus requests at runtime.
In the open source version of Temporal, the Registry is scoped to a Cluster, while in Temporal Cloud, it is scoped to an Account.
Endpoint names must be unique within the Registry.
When the Temporal Service dispatches a Nexus request, it resolves the request's Endpoint to a Namespace and Task Queue through the Registry.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->


#### [Nexus RPC](https://github.com/nexus-rpc/api/blob/main/SPEC.md)

Nexus RPC is a protocol designed with durable execution in mind.
It supports arbitrary-duration Operations that extend beyond a traditional RPC — a key underpinning to connect durable executions within and across Namespaces, clusters, regions, and cloud boundaries.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### Nexus Service

A Nexus Service is a named collection of arbitrary-duration Nexus Operations that provide a microservice contract suitable for sharing across team and application boundaries.
Nexus Services are registered with a Temporal Worker that is polling a Nexus Endpoint's target Namespace and Task Queue.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### Nexus Service Contract

A common code package, schema, or documentation that a Caller can use to obtain Service and Operation names as associated input/output types a Service will accept for a given Operation.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Parent Close Policy](/parent-close-policy)

If a Workflow Execution is a Child Workflow Execution, a Parent Close Policy determines what happens to the Workflow Execution if its Parent Workflow Execution changes to a Closed status (Completed, Failed, Timed out).

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [child-workflow-executions](/tags/child-workflow-executions)_ -->

#### [Payload](/dataconversion#payload)

A Payload represents binary data such as input and output from Activities and Workflows.

<!-- _Tags: [term](/tags/term), [payloads](/tags/payloads), [explanation](/tags/explanation)_ -->

#### [Payload Codec](/payload-codec)

A Payload Codec transforms an array of Payloads into another array of Payloads.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Payload Converter](/payload-converter)

A Payload Converter serializes data, converting objects or values to bytes and back.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Pre-release](/evaluate/development-production-features/release-stages#pre-release)

Learn more about the Pre-release stage

<!-- _Tags: [product-release-stages](/tags/product-release-stages), [term](/tags/term)_ -->

#### [Public Preview](/evaluate/development-production-features/release-stages#public-preview)

Learn more about the Public Preview release stage

<!-- _Tags: [product-release-stages](/tags/product-release-stages), [term](/tags/term)_ -->

#### [Query](/sending-messages#sending-queries)

A Query is a synchronous operation that is used to report the state of a Workflow Execution.

<!-- _Tags: [term](/tags/term), [queries](/tags/queries), [explanation](/tags/explanation)_ -->

#### [Remote data encoding](/remote-data-encoding)

Remote data encoding is using your custom Data Converter to decode (and encode) your Payloads remotely through endpoints.

<!-- _Tags: [term](/tags/term), [queries](/tags/queries), [explanation](/tags/explanation)_ -->

#### [Replication Lag](/cloud/high-availability/monitor)

The transmission delay of Workflow updates and history events from the active region to the standby region.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Requests Per Second (RPS)](/references/dynamic-configuration#service-level-rps-limits)

RPS, or Requests per second, is used in the Temporal Service (both in self-hosted Temporal and Temporal Cloud).
This is a measure that controls the rate of requests at the service level, such as the Frontend, History, or Matching Service.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [temporal](/tags/temporal)_ -->

#### [Reset](/workflows#reset)

A Reset terminates a Workflow Execution, removes the progress in the Event History up to the reset point, and then creates a new Workflow Execution with the same Workflow Type and Id to continue.

<!-- _Tags: [term](/tags/term), [resets](/tags/resets), [explanation](/tags/explanation)_ -->

#### [Retention Period](/temporal-service/temporal-server#retention-period)

A Retention Period is the amount of time a Workflow Execution Event History remains in the Temporal Service's persistence store.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Retry Policy](/encyclopedia/retry-policies)

A Retry Policy is a collection of attributes that instructs the Temporal Server how to retry a failure of a Workflow Execution or an Activity Task Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Run Id](/workflows#run-id)

A Run Id is a globally unique, platform-level identifier for a Workflow Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Same-region Replication](/cloud/high-availability/enable)

Same-region Replication replicates Workflows and metadata to an isolation domain within the same region as the primary Namespace.
It provides a reliable failover mechanism while maintaining deployment simplicity.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Schedule](/schedule)

A Schedule enables the scheduling of Workflow Executions.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Schedule-To-Close Timeout](/encyclopedia/detecting-activity-failures#schedule-to-close-timeout)

A Schedule-To-Close Timeout is the maximum amount of time allowed for the overall Activity Execution, from when the first Activity Task is scheduled to when the last Activity Task, in the chain of Activity Tasks that make up the Activity Execution, reaches a Closed status.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [timeouts](/tags/timeouts)_ -->

#### [Schedule-To-Start Timeout](/encyclopedia/detecting-activity-failures#schedule-to-start-timeout)

A Schedule-To-Start Timeout is the maximum amount of time that is allowed from when an Activity Task is placed in a Task Queue to when a Worker picks it up from the Task Queue.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [timeouts](/tags/timeouts)_ -->

#### [Search Attribute](/search-attribute)

A Search Attribute is an indexed name used in List Filters to filter a list of Workflow Executions that have the Search Attribute in their metadata.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [filtered-lists](/tags/filtered-lists), [visibility](/tags/visibility)_ -->

#### [Side Effect](/workflows#side-effect)

A Side Effect is a way to execute a short, non-deterministic code snippet, such as generating a UUID, that executes the provided function once and records its result into the Workflow Execution Event History.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Signal](/sending-messages#sending-signals)

A Signal is an asynchronous request to a Workflow Execution.

<!-- _Tags: [term](/tags/term), [signals](/tags/signals), [explanation](/tags/explanation)_ -->

#### [Signal-With-Start](/sending-messages#signal-with-start)

Signal-With-Start starts and Signals a Workflow Execution, or just Signals it if it already exists.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Start-To-Close Timeout](/encyclopedia/detecting-activity-failures#start-to-close-timeout)

A Start-To-Close Timeout is the maximum time allowed for a single Activity Task Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [timeouts](/tags/timeouts)_ -->

#### [State Transition](/workflows#state-transition)

A State Transition is a unit of progress by a Workflow Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Sticky Execution](/sticky-execution)

A Sticky Execution is a when a Worker Entity caches the Workflow Execution Event History and creates a dedicated Task Queue to listen on.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Task](/tasks#task)

A Task is the context needed to make progress with a specific Workflow Execution or Activity Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Task Queue](/task-queue)

A Task Queue is a first-in, first-out queue that a Worker Process polls for Tasks.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Task Routing](/task-routing)

Task Routing is when a Task Queue is paired with one or more Worker Processes, primarily for Activity Task Executions.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Task Token](/activity-execution#task-token)

A Task Token is a unique identifier for an Activity Task Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Temporal](/temporal)

Temporal is a scalable and reliable runtime for Reentrant Processes called Temporal Workflow Executions.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Temporal Application](/temporal#temporal-application)

A Temporal Application is a set of Workflow Executions.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Temporal CLI](/cli) {#cli}

The Temporal CLI is the most recent version of Temporal's command-line tool.

<!-- _Tags: [term](/tags/term), [cli](/tags/cli)_ -->

#### [Temporal Client](/encyclopedia/temporal-sdks#temporal-client)

A Temporal Client, provided by a Temporal SDK, provides a set of APIs to communicate with a Temporal Service.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Temporal Cloud](/cloud/overview)

Temporal Cloud is a managed, hosted Temporal environment that provides a platform for Temporal Applications.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Temporal Cloud Account Id](/cloud/namespaces#temporal-cloud-account-id)

A Temporal Cloud Account Id is a unique identifier for a customer.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Temporal Cloud Namespace Id](/cloud/namespaces#temporal-cloud-namespace-id)

A Cloud Namespace Id is a globally unique identifier for a Namespace in Temporal Cloud.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Temporal Cloud Namespace Name](/cloud/namespaces#temporal-cloud-namespace-name)

A Cloud Namespace Name is a customer-supplied name for a Namespace in Temporal Cloud.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Temporal Cloud gRPC Endpoint](/cloud/namespaces#temporal-cloud-grpc-endpoint)

A Cloud gRPC Endpoint is a Namespace-specific address used to access Temporal Cloud from your code.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Temporal Cluster](/temporal-service)
The term "Temporal Cluster" is being phased out.
Instead the term [Temporal Service](#temporal-service) is now being used.

#### [Temporal Service](/temporal-service)

A Temporal Service is a Temporal Server paired with Persistence and Visibility stores.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Temporal Service configuration](/temporal-service/configuration)

Temporal Service configuration is the setup and configuration details of your Temporal Service, defined using YAML.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Temporal Cron Job](/workflows#temporal-cron-job)

A Temporal Cron Job is the series of Workflow Executions that occur when a Cron Schedule is provided in the call to spawn a Workflow Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Temporal Platform](/temporal#temporal-platform)

The Temporal Platform consists of a Temporal Service and Worker Processes.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Temporal SDK](/encyclopedia/temporal-sdks)

A Temporal SDK is a language-specific library that offers APIs to construct and use a Temporal Client to communicate with a Temporal Service, develop Workflow Definitions, and develop Worker Programs.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Temporal Server](/temporal-service/temporal-server)

The Temporal Server is a grouping of four horizontally scalable services.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Temporal Web UI](/web-ui)

The Temporal Web UI provides users with Workflow Execution state and metadata for debugging purposes.

<!-- _Tags: [term](/tags/term), [web-ui](/tags/web-ui)_ -->

#### [Timer](/workflows#timer)

Temporal SDKs offer Timer APIs so that Workflow Executions are deterministic in their handling of time values.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Update](/sending-messages#sending-updates)

An Update is a request to and a response from Workflow Execution.

<!-- _Tags: [term](/tags/term), [updates](/tags/updates), [explanation](/tags/explanation)_ -->

#### [Visibility](/temporal-service/visibility)

The term Visibility, within the Temporal Platform, refers to the subsystems and APIs that enable an operator to view Workflow Executions that currently exist within a Temporal Service.

<!-- _Tags: [term](/tags/term)_ -->

#### [Worker](/workers#worker)

In day-to-day conversations, the term Worker is used to denote both a Worker Program and a Worker Process. Temporal documentation aims to be explicit and differentiate between them.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Worker Entity](/workers#worker-entity)

A Worker Entity is the individual Worker within a Worker Process that listens to a specific Task Queue.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Worker Process](/workers#worker-process)

A Worker Process is responsible for polling a Task Queue, dequeueing a Task, executing your code in response to a Task, and responding to the Temporal Server with the results.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Worker Program](/workers#worker-program)

A Worker Program is the static code that defines the constraints of the Worker Process, developed using the APIs of a Temporal SDK.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Worker Service](/temporal-service/temporal-server#worker-service)

The Worker Service runs background processing for the replication queue, system Workflows, and (in versions older than 1.5.0) the Kafka visibility processor.

<!-- _Tags: [term](/tags/term)_ -->

#### [Worker Session](/task-routing#worker-session)

A Worker Session is a feature provided by some SDKs that provides a straightforward way to ensure that Activity Tasks are executed with the same Worker without requiring you to manually specify Task Queue names.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Workflow](/workflows)

In day-to-day conversations, the term "Workflow" frequently denotes either a Workflow Type, a Workflow Definition, or a Workflow Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Workflow Definition](/workflow-definition)

A Workflow Definition is the code that defines the constraints of a Workflow Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Workflow Execution](/workflow-execution)

A Temporal Workflow Execution is a durable, scalable, reliable, and reactive function execution. It is the main unit of execution of a Temporal Application.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Workflow Execution Timeout](/encyclopedia/detecting-workflow-failures#workflow-execution-timeout)

A Workflow Execution Timeout is the maximum time that a Workflow Execution can be executing (have an Open status) including retries and any usage of Continue As New.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [timeouts](/tags/timeouts)_ -->

#### [Workflow History Export](/cloud/export)

Workflow History export allows users to export Closed Workflow Histories to a user's Cloud Storage Sink.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [temporal-cloud](/tags/temporal-cloud), [operations](/tags/operations)_ -->

#### [Workflow Id](/workflows#workflow-id)

A Workflow Id is a customizable, application-level identifier for a Workflow Execution that is unique to an Open Workflow Execution within a Namespace.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Workflow Id Conflict Policy](/workflows#workflow-id-conflict-policy)

A Workflow Id Conflict Policy determines how to resolve the conflict when spawning a new Workflow Execution with a particular Workflow Id that is used by an Open Workflow Execution already.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Workflow Id Reuse Policy](/workflows#workflow-id-reuse-policy)

A Workflow Id Reuse Policy determines whether a Workflow Execution is allowed to spawn with a particular Workflow Id, if that Workflow Id has been used with a previous, and now Closed, Workflow Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Workflow Run Timeout](/encyclopedia/detecting-workflow-failures#workflow-run-timeout)

This is the maximum amount of time that a single Workflow Run is restricted to.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [timeouts](/tags/timeouts)_ -->

#### [Workflow Task](/tasks#workflow-task)

A Workflow Task is a Task that contains the context needed to make progress with a Workflow Execution.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Workflow Task Execution](/tasks#workflow-task-execution)

A Workflow Task Execution occurs when a Worker picks up a Workflow Task and uses it to make progress on the execution of a Workflow Definition.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

#### [Workflow Task Timeout](/encyclopedia/detecting-workflow-failures#workflow-task-timeout)

A Workflow Task Timeout is the maximum amount of time that the Temporal Server will wait for a Worker to start processing a Workflow Task after the Task has been pulled from the Task Queue.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation), [timeouts](/tags/timeouts)_ -->

#### [Workflow Type](/workflows#workflow-type)

A Workflow Type is a name that maps to a Workflow Definition.

<!-- _Tags: [term](/tags/term), [explanation](/tags/explanation)_ -->

## Deprecated terms

#### tctl (_deprecated_)

tctl is a command-line tool that you can use to interact with a Temporal Service.
It is superseded by the [Temporal CLI utility](#cli).
