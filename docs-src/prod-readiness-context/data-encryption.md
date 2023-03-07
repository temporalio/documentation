---
id: data-encryption
title: How to encrypt data using a custom Data Converter
description: Configure your custom encryption logic with `PayloadCodec` and set it with a custom Data Converter.
sidebar_label: Data Encryption
tags:
  - guide-context
  - production-readiness
---

Temporal Server stores and persists the data handled in your Workflow Execution.
For example, the following objects are persisted in the Workflow Execution Event History:

- Inputs and outputs/results in your [Workflow](/concepts/what-is-a-workflow-execution), [Activity](/concepts/what-is-an-activity-execution), and [Child Workflow](/concepts/what-is-a-child-workflow-execution)
- Inputs to your [Signal](/concepts/what-is-a-signal)
- Metadata information
- Results of [Local Activity](/concepts/what-is-a-local-activity) [Side Effects](/concepts/what-is-a-side-effect)
- [Search Attributes](/concepts/what-is-a-search-attribute)
- [Application errors and failures](/kb/failures).

You can encrypt this data (except for Search Attributes and metadata) to ensure that any sensitive application data is secure when handled by the Temporal Server.
This technique also ensures that your data exists unencrypted only on the Client and the Worker process that is executing the Workflows and Activities, on hosts that you control.

To encrypt your data, configure your custom encryption logic with [`PayloadCodec`](/concepts/what-is-a-payload-codec) and set it with a [custom Data Converter](/concepts/what-is-a-custom-data-converter).

A [`PayloadCodec`](/concepts/what-is-a-payload-codec) transforms your payloads (for example, by implementing compression and/or encryption and decryption) and is an optional step that happens between the wire and the [Payload Converter](/concepts/what-is-a-payload-converter):

```bash
User code <--> Payload Converter <--> Payload Codec <--> Wire <--> Temporal Server
```

A `PayloadCodec` implementation is applied with a custom Data Converter in your Client options.

You can run your `PayloadCodec` with a [Codec Server](/concepts/what-is-a-codec-server) and use the Codec Server endpoints in Web UI and tctl to decode your encrypted payloads locally.
For details, see [Decoding payloads on the Web UI and tctl](/concepts/what-is-remote-data-encoding#decoding-payloads-on-the-web-ui-and-tctl).

However, if you plan to set up remote data encoding for your data, ensure that you consider all security implications of running encryption remotely before implementing it.

In codec implementations, we recommend running the function (such as compressing or encrypting) on the entire input payload, and putting the result in the data field of a new payload with a different `encoding` metadata field.
That way, the input payload's metadata is preserved.

Examples for implementing encryption:

- [Go sample](https://github.com/temporalio/samples-go/tree/main/encryption)
- [Java sample](https://github.com/temporalio/samples-java/tree/main/src/main/java/io/temporal/samples/encryptedpayloads)
- [TypeScript sample](https://github.com/temporalio/samples-typescript/tree/main/encryption)
- [Python sample](https://github.com/temporalio/samples-python/tree/main/encryption)

Examples for implementing compression:

- [Go sample](https://github.com/temporalio/sdk-go/blob/706516c7077ba2e9b40304aeddbed47e25b2a68f/converter/codec.go#L77-L105)
- [Java sample](https://github.com/temporalio/sdk-java/blob/2c29eda4558f4063804c816481a9f9acf132f65c/temporal-sdk/src/main/java/io/temporal/payload/codec/ZlibPayloadCodec.java#L41)
