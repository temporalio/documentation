---
id: what-is-a-payload-converter
title: What is a Payload Converter?
sidebar_label: Payload Converter
description: A Payload Converter serializes data, converting objects/values to bytes and back.
tags:
  - term
  - explanation
---

A Payload Converter serializes data, converting objects/values to bytes and back.

When you request a Workflow Execution through your Client and pass a data input, the input is deserialized using the default Data Converter that runs it through a set of Payload Converters.
When your Workflow Execution starts, this data input is serialized and passed as input to your Workflow.

Some SDKs have a Payload Converter as a part of the Data Converter, that does the conversion from a value to a bytes and back.
See the API reference for more information.

- [Go](https://pkg.go.dev/go.temporal.io/sdk@v1.20.0/converter#PayloadConverter)
- [Java](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/common/converter/PayloadConverter.html)
- [TypeScript](https://typescript.temporal.io/api/classes/common.DefaultPayloadConverter#converters)
- [Python](https://python.temporal.io/temporalio.converter.PayloadConverter.html)

#### Custom Payload Conversion

If you use custom objects or types that are not supported by the Payload Converters provided in the SDKs, you can create a custom Payload Converter and use it with the default Data Converter to run the specific conversions.

You can set multiple custom Payload Converters to run your conversions. However, the order in which encoding payload converters are applied is important because during serialization, each encoding Payload Converter is tried in order until one properly serializes the value.

See [Custom Payload Conversion](/app-dev-context/custom-payload-conversion) for details on how to use the Payload Converter for custom data types.
