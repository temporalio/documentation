---
id: what-is-a-data-converter
title: What is a Data Converter?
sidebar_label: Data Converter
description: A Data Converter is a Temporal SDK component that encodes and decodes data entering and exiting a Temporal Cluster.
tags:
  - explanation
---

A Data Converter is a Temporal SDK component that encodes and decodes data entering and exiting a Temporal Cluster.

![Data Converter encodes and decodes data](/diagrams/default-data-converter.svg)

Data is encoded before it is sent to a Temporal Cluster, and it is decoded when it is to be used in Workflow Executions or Activity Executions or returned to a process by using an SDK Client.

### Default Data Converter

Each Temporal SDK includes a default Data Converter.
The default Data Converter ensures that data is encoded into a format that is supported by gRPC—specifically, a [Payload](https://github.com/temporalio/api/blob/2f980f7ce4349e808b16ec0f21e0fe675f79330f/temporal/api/common/v1/message.proto#L49) protobuf, which consists of binary data plus key-value metadata.

### Custom Data Converter

Applications can supply their own custom Data Converters to add layers of encoding, such as encryption.

This gives application developers the ability to ensure that all data provided to their application is encrypted while moving in the Temporal System and is transformed back to its original form only within a Worker Process that is executing Workflows and Activities on hosts that the application developers control.

- [How to create a custom Data Converter in Go](/docs/go/how-to-create-a-custom-data-converter-in-go)
