---
id: what-is-a-payload-codec
title: What is a Payload Codec?
sidebar_label: Payload Codec
description: A Payload Codec transforms an array of Payloads into another array of Payloads.
tags:
  - term
  - explanation
---

A Payload Codec transforms an array of [Payloads](/concepts/what-is-a-payload) (for example, a list of Workflow arguments) into another array of Payloads.

When serializing to Payloads, the Payload Converter is applied first to convert your objects to bytes, followed by codecs that convert bytes to bytes.
When deserializing from Payloads, codecs are applied first to last to reverse the effect, followed by the Payload Converter.

Use a custom Payload Codec to transform your Payloads; for example, implementing compression and/or encryption on your Workflow Execution data.

#### Encryption

Using end-to-end encryption in your custom Data Converter ensures that sensitive application data is secure when handled by the Temporal Server.

Apply your encryption logic in a custom Payload Codec and use it locally to encrypt data.
You maintain all the encryption keys, and the Temporal Server sees only encrypted data. Refer to [What is Key Management?](/concepts/what-is-key-management) for more guidance.
Your data exists unencrypted only on the Client and the Worker process that is executing the Workflows and Activities, on hosts that you control.

For details, see [Securing your data](/self-hosted/data-encryption).

The following samples use encryption (AES GCM with 256-bit key) in a custom Data Converter:

- [Go sample](https://github.com/temporalio/samples-go/tree/main/encryption)
- [Java sample](https://github.com/temporalio/samples-java/tree/main/src/main/java/io/temporal/samples/encryptedpayloads)
- [Python sample](https://github.com/temporalio/samples-python/tree/main/encryption)
- [TypeScript sample](https://github.com/temporalio/samples-typescript/tree/main/encryption)
