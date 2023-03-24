---
id: how-to-set-workflowservicestuboptions-in-java
title: How to set WorkflowServiceStubOptions in Java
sidebar_label: WorkflowServiceStubOptions
description: Set `WorkflowServiceStub` specific options with the `WorkflowServiceStubOptions` class.
tags:
  - java
  - developer-guide
---

Set `WorkflowServiceStub`-specific options with the `WorkflowServiceStubOptions` class.
The following table lists the options used to configure `WorkflowServiceStub`.

| Option                             | Description                                                                 | Type            |
| ---------------------------------- | --------------------------------------------------------------------------- | --------------- |
| setChannel                         | Sets gRPC channel to use. Exclusive with target and sslContext              | ManagedChannel  |
| setSslContext                      | Sets gRPC SSL Context to use                                                | SslContext      |
| setEnableHttps                     | Sets option to enable SSL/TLS/HTTPS for gRPC                                | boolean         |
| setTarget                          | Sets a target string                                                        | String          |
| setRpcTimeout                      | Sets the rpc timeout value for non query and non long poll calls            | Duration        |
| setRpcLongPollTimeout              | Sets the rpc timeout value                                                  | Duration        |
| setRpcQueryTimeout                 | Sets the rpc timeout for queries                                            | Duration        |
| setRpcRetryOptions                 | Set the rpc retry options                                                   | RpcRetryOptions |
| setConnectionBackoffResetFrequency | Sets frequency at which gRPC connection backoff should be reset practically | Duration        |
| setGrpcReconnectFrequency          | Sets frequency at which gRPC channel will be moved into an idle state       | Duration        |
| setQueryRpcTimeout                 | Set the query rpc options                                                   | Duration        |
| setHeaders                         | Set the headers                                                             | Metadata        |
| setBlockingStubInterceptor         | Set blocking stub interceptor                                               | Function        |
| setFutureStubInterceptor           | Set the future stub interceptor                                             | Function        |
| setMetricsScope                    | Set the metric scope                                                        | Scope           |
| setEnableKeepAlive                 | Set keep alive ping from client to the server                               | boolean         |
| setKeepAliveTime                   | Set the keep alive time                                                     | Duration        |
| setKeepAliveTimeout                | Set the keep alive timeout                                                  | Duration        |
| setKeepAlivePermitWithoutStream    | Set if client sends keepalive pings even with no active RPCs                | boolean         |
