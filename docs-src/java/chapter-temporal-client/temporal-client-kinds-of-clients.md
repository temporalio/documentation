---
id: temporal-client-prepare-for-icloud
title: Temporal Cloud Prerequisites
sidebar_label: Prerequisites
description: Prepare the information you need to use Temporal Cloud with Java Clients.
tags:
 - java
 - client
 - temporal client
 - workers
 - applications
---

Temporal Client: This is a set of APIs provided by a Temporal SDK that enables communication with a Temporal Cluster. It allows you to perform operations such as getting the result of Workflow Execution, listing Workflow Executions, querying a Workflow Execution, signaling a Workflow Execution, and starting a Workflow Execution [source].

A Workflow Client is a component provided by the Temporal SDK that helps with client-side APIs and is required by Workers. It is used to establish a connection with the Temporal Frontend Service and to interact with it.

Signaling Client: While the term "Signaling Client" is not explicitly defined in the provided sources, in the context of Temporal, signaling a workflow is one of the operations that a Temporal Client can perform. Signaling is a way to send data to a workflow execution, which can be useful for pausing, resuming, or cancelling running workflows, among other things.

Scheduling Client: In the Java SDK, the ScheduleClient is an interface to the Temporal service used to create, list, and get handles to Schedules [source]. This suggests that a Scheduling Client is a specialized type of client used for operations related to scheduling.
