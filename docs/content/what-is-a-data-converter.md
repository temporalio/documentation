---
id: what-is-a-data-converter
title: What is a Data Converter
description: A Data Converter is a Temporal SDK component that encodes and decodes data entering and exiting a Temporal Cluster.
tags:
  - explanation
---

import CenteredImage from "../components/CenteredImage.js"

A Data Converter is a Temporal SDK component that encodes and decodes data entering and exiting a Temporal Cluster.

<CenteredImage
imagePath="/diagrams/default-data-converter.svg"
imageSize="100"
title="Data Converter encodes and decodes data"
/>

Data is encoded before it is sent to a Temporal Cluster, and it is decoded when it is to be used in Workflow Executions or Activity Executions or returned to a process by using an SDK Client.

### Default Data Converter

Each Temporal SDK includes a default Data Converter.
The default Data Converter ensures that data is encoded into a format that is supported by gRPC—specifically, a [Payload](https://github.com/temporalio/api/blob/2f980f7ce4349e808b16ec0f21e0fe675f79330f/temporal/api/common/v1/message.proto#L49) protobuf, which consists of binary data plus key-value metadata.

### Custom Data Converter

Applications can supply their own custom Data Converters to add layers of encoding, such as encryption.

This gives application developers the ability to ensure that all data provided to their application is encrypted while moving in the Temporal System and is transformed back to its original form only within a Worker Process that is executing Workflows and Activities on hosts that the application developers control.

Workflow method arguments and return values are serializable to a [Payload](https://github.com/temporalio/api/blob/4c2f6a281fa3fde8b0a24447de3e0d0f47d230b4/temporal/api/common/v1/message.proto#L49) protobuf that contains a bytearray as well as metadata map. You can use <a href={props.href}>the SDK's DataConverter interface</a> to do this.
The default implementation uses JSON serializer, but you can use any alternative serialization mechanism.

The values passed to Workflows through invocation parameters or returned through a result value are recorded in the execution history.

Even though Workflow execution history is cached in the Workers, in the case of Worker failure, the full execution history has to be transferred from the Temporal service to the Workflow Workers.

In those cases a large execution history could adversely impact the performance of your Workflow. Be mindful of the amount of data that you transfer via Activity invocation parameters or return values.
Otherwise, no additional limitations exist on Activity implementations.

We discuss how to work around the history size limitations with `ContinueAsNew` in the <a href={props.continueAsNewURL}>Large Event Histories</a> section.
