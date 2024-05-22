---
id: glossary
title: Glossary
description: The following terms have specific definitions within the context of the Temporal Platform.
sidebar_label: Glossary
sidebar_position: 13
toc_max_heading_level: 4
tags:
  - reference
---

The following terms are used in [Temporal Platform](/temporal) documentation.

#### [Action](/cloud/pricing#action)

An Action is the fundamental pricing unit in Temporal Cloud.

_Tags: [term](/tags/term), [pricing](/tags/pricing), [temporal-cloud](/tags/temporal-cloud), [explanation](/tags/explanation)_

#### [Activity](/activities)

In day-to-day conversation, the term "Activity" denotes an Activity Type, Activity Definition, or Activity Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Activity Definition](/activities#activity-definition)

An Activity Definition is the code that defines the constraints of an Activity Task Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Activity Execution](/activities#activity-execution)

An Activity Execution is the full chain of Activity Task Executions.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Activity Heartbeat](/activities#activity-heartbeat)

An Activity Heartbeat is a ping from the Worker that is executing the Activity to the Temporal Service.

Each ping informs the Temporal Service that the Activity Execution is making progress and the Worker has not crashed.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Activity Id](/activities#activity-id)

A unique identifier for an Activity Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Activity Task](/workers#activity-task)

An Activity Task contains the context needed to make an Activity Task Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Activity Task Execution](/workers#activity-task-execution)

An Activity Task Execution occurs when a Worker uses the context provided from the Activity Task and executes the Activity Definition.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Activity Type](/activities#activity-type)

An Activity Type is the mapping of a name to an Activity Definition.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Archival](/clusters#archival)

Archival is a feature specific to a Self-hosted Temporal Service that automatically backs up Event Histories from Temporal Service persistence to a custom blob store after the Closed Workflow Execution retention period is reached.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Asynchronous Activity Completion](/activities#asynchronous-activity-completion)

Asynchronous Activity Completion occurs when an external system provides the final result of a computation, started by an Activity, to the Temporal System.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Audit Logging](/cloud/audit-logging)

Audit Logging is a feature that provides forensic access information for accounts, users, and Namespaces.

_Tags: [term](/tags/term), [explanation](/tags/explanation), [temporal-cloud](/tags/temporal-cloud), [operations](/tags/operations)_

#### [Authorizer Plugin](/self-hosted-guide/security#authorizer-plugin)

The `Authorizer` plugin contains a single `Authorize` method, which is invoked for each incoming API call. `Authorize` receives information about the API call, along with the role and permission claims of the caller.

_Tags: [term](/tags/term)_

#### [Child Workflow](/encyclopedia/child-workflows)

A Child Workflow Execution is a Workflow Execution that is spawned from within another Workflow.

_Tags: [term](/tags/term), [explanation](/tags/explanation), [child-workflow](/tags/child-workflow)_

#### [Claim Mapper](/self-hosted-guide/security#claim-mapper)

The Claim Mapper component is a pluggable component that extracts Claims from JSON Web Tokens (JWTs).

_Tags: [term](/tags/term)_

#### [Codec Server](/dataconversion#codec-server)

A Codec Server is an HTTP server that uses your custom Payload Codec to encode and decode your data remotely through endpoints.

_Tags: [term](/tags/term)_

#### [Command](/workflows#command)

A Command is a requested action issued by a Worker to the Temporal Service after a Workflow Task Execution completes.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Continue-As-New](/workflows#continue-as-new)

Continue-As-New is the mechanism by which all relevant state is passed to a new Workflow Execution with a fresh Event History.

_Tags: [term](/tags/term), [explanation](/tags/explanation), [continue-as-new](/tags/continue-as-new)_

#### [Core SDK](https://temporal.io/blog/why-rust-powers-core-sdk)

The Core SDK is a shared common core library used by several Temporal SDKs.
Written in Rust, the Core SDK provides complex concurrency management and state machine logic among its standout features.
Centralizing development enables the Core SDK to support quick and reliable deployment of new features to existing SDKs, and to more easily add new SDK languages to the Temporal ecosystem.

_Tags: [term](/tags/term), [explanation](/tags/explanation), [continue-as-new](/tags/continue-as-new)_

#### [Custom Data Converter](/dataconversion#custom-data-converter)

A custom Data Converter extends the default Data Converter with custom logic for Payload conversion or Payload encryption.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Data Converter](/dataconversion)

