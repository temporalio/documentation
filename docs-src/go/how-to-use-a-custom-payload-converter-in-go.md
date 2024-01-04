---
id: how-to-use-a-custom-payload-converter-in-go
title: How to use a custom Payload Converter in Go
sidebar_label: Custom Payload Converter
description: Use a `CompositeDataConverter` to apply custom `PayloadConverter` in a specified order.
tags:
  - go sdk
  - developer-guide-doc-type
  - data converter
  - payload converter
  - how-to-doc-type
---

Use [CompositeDataConverter](https://pkg.go.dev/go.temporal.io/sdk/converter#CompositeDataConverter) to apply custom, type-specific Payload Converters in a specified order.

`NewCompositeDataConverter` creates a new instance of `CompositeDataConverter` from an ordered list of type-specific Payload Converters.
The following type-specific Payload Converters are available in the Go SDK, listed in the order that they are applied by the default Data Converter:

- [NewNilPayloadConverter()](https://pkg.go.dev/go.temporal.io/sdk/converter#NilPayloadConverter.ToString)
- [NewByteSlicePayloadConverter()](https://pkg.go.dev/go.temporal.io/sdk/converter#ByteSlicePayloadConverter)
- [NewProtoJSONPayloadConverter()](https://pkg.go.dev/go.temporal.io/sdk/converter#ProtoJSONPayloadConverter)
- [NewProtoPayloadConverter()](https://pkg.go.dev/go.temporal.io/sdk/converter#ProtoPayloadConverter)
- [NewJSONPayloadConverter()](https://pkg.go.dev/go.temporal.io/sdk/converter#JSONPayloadConverter)

The order in which the Payload Converters are applied is important because during serialization the Data Converter tries the Payload Converters in that specific order until a Payload Converter returns a non-nil Payload.

A custom [`PayloadConverter`](https://pkg.go.dev/go.temporal.io/sdk/converter#PayloadConverter) must implement functions `FromPayload` (for a single value) or `FromPayloads` (for a list of values) to convert to values from a Payload, and `ToPayload` (for a single value) or `ToPayloads` (for a list of values) to convert values to a Payload.

To set your custom Payload Converter, use [`NewCompositeDataConverter`](https://pkg.go.dev/go.temporal.io/sdk/converter#NewCompositeDataConverter) and set it as the Data Converter in the Client options.

- To replace the default Data Converter with a custom `NewCompositeDataConverter`, use the following.

  ```go
  dataConverter := converter.NewCompositeDataConverter(YourCustomPayloadConverter())
  ```

- To add your custom type conversion to the default Data Converter, use the following to keep the defaults but set yours just before the default JSON fall through.

  ```go
  dataConverter := converter.NewCompositeDataConverter(
    converter.NewNilPayloadConverter(),
    converter.NewByteSlicePayloadConverter(),
    converter.NewProtoJSONPayloadConverter(),
    converter.NewProtoPayloadConverter(),
    YourCustomPayloadConverter(),
    converter.NewJSONPayloadConverter(),
  )
  ```
