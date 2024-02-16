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

When you initiate a Workflow Execution through a Client and pass data as input, the input is serialized using a Data Converter that runs it through a set of Payload Converters.
When your Workflow Execution starts, this data input is deserialized and passed as input to your Workflow.

#### Composite Data Converters

A Composite Data Converter is used to apply custom, type-specific Payload Converters in a specified order.
A Composite Data Converter can be comprised of custom rules that you created, and it can also leverage the default Data Converters built into Temporal.
In fact, the default Data Converter logic is implemented internally in the Temporal source as a Composite Data Converter. It defines these rules in this order:

```go
defaultDataConverter = NewCompositeDataConverter(
    NewNilPayloadConverter(),
    NewByteSlicePayloadConverter(),
    NewProtoJSONPayloadConverter(),
    NewProtoPayloadConverter(),
    NewJSONPayloadConverter(),
)
```

The order in which the Payload Converters are applied is important.
During serialization, the Data Converter tries the Payload Converters in that specific order until a Payload Converter returns a non-nil Payload.
A custom PayloadConverter must implement the functions:

- `FromPayload` (for a single value) or
- `FromPayloads` (for a list of values) to convert to values from a Payload, and
- `ToPayload` (for a single value) or
- `ToPayloads` (for a list of values) to convert values to a Payload.

Defining a new Composite Data Converter is not necessary to use a Custom Data Converter. To keep your code more manageable, you can override the default Converter to use your Codec instead.