A Data Converter is a Temporal SDK component that serializes and encodes data entering and exiting a Temporal Service.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Default Data Converter](/dataconversion#default-data-converter)

The default Data Converter is used by the Temporal SDK to convert objects into bytes using a series of Payload Converters.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Delay Workflow Execution](/workflows#delay-workflow-execution)

Start Delay determines the amount of time to wait before initiating a Workflow Execution. If the Workflow receives a Signal-With-Start during the delay, it dispatches a Workflow Task and the remaining delay is bypassed.

_Tags: [term](/tags/term), [explanation](/tags/explanation), [delay-workflow](/tags/delay-workflow)_

#### [Dual Visibility](/visibility#dual-visibility)

Dual Visibility is a feature, specific to a Self-hosted Temporal Service, that lets you set a secondary Visibility store in your Temporal Service to facilitate migrating your Visibility data from one database to another.

_Tags: [term](/tags/term), [explanation](/tags/explanation), [filtered-lists](/tags/filtered-lists), [visibility](/tags/visibility)_

#### [Durable Execution](/temporal#durable-execution)

Durable Execution in the context of Temporal refers to the ability of a Workflow Execution to maintain its state and progress even in the face of failures, crashes, or server outages.

_Tags: [temporal](/tags/temporal), [durable-execution](/tags/durable-execution), [term](/tags/term)_

#### [Dynamic Handler](/workflows#dynamic-handler)

Dynamic Handlers are Workflows, Activities, Signals, or Queries that are unnamed and invoked when no other named handler matches the call from the Server at runtime.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Event](/workflows#event)

Events are created by a Temporal Service in response to external occurrences and Commands generated by a Workflow Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Event History](/workflows#event-history)

An append-only log of Events that represents the full state a Workflow Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Failure](/temporal#failure)

Temporal Failures are representations of various types of errors that occur in the system.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Failure Converter](/dataconversion#failure-converter)

A Failure Converter converts error objects to proto Failures and back.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Failures](/references/failures)

A Failure is Temporal's representation of various types of errors that occur in the system.

_Tags: [failure](/tags/failure), [explanation](/tags/explanation), [term](/tags/term)_

#### [Frontend Service](/clusters#frontend-service)

The Frontend Service is a stateless gateway service that exposes a strongly typed Proto API. The Frontend Service is responsible for rate limiting, authorizing, validating, and routing all inbound calls.

_Tags: [term](/tags/term)_

#### [General Availability](/evaluate/release-stages#general-availability)

Learn more about the General Availability release stage

_Tags: [product-release-stages](/tags/product-release-stages), [term](/tags/term)_

#### [Global Namespace](/namespaces#global-namespace)

A Global Namespace is a Namespace that exists across Clusters when Multi-Cluster Replication is set up.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Heartbeat Timeout](/activities#heartbeat-timeout)

A Heartbeat Timeout is the maximum time between Activity Heartbeats.

_Tags: [term](/tags/term), [explanation](/tags/explanation), [timeouts](/tags/timeouts)_

#### [History Service](/clusters#history-service)

The History Service is responsible for persisting Workflow Execution state and determining what to do next to progress the Workflow Execution through History Shards.

_Tags: [term](/tags/term)_

#### [History Shard](/clusters#history-shard)

A History Shard is an important unit within a Temporal Service by which the scale of concurrent Workflow Execution throughput can be measured.

_Tags: [term](/tags/term)_

#### [List Filter](/visibility#list-filter)

A List Filter is the SQL-like string that is provided as the parameter to an advanced Visibility List API.

_Tags: [term](/tags/term), [explanation](/tags/explanation), [filtered-lists](/tags/filtered-lists), [visibility](/tags/visibility)_

#### [Local Activity](/activities#local-activity)

A Local Activity is an Activity Execution that executes in the same process as the Workflow Execution that spawns it.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Matching Service](/clusters#matching-service)

The Matching Service is responsible for hosting external Task Queues for Task dispatching.

_Tags: [term](/tags/term)_

#### [Memo](/workflows#memo)

A Memo is a non-indexed user-supplied set of Workflow Execution metadata that is returned when you describe or list Workflow Executions.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Multi-Cluster Replication](/self-hosted-guide/multi-cluster-replication)

