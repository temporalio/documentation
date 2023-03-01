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
User code <--> Payload Converter <--> Payload Codec <--> Wire <--> Temporal Server
```

A Payload Codec encodes and decodes data. When serializing to Payloads, the Payload Converter is applied first to convert your objects to bytes, followed by codecs. The codecs are applied last to first, which means that the earlier encoders wrap the later ones.

When deserializing from Payloads, codecs are applied first to last to reverse the effect, followed by the Data Converter.

Use a custom Payload Codec to transform your payloads, for example by implementing compression and/or encryption and decryption.

#### Encryption​ and Decryption

Using end-to-end encryption in your custom Data Converter ensures that all your sensitive application data is secure when handled by the Temporal Server.
You can apply your encryption logic in a custom Payload Codec and use it locally to encrypt data.
You maintain all the encryption keys, and the Temporal Server sees only encrypted data.
Your data exists unencrypted only on the Client and the Worker process that is executing the Workflows and Activities, on hosts that you control.

See [Data encryption](/production-readiness/develop#data-encryption) for details.

The following samples use encryption (AES GCM with 256-bit key) in a custom Data Converter:

- [Go sample](https://github.com/temporalio/samples-go/tree/main/encryption)
- [Java sample](https://github.com/temporalio/samples-java/tree/main/src/main/java/io/temporal/samples/encryptedpayloads)
- [TypeScript sample](https://github.com/temporalio/samples-typescript/tree/main/encryption)
- [Python sample](https://github.com/temporalio/samples-python/tree/main/encryption)
