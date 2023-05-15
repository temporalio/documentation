---
id: what-is-a-custom-data-converter
title: What is a custom Data Converter?
sidebar_label: Custom Data Converter
description: A custom Data Converter extends the default Data Converter with custom logic for Payload conversion or Payload encryption.

tags:
  - term
  - explanation
---

A custom Data Converter extends the default [Data Converter](/concepts/what-is-a-data-converter) with custom logic for [Payload](/concepts/what-is-a-payload) conversion or encoding.

You can create a custom Data Converter to alter formats (for example, using [MessagePack](https://msgpack.org/) instead of JSON) or add compression and encryption.

You can customize the default Data Converter behavior in two ways:

- A Payload Converter serializes data, converting objects to bytes and back.
  To convert custom objects or data types to [Payloads](/concepts/what-is-a-payload) and back, use a custom Payload Converter and set it on a Data Converter.
- A Payload Codec encodes and decodes [Payloads](/concepts/what-is-a-payload), with bytes-to-bytes conversion.
  To use custom encryption and/or compression logic, create a custom Payload Codec with your encryption/compression logic in the `encode` function and your decryption/decompression logic in the `decode` function.

Custom Data Converters are not applied to all data; for example, [Search Attributes](/concepts/what-is-a-search-attribute) are simple values and persisted unencoded so they can be indexed for searching.

<!--
Commenting this bit for reference later; the Headers detail might change.
- Search Attributes are simple values and are persisted unencoded so they can be indexed for searching.
- Headers are not encoded by the SDK. (The one exception—when implemented—will be the SDK [running OTel baggage through custom codecs](https://github.com/temporalio/sdk-typescript/issues/514).) -->

A customized Data Converter can have the following three components:

- [Payload Converter](/concepts/what-is-a-payload-converter)
- [Failure Converter](/concepts/what-is-a-failure-converter)
- [Payload Codec](/concepts/what-is-a-payload-codec)

For details on how to implement custom Payload Converters in your SDK, see Custom Payload conversion for the following SDKs:

- [How to implement custom Payload convesion in Go](/go/custom-payload-conversion)
- [How to implement custom Payload conversion in Java](/java/custom-payload-conversion)

For details on how to implement custom encryption and compression in your SDK, see [Data Encryption](/production-readiness/develop#data-encryption).