Multi-Cluster Replication is a feature which asynchronously replicates Workflow Executions from active Clusters to other passive Clusters, for backup and state reconstruction.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Namespace](/namespaces)

A Namespace is a unit of isolation within the Temporal Platform

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Parent Close Policy](/encyclopedia/child-workflows#parent-close-policy)

If a Workflow Execution is a Child Workflow Execution, a Parent Close Policy determines what happens to the Workflow Execution if its Parent Workflow Execution changes to a Closed status (Completed, Failed, Timed out).

_Tags: [term](/tags/term), [explanation](/tags/explanation), [child-workflow-executions](/tags/child-workflow-executions)_

#### [Payload](/dataconversion#payload)

A Payload represents binary data such as input and output from Activities and Workflows.

_Tags: [term](/tags/term), [payloads](/tags/payloads), [explanation](/tags/explanation)_

#### [Payload Codec](/dataconversion#payload-codec)

A Payload Codec transforms an array of Payloads into another array of Payloads.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Payload Converter](/dataconversion#payload-converter)

A Payload Converter serializes data, converting objects or values to bytes and back.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Pre-release](/evaluate/release-stages#pre-release)

Learn more about the Pre-release stage

_Tags: [product-release-stages](/tags/product-release-stages), [term](/tags/term)_

#### [Public Preview](/evaluate/release-stages#public-preview)

Learn more about the Public Preview release stage

_Tags: [product-release-stages](/tags/product-release-stages), [term](/tags/term)_

#### [Query](/workflows#query)

A Query is a synchronous operation that is used to report the state of a Workflow Execution.

_Tags: [term](/tags/term), [queries](/tags/queries), [explanation](/tags/explanation)_

#### [Remote data encoding](/dataconversion#remote-data-encoding)

Remote data encding is using your custom Data Converter to decode (and encode) your Payloads remotely through endpoints.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Reset](/workflows#reset)

A Reset terminates a Workflow Execution, removes the progress in the Event History up to the reset point, and then creates a new Workflow Execution with the same Workflow Type and Id to continue.

_Tags: [term](/tags/term), [resets](/tags/resets), [explanation](/tags/explanation)_

#### [Retention Period](/clusters#retention-period)

A Retention Period is the amount of time a Workflow Execution Event History remains in the Temporal Service's persistence store.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Retry Policy](/retry-policies)

A Retry Policy is a collection of attributes that instructs the Temporal Server how to retry a failure of a Workflow Execution or an Activity Task Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Run Id](/workflows#run-id)

A Run Id is a globally unique, platform-level identifier for a Workflow Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Schedule](/workflows#schedule)

A Schedule enables the scheduling of Workflow Executions.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Schedule-To-Close Timeout](/activities#schedule-to-close-timeout)

A Schedule-To-Close Timeout is the maximum amount of time allowed for the overall Activity Execution, from when the first Activity Task is scheduled to when the last Activity Task, in the chain of Activity Tasks that make up the Activity Execution, reaches a Closed status.

_Tags: [term](/tags/term), [explanation](/tags/explanation), [timeouts](/tags/timeouts)_

#### [Schedule-To-Start Timeout](/activities#schedule-to-start-timeout)

A Schedule-To-Start Timeout is the maximum amount of time that is allowed from when an Activity Task is placed in a Task Queue to when a Worker picks it up from the Task Queue.

_Tags: [term](/tags/term), [explanation](/tags/explanation), [timeouts](/tags/timeouts)_

#### [Search Attribute](/visibility#search-attribute)

A Search Attribute is an indexed name used in List Filters to filter a list of Workflow Executions that have the Search Attribute in their metadata.

_Tags: [term](/tags/term), [explanation](/tags/explanation), [filtered-lists](/tags/filtered-lists), [visibility](/tags/visibility)_

#### [Side Effect](/workflows#side-effect)

A Side Effect is a way to execute a short, non-deterministic code snippet, such as generating a UUID, that executes the provided function once and records its result into the Workflow Execution Event History.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Signal](/workflows#signal)

A Signal is an asynchronous request to a Workflow Execution.

_Tags: [term](/tags/term), [signals](/tags/signals), [explanation](/tags/explanation)_

#### [Signal-With-Start](/workflows#signal-with-start)

Signal-With-Start starts and Signals a Workflow Execution, or just Signals it if it already exists.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Start-To-Close Timeout](/activities#start-to-close-timeout)

A Start-To-Close Timeout is the maximum time allowed for a single Activity Task Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation), [timeouts](/tags/timeouts)_

