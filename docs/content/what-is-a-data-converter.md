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
The default Data Converter ensures data is encoded into a format that is supported by gRPC, a [Payload](https://github.com/temporalio/api/blob/2f980f7ce4349e808b16ec0f21e0fe675f79330f/temporal/api/common/v1/message.proto#L49) protobuf which consists of binary data plus key-value metadata.

### Custom Data Converter

Applications may supply their own custom Data Converter to add extra layers of encoding such as encryption.

This gives application developers the ability to ensure that all data provided to their application is encrypted while moving about the Temporal System and is only transformed back to its original form within a Worker Process that is executing Workflows and Activities on hosts that the application developers control.
