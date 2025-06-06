---
id: payload-codec
title: Payload Codec
sidebar_label: Payload Codec
description: A Payload Codec performs bytes-to-bytes transformations on Temporal Payloads, often for compression and encryption.
slug: /payload-codec
toc_max_heading_level: 4
keywords:
  - encryption
  - explanation
  - keys
  - payloads
  - secrets
  - data-converters
  - payload-codec
tags:
  - Concepts
  - Encryption
  - Data Converters
  - Security
---

This page discusses [Payload Codec](#payload-codec).

## What is a Payload Codec? {#payload-codec}

A Payload Codec transforms an array of [Payloads](/dataconversion#payload) (for example, a list of Workflow arguments) into another array of Payloads.

When serializing to Payloads, the Payload Converter is applied first to convert your objects to bytes, followed by codecs that convert bytes to bytes.
When deserializing from Payloads, codecs are applied first to last to reverse the effect, followed by the Payload Converter.

Use a custom Payload Codec to transform your Payloads; for example, implementing compression and/or encryption on your Workflow Execution data.

### Encryption {#encryption}

Using end-to-end encryption in your custom Data Converter ensures that sensitive application data is secure when handled by the Temporal Server.

Apply your encryption logic in a custom Payload Codec and use it locally to encrypt data.
You maintain all the encryption keys, and the Temporal Server sees only encrypted data. Refer to [What is Key Management?](/key-management) for more guidance.

Your data exists unencrypted only on the Client and the Worker process that is executing the Workflows and Activities, on hosts that you control. For details, see [Securing your data](/production-deployment/data-encryption).

The following samples use encryption (AES GCM with 256-bit key) in a custom Data Converter:

- [Go sample](https://github.com/temporalio/samples-go/tree/main/encryption)
- [Java sample](https://github.com/temporalio/samples-java/tree/main/core/src/main/java/io/temporal/samples/encryptedpayloads)
- [Python sample](https://github.com/temporalio/samples-python/tree/main/encryption)
- [TypeScript sample](https://github.com/temporalio/samples-typescript/tree/main/encryption)
