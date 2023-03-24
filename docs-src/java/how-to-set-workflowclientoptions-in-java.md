---
id: how-to-set-workflowclientoptions-in-java
title: How to set WorkflowClientOptions in Java
sidebar_label: WorkflowClientOptions
description: Set `WorkflowClient` specific options with the `WorkflowClientOptions` class.
tags:
  - java
  - developer-guide
---

Set `WorkflowClient` specific options with the `WorkflowClientOptions` class.

The following table lists the options used to configure `WorkflowClient`.

| Option                  | Description                                                                       | Type                        |
| ----------------------- | --------------------------------------------------------------------------------- | --------------------------- |
| setDataConverter        | Set data converter                                                                | DataConverter               |
| setInterceptors         | Set interceptors used to intercept Workflow Client calls                          | WorkflowClientInterceptor[] |
| setIdentity             | Set human-readable identity of the Worker                                         | String                      |
| setBinaryChecksum       | Set Worker binary checksum                                                        | String                      |
| setContextPropagators   | Set the Context Propagators                                                       | List< ContextPropagator >   |
| setQueryRejectCondition | Set conditions for when a Query should be rejected by closed and failed Workflows | QueryRejectCondition        |
