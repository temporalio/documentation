---
id: how-to-set-clientoptions-in-go
title: How to set ClientOptions in Go
sidebar_label: ClientOptions
description: TODO
tags:
  - go
  - developer-guide
---

- Options for client creation

| Field | Description | Type |
| --- | ----------------------------------------------------------------------------------------------------------- | ----------------------- |
| HostPort           | Set the host:port for this client to connect to                                                             | string                  |
| Namespace          | Set the namespace name for this client to work with                                                         | string                  |
| Logger             | Sets the logger framework                                                                                   | log.Logger              |
| MetricsScope       | Sets the metric scope, which metrics should be reported                                                     | tally.Scope             |
| Identity           | Sets an identify that can be used to track this host for debugging                                          | string                  |
| DataConverter      | Sets DataConverter to customize serialization/deserialization of arguments in Temporal                      | converter.DataConverter |
| Tracer             | Sets opentracing Tracer that is to be used to emit tracing information                                      | opentracing.Tracer      |
| ContextPropagators | Sets ContextPropagators that allows users to control the context information passed through a workflow      | []ContextPropagator     |
| ConnectionOptions  | Sets options for server connection that allow users to control features of connections such as TLS settings | ConnectionOptions       |
| HeadersProvider    | Sets custom request headers                                                                                 | HeadersProvider         |
| TrafficController  | Set to induce artificial failures in test scenarios                                                         | TrafficController       |
