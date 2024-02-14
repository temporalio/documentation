---
id: what-is-a-custom-data-converter
title: What is a custom Data Converter?
sidebar_label: Custom Data Converter
description: A custom Data Converter extends the default Data Converter with custom logic for Payload conversion or Payload encryption.
tags:
  - term
  - explanation
---

A custom Data Converter extends the default Data Converter with custom logic for [Payload](/concepts/what-is-a-payload) conversion or encoding.

You can create a custom Data Converter to alter formats (for example, using [MessagePack](https://msgpack.org/) instead of JSON) or add compression and encryption.

A Payload Codec encodes and decodes [Payloads](/concepts/what-is-a-payload), with bytes-to-bytes conversion.
To use custom encryption and/or compression logic, create a custom Payload Codec with your encryption/compression logic in the `encode` function and your decryption/decompression logic in the `decode` function.
To implement a custom Payload Codec, you can override the default Data Converter, or create a customized Data Converter that defines its own Payload Converter.

Custom Data Converters are not applied to all data; for example, [Search Attributes](/concepts/what-is-a-search-attribute) are persisted unencoded so they can be indexed for searching.

A customized Data Converter can have the following three components:

- [Payload Converter](/concepts/what-is-a-payload-converter)
- [Payload Codec](/concepts/what-is-a-payload-codec)
- [Failure Converter](/concepts/what-is-a-failure-converter)

For details on how to implement custom encryption and compression in your SDK, see [Data Encryption](/self-hosted/data-encryption).
