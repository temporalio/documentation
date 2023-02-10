---
id: what-is-a-payload-codec
title: What is a Payload Codec?
sidebar_label: Payload Codec
description: A Payload Codec transforms an array of Payloads (for example, a list of Workflow arguments) into another array of Payloads.
tags:
  - term
  - explanation
---

A Payload Codec transforms an array of Payloads (for example, a list of Workflow arguments) into another array of Payloads.

The Payload Codec is an optional step that happens between the wire and the Payload Converter:

```bash
Temporal Server <--> Wire <--> Payload Codec <--> Payload Converter <--> User code
```

When serializing to Payloads:

- Data Converter is applied first, followed by the chain of codecs.
- Codecs are applied last to first meaning the earlier encoders wrap the later ones.

When deserializing from Payloads:

- Codecs are applied first to last to reverse the effect, followed by the Data Converter.
- Data Converter is applied last.

Use a Payload Codec to transform your payloads, for example by implementing compression and/or encryption and decryption.

#### Encryption​ and Decryption

Using encryption in your custom Data Converter ensures that all your sensitive application data is secure when handled by the Temporal Server. It also ensures that your data exists unencrypted only on the Client and the Worker process that is executing the Workflows and Activities, on hosts that you control.

You can implement encryption and decryption in your Payload Codec.
The following samples use encryption (AES GCM with 256-bit key) in a custom Data Converter:

- [Go sample](https://github.com/temporalio/samples-go/tree/main/encryption)
- [Java sample](https://github.com/temporalio/samples-java/tree/main/src/main/java/io/temporal/samples/encryptedpayloads)
- [TypeScript sample](https://github.com/temporalio/samples-typescript/tree/main/encryption)
- [Python sample](https://github.com/temporalio/samples-python/tree/main/encryption)

See [Data encryption](/production-readiness/develop#data-encryption) for details.
