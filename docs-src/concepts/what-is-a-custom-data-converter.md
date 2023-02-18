---
id: what-is-a-custom-data-converter
title: What is a custom Data Converter?
sidebar_label: Custom Data Converter
description: A custom Data Converter uses custom logic for payload conversion or payload encryption to customize the default Data Converter.

tags:
  - term
  - explanation
---

A custom Data Converter uses custom logic for payload conversion or payload encryption to customize the default [Data Converter](/concepts/what-is-a-data-converter).

You can create a custom Data Converter to alter formats (for example using [MessagePack](https://msgpack.org/) instead of JSON) or add compression and encryption.

You can customize the default Data Converter behavior in two ways:

- A Payload Converter serializes data, converting objects to bytes and back. To convert custom objects or data types to payloads and back, use a custom `PayloadConverter` and set it to alter the default Data Converter.
- A Payload Codec encodes and decodes data, with bytes to bytes conversion. To use custom encryption and/or compression logic, create a custom `PayloadCodec` with your encryption/compression logic in the `encode` function, and your decryption/decompression logic in your `decode` function.

Custom Data Converters are not applied to all data:

- Search Attributes are simple values and are persisted unencoded.
- Headers are not encoded by the SDK (the one exception will be—when implemented—the SDK [running OTel baggage through custom Codecs](https://github.com/temporalio/sdk-typescript/issues/514)).

A customized Data Converter can have the following three components:

- [Payload Converter](/concepts/what-is-a-payload-converter)
- [Failure Converter](/concepts/what-is-a-failure-converter)
- [Payload Codec](/concepts/what-is-a-payload-codec)

For details on how to implement custom Payload Converters in your SDK, see [Custom Payload Conversion](/app-dev-context/custom-payload-conversion).

For details on how to implement custom encryption and compression in your SDK, see [Data Encryption](/prod-readiness-context/data-encryption).
