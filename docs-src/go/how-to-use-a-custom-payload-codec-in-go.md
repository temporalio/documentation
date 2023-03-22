---
id: how-to-use-a-custom-payload-codec-in-go
title: How to use a custom Payload Codec in Go
sidebar_label: Custom Payload Codec
description: Create a custom `PayloadCodec` implementation and define your encryption/compression and decryption/decompression logic in the `Encode` and `Decode` functions.
tags:
  - go
  - developer-guide
---

**Create a custom Payload Codec**

Create a custom [PayloadCodec](https://pkg.go.dev/go.temporal.io/sdk/converter#PayloadCodec) implementation and define your encryption/compression and decryption/decompression logic in the `Encode` and `Decode` functions.

The Payload Codec converts bytes to bytes.
It must be used in an instance of [CodecDataConverter](https://pkg.go.dev/go.temporal.io/sdk/converter#CodecDataConverter) that wraps a Data Converter to do the payload conversions, and applies the custom encoding and decoding in `PayloadCodec` to the converted payloads.

The following example from the [Data Converter sample](https://github.com/temporalio/samples-go/blob/main/codec-server/data_converter.go) shows how to create a custom `NewCodecDataConverter` that wraps an instance of a Data Converter with a custom `PayloadCodec`.

```go
// Create an instance of Data Converter with your codec.
var DataConverter = converter.NewCodecDataConverter(
	converter.GetDefaultDataConverter(),
	NewPayloadCodec(),
)
//...
// Create an instance of PaylodCodec.
func NewPayloadCodec() converter.PayloadCodec {
	return &Codec{}
}
```

Implement your encryption/compression logic in the `Encode` function and the decryption/decompression logic in the `Decode` function in your custom `PayloadCodec`, as shown in the following example.

```go
// Codec implements converter.PayloadEncoder for snappy compression.
type Codec struct{}

// Encode implements converter.PayloadCodec.Encode.
func (Codec) Encode(payloads []*commonpb.Payload) ([]*commonpb.Payload, error) {
	result := make([]*commonpb.Payload, len(payloads))
	for i, p := range payloads {
		// Marshal proto
		origBytes, err := p.Marshal()
		if err != nil {
			return payloads, err
		}
		// Compress
		b := snappy.Encode(nil, origBytes)
		result[i] = &commonpb.Payload{
			Metadata: map[string][]byte{converter.MetadataEncoding: []byte("binary/snappy")},
			Data:     b,
		}
	}

	return result, nil
}

// Decode implements converter.PayloadCodec.Decode.
func (Codec) Decode(payloads []*commonpb.Payload) ([]*commonpb.Payload, error) {
	result := make([]*commonpb.Payload, len(payloads))
	for i, p := range payloads {
		// Decode only if it's our encoding
		if string(p.Metadata[converter.MetadataEncoding]) != "binary/snappy" {
			result[i] = p
			continue
		}
		// Uncompress
		b, err := snappy.Decode(nil, p.Data)
		if err != nil {
			return payloads, err
		}
		// Unmarshal proto
		result[i] = &commonpb.Payload{}
		err = result[i].Unmarshal(b)
		if err != nil {
			return payloads, err
		}
	}

	return result, nil
}
```

For remote data encoding/decoding, see [Codec Server](/concepts/what-is-a-codec-server).

**Set Data Converter to use custom Payload Codec**

Set your custom `PayloadCodec` with an instance of `DataConverter` in your `Dial` client options that you use to create the client.

The following example shows how to set your custom Data Converter from a package called `mycodecpackage`.

```go
//...
c, err := client.Dial(client.Options{
		// Set DataConverter here to ensure that Workflow inputs and results are
		// encoded as required.
		DataConverter: mycodecpackage.DataConverter,
	})
//...
```

For reference, see the following samples:

- [Codec server](https://github.com/temporalio/samples-go/tree/main/codec-server)
- [Encryption](https://github.com/temporalio/samples-go/tree/main/encryption)