#### [State Transition](/workflows#state-transition)

A State Transition is a unit of progress by a Workflow Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Sticky Execution](/workers#sticky-execution)

A Sticky Execution is a when a Worker Entity caches the Workflow Execution Event History and creates a dedicated Task Queue to listen on.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Task](/workers#task)

A Task is the context needed to make progress with a specific Workflow Execution or Activity Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Task Queue](/workers#task-queue)

A Task Queue is a first-in, first-out queue that a Worker Process polls for Tasks.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Task Routing](/workers#task-routing)

Task Routing is when a Task Queue is paired with one or more Worker Processes, primarily for Activity Task Executions.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Task Token](/activities#task-token)

A Task Token is a unique identifier for an Activity Task Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Temporal](/temporal)

Temporal is a scalable and reliable runtime for Reentrant Processes called Temporal Workflow Executions.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Temporal Application](/temporal#temporal-application)

A Temporal Application is a set of Workflow Executions.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Temporal CLI](/cli) {#cli}

The Temporal CLI is the most recent version of Temporal's command-line tool.

_Tags: [term](/tags/term), [cli](/tags/cli)_

#### [Temporal Client](/encyclopedia/temporal-sdks#temporal-client)

A Temporal Client, provided by a Temporal SDK, provides a set of APIs to communicate with a Temporal Service.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Temporal Cloud](/cloud/overview)

Temporal Cloud is a managed, hosted Temporal environment that provides a platform for Temporal Applications.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Temporal Cloud Account Id](/cloud/namespaces#temporal-cloud-account-id)

A Temporal Cloud Account Id is a unique identifier for a customer.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Temporal Cloud Namespace Id](/cloud/namespaces#temporal-cloud-namespace-id)

A Cloud Namespace Id is a globally unique identifier for a Namespace in Temporal Cloud.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Temporal Cloud Namespace Name](/cloud/namespaces#temporal-cloud-namespace-name)

A Cloud Namespace Name is a customer-supplied name for a Namespace in Temporal Cloud.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Temporal Cloud gRPC Endpoint](/cloud/namespaces#temporal-cloud-grpc-endpoint)

A Cloud gRPC Endpoint is a Namespace-specific address used to access Temporal Cloud from your code.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Temporal Cluster](/clusters)
The term "Temporal Cluster" is being phased out.
Instead the term [Temporal Service](#temporal-service) is now being used.

#### [Temporal Service](/clusters)

A Temporal Service is a Temporal Server paired with Persistence and Visibility stores.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Temporal Service configuration](/clusters#cluster-configuration)

Temporal Service configuration is the setup and configuration details of your Temporal Service, defined using YAML.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Temporal Cron Job](/workflows#temporal-cron-job)

A Temporal Cron Job is the series of Workflow Executions that occur when a Cron Schedule is provided in the call to spawn a Workflow Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Temporal Platform](/temporal#temporal-platform)

The Temporal Platform consists of a Temporal Service and Worker Processes.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Temporal SDK](/encyclopedia/temporal-sdks)

