---
id: how-to-use-a-custom-payload-codec-in-go
title: How to use a custom Payload Codec in Go
sidebar_label: Custom Payload Codec
description: Create a custom `PayloadCodec` implementation and define your encryption/compression and decryption/decompression logic in the `encode` and `decode` functions.`
tags:
  - go
  - developer-guide
---

**Create a custom Payload Codec**

Create a custom [`PayloadCodec`](https://pkg.go.dev/go.temporal.io/sdk@v1.20.0/converter#PayloadCodec) implementation and define your encryption/compression and decryption/decompression logic in the `encode` and `decode` functions.

The [`PayloadCodec`](https://pkg.go.dev/go.temporal.io/sdk@v1.21.1/converter#PayloadCodec) converts bytes to bytes.
It must be used in an instance of [`CodecDataConverter`](https://pkg.go.dev/go.temporal.io/sdk@v1.21.1/converter#CodecDataConverter) that wraps a Data Converter to do the payload conversions, and applies the custom encoding and decoding in the `PayloadCodec` to the converted payloads.

The following example shows how to create a custom `NewCodecDataConverter` that wraps an instance of a Data Converter with a custom `PayloadCodec`.

```go
// Create an instance of Data Converter.
var DataConverter = NewDataConverter(converter.GetDefaultDataConverter())

// NewDataConverter creates a Data Converter that wraps the specified Data
// Converter with snappy compression, using the custom PayloadCodec called NewPayloadCodec.
func NewDataConverter(underlying converter.DataConverter) converter.DataConverter {
	return converter.NewCodecDataConverter(underlying, NewPayloadCodec())
}

// Create an instance of PaylodCodec.
func NewPayloadCodec() converter.PayloadCodec {
	return &Codec{}
}
```

Implement your encryption and compression logic in the `encode` function, and the decryption and decompression logic in the `decode` function in your custom `PayloadCodec`, as shown in the following example.

```go
// Codec implements converter.PayloadEncoder for snappy compression.
type Codec struct{}

// Encode implements converter.PayloadCodec.Encode.
func (Codec) Encode(payloads []*commonpb.Payload) ([]*commonpb.Payload, error) {
	//your encryption/compression logic
	return result, nil
}

// Decode implements converter.PayloadCodec.Decode.
func (Codec) Decode(payloads []*commonpb.Payload) ([]*commonpb.Payload, error) {
	//your decryption/decompression logic
	return result, nil
}
```

See [Codec Server](/concepts/what-is-a-codec-server) for remote data encoding/decoding.

**Set Data Converter to use custom Payload Codec**

Set your custom `PaylaodCodec` with an instance of `DataConverter` in your `Dial` client options that you use to create the client for your Worker process and to start Workflow Executions.

The following example shows how to set your custom Data Converter from a package called `codecserver`.

```go
//...
c, err := client.Dial(client.Options{
		// Set DataConverter here to ensure that workflow inputs and results are
		// encoded as required.
		DataConverter: codecserver.DataConverter,
	})
//...
```

You can also create a remote HTTP server (called a codec server) to run encryption and decryption through the custom `PayloadCodec`, and expose endpoints that you can use with Web UI and tctl to see decrypted data.

See the following samples for examples:

- [Codec server](https://github.com/temporalio/samples-go/tree/af2614a728e3dd9640f3a3e95873f96a4e56f81a/codec-server)
- [Encryption](https://github.com/temporalio/samples-go/tree/af2614a728e3dd9640f3a3e95873f96a4e56f81a/encryption)
