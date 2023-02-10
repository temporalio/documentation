---
id: data-encryption
title: How to encrypt data using a custom Data Converter
description: Using encryption in your custom Data Converter ensures that all your sensitive application data is secure when handled by the Temporal Server.
sidebar_label: Data Encryption
tags:
  - guide-context
  - production-readiness
---

Using encryption in your custom Data Converter ensures that all your sensitive application data is secure when handled by the Temporal Server.
It also ensures that your data exists unencrypted only on the Client and the Worker process that is executing the Workflows and Activities, on hosts that you control.

Most SDKs provide a [`PayloadCodec`](/concepts/what-is-a-payload-codec) that transforms your payloads, for example by implementing compression and/or encryption and decryption.
The Payload Codec is an optional step that happens between the wire and the Payload Converter:

```bash
Temporal Server <--> Wire <--> Payload Codec <--> Payload Converter <--> User code
```

A `PayloadCodec` implementation is applied with a custom Data Converter in your Client that you use with Workers and to start Workflow Executions.

You can run your `PayloadCodec` [remotely](/concepts/what-is-remote-data-encoding) with a [Codec Server](/concepts/what-is-a-codec-server), and use the Codec Server endpoints in your WebUI and tctl to decode your encrypted paylods locally.

However, if you plan on setting up remote data encoding for all your payloads, ensure that you consider all security implications of running encryptions remotely before implementing it.

In codec implementations, we recommend running the function (whether it be compressing, encrypting, etc) on the entire input Payload, and putting the result in a new Payload's data field. That way, the input Payload's headers are preserved.

Examples for implementing compression:

- [ZlibCodec in Go](https://github.com/temporalio/sdk-go/blob/706516c7077ba2e9b40304aeddbed47e25b2a68f/converter/codec.go#L77-L105)
- [Encryption Data Converter](https://github.com/temporalio/samples-go/blob/15be864c80d4d983ebb8a8fbd3fa5263bcef6930/encryption/data_converter.go#L100-L126) in Go's encryption sample.