A Temporal SDK is a language-specific library that offers APIs to construct and use a Temporal Client to communicate with a Temporal Service, develop Workflow Definitions, and develop Worker Programs.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Temporal Server](/clusters#temporal-server)

The Temporal Server is a grouping of four horizontally scalable services.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_


#### [Temporal Web UI](/web-ui)

The Temporal Web UI provides users with Workflow Execution state and metadata for debugging purposes.

_Tags: [term](/tags/term), [web-ui](/tags/web-ui)_

#### [Timer](/workflows#timer)

Temporal SDKs offer Timer APIs so that Workflow Executions are deterministic in their handling of time values.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Update](/workflows#update)

An Update is a request to and a response from Workflow Execution.

_Tags: [term](/tags/term), [updates](/tags/updates), [explanation](/tags/explanation)_

#### [Visibility](/clusters#visibility)

The term Visibility, within the Temporal Platform, refers to the subsystems and APIs that enable an operator to view Workflow Executions that currently exist within a Temporal Service.

_Tags: [term](/tags/term)_

#### [Worker](/workers#worker)

In day-to-day conversations, the term Worker is used to denote both a Worker Program and a Worker Process. Temporal documentation aims to be explicit and differentiate between them.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Worker Entity](/workers#worker-entity)

A Worker Entity is the individual Worker within a Worker Process that listens to a specific Task Queue.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Worker Process](/workers#worker-process)

A Worker Process is responsible for polling a Task Queue, dequeueing a Task, executing your code in response to a Task, and responding to the Temporal Server with the results.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Worker Program](/workers#worker-program)

A Worker Program is the static code that defines the constraints of the Worker Process, developed using the APIs of a Temporal SDK.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Worker Service](/clusters#worker-service)

The Worker Service runs background processing for the replication queue, system Workflows, and (in versions older than 1.5.0) the Kafka visibility processor.

_Tags: [term](/tags/term)_

#### [Worker Session](/workers#worker-session)

A Worker Session is a feature provided by some SDKs that provides a straightforward way to ensure that Activity Tasks are executed with the same Worker without requiring you to manually specify Task Queue names.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Workflow](/workflows)

In day-to-day conversations, the term "Workflow" frequently denotes either a Workflow Type, a Workflow Definition, or a Workflow Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Workflow Definition](/workflows#workflow-definition)

A Workflow Definition is the code that defines the constraints of a Workflow Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Workflow Execution](/workflows#workflow-execution)

A Temporal Workflow Execution is a durable, scalable, reliable, and reactive function execution. It is the main unit of execution of a Temporal Application.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Workflow Execution Timeout](/workflows#workflow-execution-timeout)

A Workflow Execution Timeout is the maximum time that a Workflow Execution can be executing (have an Open status) including retries and any usage of Continue As New.

_Tags: [term](/tags/term), [explanation](/tags/explanation), [timeouts](/tags/timeouts)_

#### [Workflow History Export](/cloud/export)

Workflow History export allows users to export Closed Workflow Histories to a user's Cloud Storage Sink

_Tags: [term](/tags/term), [explanation](/tags/explanation), [temporal-cloud](/tags/temporal-cloud), [operations](/tags/operations)_

#### [Workflow Id](/workflows#workflow-id)

A Workflow Id is a customizable, application-level identifier for a Workflow Execution that is unique to an Open Workflow Execution within a Namespace.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Workflow Id Reuse Policy](/workflows#workflow-id-reuse-policy)

A Workflow Id Reuse Policy determines whether a Workflow Execution is allowed to spawn with a particular Workflow Id, if that Workflow Id has been used with a previous, and now Closed, Workflow Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Workflow Run Timeout](/workflows#workflow-run-timeout)

This is the maximum amount of time that a single Workflow Run is restricted to.

_Tags: [term](/tags/term), [explanation](/tags/explanation), [timeouts](/tags/timeouts)_

#### [Workflow Task](/workers#workflow-task)

A Workflow Task is a Task that contains the context needed to make progress with a Workflow Execution.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Workflow Task Execution](/workers#workflow-task-execution)

A Workflow Task Execution occurs when a Worker picks up a Workflow Task and uses it to make progress on the execution of a Workflow Definition.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### [Workflow Task Timeout](/workflows#workflow-task-timeout)

A Workflow Task Timeout is the maximum amount of time that the Temporal Server will wait for a Worker to start processing a Workflow Task after the Task has been pulled from the Task Queue.

_Tags: [term](/tags/term), [explanation](/tags/explanation), [timeouts](/tags/timeouts)_

#### [Workflow Type](/workflows#workflow-type)

A Workflow Type is a name that maps to a Workflow Definition.

_Tags: [term](/tags/term), [explanation](/tags/explanation)_

#### tctl (_deprecated_)

tctl is a command-line tool that you can use to interact with a Temporal Service.
It is superceded by the [Temporal CLI utility](#cli)
