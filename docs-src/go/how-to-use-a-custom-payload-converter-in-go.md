---
id: how-to-use-a-custom-payload-converter-in-go
title: How to use a custom Payload Converter in Go
sidebar_label: Custom Payload Converter
description: Use a `CompositeDataConverter` to apply custom `PayloadConverter` in a specified order.
tags:
  - go
  - developer-guide
---

Use a [`CompositeDataConverter`](https://pkg.go.dev/go.temporal.io/sdk@v1.20.0/converter#CompositeDataConverter) to apply custom type-specific `PayloadConverter` in a specified order.

The `PayloadConverter` converts bytes to values and back.

`NewCompositeDataConverter` creates new instance of `CompositeDataConverter` from an ordered list of type-specific `PayloadConverters`.
The following type-specific Payload Converters are available in the Go SDK, listed in the order that they are applied by the `NewCompositeDataConverter`:

- [`NewNilPayloadConverter()`](https://github.com/temporalio/sdk-go/blob/92138dd941d0de56367c2da4087845bf18d4bc4b/converter/nil_payload_converter.go#L39)
- [`NewByteSlicePayloadConverter()`](https://github.com/temporalio/sdk-go/blob/92138dd941d0de56367c2da4087845bf18d4bc4b/converter/byte_slice_payload_converter.go#L40)
- [`NewProtoJSONPayloadConverter()`](https://github.com/temporalio/sdk-go/blob/92138dd941d0de56367c2da4087845bf18d4bc4b/converter/proto_json_payload_converter.go#L59)
- [`NewProtoPayloadConverter()`](https://github.com/temporalio/sdk-go/blob/92138dd941d0de56367c2da4087845bf18d4bc4b/converter/proto_payload_converter.go#L50)
- [`NewJSONPayloadConverter()`](https://github.com/temporalio/sdk-go/blob/92138dd941d0de56367c2da4087845bf18d4bc4b/converter/json_payload_converter.go#L39)

The order in which the `PayloadConverters` are applied is important because during serialization, `DataConverter` will try the `PayloadsConverters` in that specific order until the `PayloadConverter` returns non-nil payload.
Last `PayloadConverter` should always serialize the value. The `JSONPayloadConverter` is a good candidate for this.

A custom `PayloadConverter` must implement functions `FromPayload` (for a single value) or `FromPayloads` (for a list of values) to convert to values from payload, and `ToPayload` (for a single value) or `ToPayloads` (for a list of values) to convert values to payload.

To set your custom `PaylaodConverter`, use the [`NewCompositeDataConverter`](https://pkg.go.dev/go.temporal.io/sdk/converter#NewCompositeDataConverter) to set it with the `DefaultDataConverter` in the Client that you use with your Worker and to start your Workflow Executions.

Note that the order of your `PayloadConverters` is important here because during serialization, `DataConverter` tries `PayloadsConverters` in that order until `PayloadConverter` returns non nil payload.
The last `PayloadConverter` should always serialize the value (JSONPayloadConverter is good candidate for it).

```go
 //need a better example here
c, err := client.NewClient(client.Options{
	DataConverter: converter.NewCompositeDataConverter(converter.GetDefaultDataConverter(), YourCustomPayloadConverter()),
       //...
```
