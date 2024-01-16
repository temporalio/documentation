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

For more information, see the API references.

- [Go](https://pkg.go.dev/go.temporal.io/sdk/converter#PayloadConverter)
- [Java](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/PayloadConverter.html)
- [Python](https://python.temporal.io/temporalio.converter.PayloadConverter.html)
- [TypeScript](https://typescript.temporal.io/api/interfaces/common.PayloadConverter)

For supported values, see [default Data Converter](/concepts/what-is-a-data-converter#default-data-converter).

#### Custom payload conversion

If you use custom objects or types that are not supported by the Payload Converters provided in the SDKs, you can create a custom Payload Converter and configure the Data Converter with it to run the specific conversions.

You can set multiple encoding Payload Converters to run your conversions.
When the Data Converter receives a value for conversion, it passes through each Payload Converter in sequence until the converter that handles the data type does the conversion.

For details on how to use the Payload Converter for custom data types, see Custom Payload Conversion in the following langauages:

- [How to implement custom Payload convesion in Go](/go/custom-payload-conversion)
- [How to implement custom Payload conversion in Java](/java/custom-payload-conversion)
