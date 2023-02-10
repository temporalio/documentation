---
id: what-is-a-custom-data-converter
title: What is a custom Data Converter?
sidebar_label: Custom Data Converter
description: A custom Data Converter is an implementation of the Data Converter with custom logic for payload conversion and payload encryption.

tags:
  - term
  - explanation
---

A custom Data Converter is an implementation of the [Data Converter](/concepts/what-is-a-data-converter) with custom logic for payload conversion and payload encryption.

You can create a custom Data Converter to alter formats (for example using [MessagePack](https://msgpack.org/) instead of JSON) or add compression and encryption.

You can customize the default Data Converter behavior in two ways:

- To convert custom types to payloads and back, use a custom `PayloadConverter` and set it to alter the default Data Converter.
- To use custom encryption and/or compression logic, create a custom `PayloadCodec` with your encryption/compression logic in the `encode` function, and your decryption/decompression logic in your `decode` function.

Custom Data Converters are not applied to all data:

- Search Attributes are always encoded with JSON.
- Headers are not encoded by the SDK (the one exception will be—when implemented—the SDK [running OTel baggage through custom Codecs](https://github.com/temporalio/sdk-typescript/issues/514)).

A custom Data Converter can have thee following three components:

- [Payload Converter](/concepts/what-is-a-payload-converter)
- [Failure Converter](/concepts/what-is-a-failure-converter)
- [Payload Codec](/concepts/what-is-a-payload-codec)
