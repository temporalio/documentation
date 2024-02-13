---
id: what-is-a-data-converter
title: What is a Data Converter?
sidebar_label: Data Converter
description: A Data Converter is a Temporal SDK component that serializes and encodes data entering and exiting a Temporal Cluster.
tags:
  - term
  - explanation
---

Data Converters in Temporal are SDK components that handle the serialization and encoding of data entering and exiting a Temporal Cluster.
Workflow input and output need to be serialized and deserialized so they can be sent as JSON to the Temporal Cluster.

![Data Converter encodes and decodes data](/diagrams/default-data-converter.svg)

The Data Converter encodes data from your application to a [Payload](/concepts/what-is-a-payload) before it is sent to the Temporal Cluster in the Client call.
When the Temporal Server sends the encoded data back to the Worker, the Data Converter decodes it for processing within your application.
This ensures that all your sensitive data exists in its original format only on hosts that you control.

Data Converter steps are followed when data is sent to the Temporal Cluster (as input to a Workflow) and when it is returned from a Workflow (as output).
Due to how Temporal provides access to Workflow output, this implementation is asymmetric:

- Data encoding is performed automatically using the default converter provided by Temporal or your custom Data Converter when passing input to the Temporal Cluster. For example, plain text input is usually serialized into a JSON object.
- Data decoding may be performed by your application logic during your Workflows or Activities as necessary, but decoded Workflow results are never persisted back to the Temporal Cluster. Instead, they are stored encoded on the Cluster, and you need to provide an additional parameter when using [`temporal workflow show`](/cli/workflow/show) or when browsing the Web UI to view output.

Each piece of data (like a single argument or return value) is encoded as a [Payload](/concepts/what-is-a-payload), which consists of binary data and key-value metadata.

For details, see the API references:

- [Go](https://pkg.go.dev/go.temporal.io/sdk/converter#DataConverter)
- [Java](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/DataConverter.html)
- [Python](https://python.temporal.io/temporalio.converter.DataConverter.html)
- [TypeScript](https://typescript.temporal.io/api/interfaces/common.DataConverter)
