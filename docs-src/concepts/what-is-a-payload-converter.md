---
id: what-is-a-payload-converter
title: What is a Payload Converter?
sidebar_label: Payload Converter
description: A Payload Converter serializes data, converting objects or values to bytes and back.
tags:
  - term
  - explanation
---

A Payload Converter serializes data, converting values to bytes and back.

When you request a Workflow Execution through your Client and pass a data input, the input is serialized using a Data Converter that runs it through a set of Payload Converters.
When your Workflow Execution starts, this data input is deserialized and passed as input to your Workflow.

See the API reference for more information.

- [Go](https://pkg.go.dev/go.temporal.io/sdk@v1.20.0/converter#PayloadConverter)
- [Java](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/PayloadConverter.html)
- [Python](https://python.temporal.io/temporalio.converter.PayloadConverter.html)
- [TypeScript](https://typescript.temporal.io/api/interfaces/common.PayloadConverter)

#### Custom payload conversion

If you use custom objects or types that are not supported by the Payload Converters provided in the SDKs, you can create a custom Payload Converter and use it with a Data Converter to run the specific conversions.

You can set multiple custom Payload Converters to run your conversions.
However, the order in which encoding Payload Converters are applied is important because during serialization, each encoding Payload Converter is tried in sequence until one properly serializes the value.

See [Custom Payload Conversion](/app-dev-context/custom-payload-conversion) for details on how to use the Payload Converter for custom data types.
