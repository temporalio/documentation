---
id: temporal-client-communicating-with-grpc
title: Communicating with the Temporal Server
sidebar_label: gRPC Client Communication
description: Client Communications with the Temporal Server using gRPC
tags:
 - java
 - client
 - temporal client
 - workers
 - applications
---

Every Temporal Cluster, Server, and Namespace uses a gRPC endpoint.
Any mechanism that sends information to the server or retrieves information from the server uses a Temporal Client and its gRPC communication.
gRPC is a Remote Procedure Call framework featuring low latency and high performance.
gRPC provides Temporal with an efficient, language-agnostic communication framework.

The Temporal Client communicates with the Temporal Server in a stateless manner through gRPC APIs.
It does not need to register itself with the Temporal service.
Stateless communication offers notable advantages.
It allows for flexibility and scalability in the execution of tasks.
It also enables the Temporal Service to decompose tasks as needed, without tying those tasks to a particular Client.
