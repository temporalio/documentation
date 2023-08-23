---
id: what-is-a-default-data-converter
title: What is a default Data Converter?
sidebar_label: Default Data Converter
description: The default Data Converter is used by the Temporal SDK to convert objects into bytes using a series of Payload Converters.
tags:
  - term
  - explanation
---

Each Temporal SDK includes and uses a default Data Converter.
The default Data Converter converts objects to bytes using a series of Payload Converters and supports binary, Protobufs, and JSON formats.
It encodes values in the following order:

- Null
- Byte array
- Protobuf JSON
- JSON

<!-- commenting this out but include this in the TS how-to.
In SDKs that cannot determine parameter types at runtime (for example, TypeScript), Protobufs aren't included in the default converter.
Also, Chad: This is only true by default on converting from payloads, but not on converting to payloads. And we have documented how to fix it for converting from payloads: https://legacy-documentation-sdks.temporal.io/typescript/data-converters#protobufs.-->

For example:

- If a value is an instance of a Protobuf message, it is encoded with [proto3 JSON](https://developers.google.com/protocol-buffers/docs/proto3#json).
- If a value isn't null, binary, or a Protobuf, it is encoded as JSON.
  If any part of it is not serializable as JSON, <!--(for example, a Date—see JSON data types)--> an error is thrown.

The default Data Converter serializes objects based on their root type, rather than nested types.
Some SDKs' JSON serializers cannot process lists with Protobuf children objects without implementing a [custom Data Converter](/concepts/what-is-a-custom-data-converter).
