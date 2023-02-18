---
id: what-is-a-data-converter
title: What is a Data Converter?
sidebar_label: Data Converter
description: A Data Converter is a Temporal SDK component that serializes and encodes data entering, stored on, and exiting a Temporal Cluster.
tags:
  - term
  - explanation
---

A Data Converter is a Temporal SDK component that serializes and encodes data entering, stored on, and exiting a Temporal Cluster.
It is used by the Temporal SDK framework to serialize/deserialize input and output of Activities and Workflows that need to be sent over the wire to the Temporal Cluster.

![Data Converter encodes and decodes data](/diagrams/default-data-converter.svg)

The Data Converter encodes all data from your application before it is sent to the Temporal Cluster in the Client call. When the Temporal Server sends the encoded data back to the Worker, the Data Converter decodes the data for processing within your application. This ensures that all your sensitive data exists in its original format only on hosts that you control.

The main pieces of data that run through the Data Converter are arguments and return values:

- The Client:
  - Encodes Workflow, Signal, and Query arguments.
  - Decodes Workflow and Query return values.
- The Worker:
  - Decodes Workflow, Signal, and Query arguments.
  - Encodes Workflow and Query return values.
  - Decodes and encodes Activity arguments and return values.

Each piece of data (like a single argument or return value) is encoded as a [Payload](https://api-docs.temporal.io/#temporal.api.common.v1.Payload) Protobuf message, which consists of binary data and key-value metadata.
