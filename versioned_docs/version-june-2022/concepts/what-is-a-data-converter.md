---
id: what-is-a-data-converter
title: What is a Data Converter?
sidebar_label: Data Converter
description: A Data Converter is a Temporal SDK component that encodes and decodes data entering and exiting a Temporal Server.
tags:
  - explanation
---

A Data Converter is a Temporal SDK component that encodes and decodes data entering and exiting a Temporal Server.

- TypeScript: [Data Converters](/typescript/data-converters)
- Go: [Create a custom Data Converter](/go/how-to-create-a-custom-data-converter-in-go)

![Data Converter encodes and decodes data](/diagrams/default-data-converter.svg)

Data is encoded before it is sent to a Temporal Server, and it is decoded when it is received from a Temporal Server.

The main pieces of data that run through the Data Converter are arguments and return values:

- The Client:
  - Encodes Workflow, Signal, and Query arguments
  - Decodes Workflow and Query return values
- The Worker:
  - Decodes Workflow, Signal, and Query arguments
  - Encodes Workflow and Query return values
  - Decodes and encodes Activity arguments and return values

Each piece of data (like a single argument or return value) is encoded as a [`Payload`](https://github.com/temporalio/api/blob/2f980f7ce4349e808b16ec0f21e0fe675f79330f/temporal/api/common/v1/message.proto#L49) Protobuf message, which consists of binary `data` and key-value `metadata`.

## Default Data Converter

Each Temporal SDK includes a default Data Converter.
In most SDKs, the default converter supports binary, JSON, and Protobufs.
(In SDKs that cannot determine parameter types at runtime—like TypeScript—Protobufs aren't included in the default converter.)
It tries to encode values in the following order:

- Null
- Binary
- Protobuf JSON
- JSON

For example:

- If a value is an instance of a Protobuf message, it will be encoded with [proto3 JSON](https://developers.google.com/protocol-buffers/docs/proto3#json).
- If a value isn't null, binary, or a Protobuf, it will be encoded as JSON. If any part of it is not serializable as JSON (for example, a Date—see [JSON data types](https://en.wikipedia.org/wiki/JSON#Data_types)), an error will be thrown.

The default converter also supports decoding binary Protobufs.

## Custom Data Converter

Applications can create their own custom Data Converters to alter the format (for example using [MessagePack](https://msgpack.org/) instead of JSON) or add compression or encryption.

To use a custom Data Converter, provide it to:

- The Client and Worker in the SDKs you use
- Temporal Web via [`tctl data-converter web`](/tctl/dataconverter/web) (for displaying decoded data in the Web UI)
- `tctl` via [`--data-converter-plugin`](/tctl/#--data-converter-plugin) (for displaying decoded headers in `tctl` output)

Custom Data Converters are not applied to all data:

- `searchAttributes` are always encoded with JSON
- Headers are not encoded by the SDK (the one exception will be—once implemented—the SDK [running OTel baggage through custom Codecs](https://github.com/temporalio/sdk-typescript/issues/514))

### Payload Codecs

In [TypeScript](/typescript/data-converters#custom-data-converter) and [Go](https://pkg.go.dev/go.temporal.io/sdk/converter#PayloadCodec), data conversion happens in two stages:

- First, a Payload Converter converts a value into a [`Payload`](https://github.com/temporalio/api/blob/2f980f7ce4349e808b16ec0f21e0fe675f79330f/temporal/api/common/v1/message.proto#L49)
- Then, a Payload Codec transforms an array of Payloads (for example, a list of Workflow arguments) into another array of Payloads

The Payload Codec is an optional step that happens between the wire and the Payload Converter:

```
Temporal Server <--> Wire <--> Payload Codec <--> Payload Converter <--> User code
```

Common Payload Codec transformations are compression and encryption.

In codec implementations, we recommended running the function (whether it be compressing, encrypting, etc) on the entire input Payload, and putting the result in a new Payload's `data` field. That way, the input Payload's headers are preserved. See, for example:

- [`ZlibCodec`](https://github.com/temporalio/sdk-go/blob/706516c7077ba2e9b40304aeddbed47e25b2a68f/converter/codec.go#L77-L105) in the Go SDK
- [Encryption Data Converter](https://github.com/temporalio/samples-go/blob/15be864c80d4d983ebb8a8fbd3fa5263bcef6930/encryption/data_converter.go#L100-L126) in Go's encryption sample

### Encryption

Doing encryption in a custom Data Converter ensures that all application data is encrypted while:

- Being sent to/from Temporal Server
- Moving inside Temporal Server
- Stored by Temporal Server

Then data only exists unencrypted in memory on the Client and in the Worker Process that is executing Workflows and Activities on hosts that the application developer controls.

Our encryption samples use AES GCM with 256-bit keys:

- [TypeScript sample](https://github.com/temporalio/samples-typescript/tree/main/encryption)
- [Go sample](https://github.com/temporalio/samples-go/tree/main/encryption)
- [Java sample](https://github.com/temporalio/samples-java/tree/main/src/main/java/io/temporal/samples/encryptedpayloads)
