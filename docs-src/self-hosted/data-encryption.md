---
id: data-encryption
title: How to encrypt data using a custom Data Converter
description: Configure your custom encryption logic with `PayloadCodec` and set it with a custom Data Converter.
sidebar_label: Securing your data
tags:
  - guide-context
  - production-readiness
---

Temporal Server stores and persists the data handled in your Workflow Execution.
Encrypting this data ensures that any sensitive application data is secure when handled by the Temporal Server.

For example, if you have sensitive information passed in the following objects that are persisted in the Workflow Execution Event History, use encryption to secure it:

- Inputs and outputs/results in your [Workflow](/concepts/what-is-a-workflow-execution), [Activity](/concepts/what-is-an-activity-execution), and [Child Workflow](/concepts/what-is-a-child-workflow-execution)
- [Signal](/concepts/what-is-a-signal) inputs
- [Memo](/concepts/what-is-a-memo)
- Headers (verify if applicable to your SDK)
- [Query](/concepts/what-is-a-query) inputs and results
- Results of [Local Activities](/concepts/what-is-a-local-activity) and [Side Effects](/concepts/what-is-a-side-effect)
- [Application errors and failures](/references/failures)

  Failure messages and stack traces are not encoded as codec-capable Payloads by default; you must explicitly enable encoding these common attributes on failures. For more details, see [Failure Converter](/concepts/what-is-a-failure-converter).

Using encryption ensures that your sensitive data exists unencrypted only on the Client and the Worker Process that is executing the Workflows and Activities, on hosts that you control.

By default, your data is serialized to a [Payload](/concepts/what-is-a-payload) by a [Data Converter](/concepts/what-is-a-data-converter).
To encrypt your Payload, configure your custom encryption logic with a [Payload Codec](/concepts/what-is-a-payload-codec) and set it with a [custom Data Converter](/concepts/what-is-a-custom-data-converter).

A Payload Codec does byte-to-byte conversion to transform your Payload (for example, by implementing compression and/or encryption and decryption) and is an optional step that happens between the wire and the [Payload Converter](/concepts/what-is-a-payload-converter):

```bash
User code <--> Payload Converter <--> Payload Codec <--> Wire <--> Temporal Server
```

You can run your Payload Codec with a [Codec Server](/concepts/what-is-a-codec-server) and use the Codec Server endpoints in Web UI and tctl to decode your encrypted Payload locally.
For details on how to set up a Codec Server, see [Codec Server setup](/self-hosted/how-to-set-up-codec-server).

However, if you plan to set up [remote data encoding](/concepts/what-is-remote-data-encoding) for your data, ensure that you consider all security implications of running encryption remotely before implementing it.

In codec implementations, we recommend running the function (such as compression or encryption) on the entire input Payload and putting the result in the data field of a new Payload with a different encoding metadata field.
Using this technique ensures that the input Payload's metadata is preserved.
When the encoded Payload is sent to be decoded, you can verify the metadata field before applying the decryption.
If your Payload is _not_ encoded, we recommend passing the unencoded data to the decode function instead of failing the conversion.

Examples for implementing encryption:

- [Go sample](https://github.com/temporalio/samples-go/tree/main/encryption)
- [Java sample](https://github.com/temporalio/samples-java/tree/main/core/src/main/java/io/temporal/samples/encryptedpayloads)
- [Python sample](https://github.com/temporalio/samples-python/tree/main/encryption)
- [TypeScript sample](https://github.com/temporalio/samples-typescript/tree/main/encryption)

Examples for implementing compression:

- [Go sample](https://pkg.go.dev/go.temporal.io/sdk/converter#ZlibCodecOptions)
- [Java sample](https://www.javadoc.io/doc/io.temporal/temporal-sdk/latest/io/temporal/payload/codec/ZlibPayloadCodec.html)
