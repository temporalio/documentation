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
The default Data Converter converts objects into bytes using a series of Payload Converters.
In most SDKs, the default converter supports binary, JSON, and Protobufs and encodes values in the following order:

- Null
- Binary
- Protobuf JSON
- JSON

In SDKs that cannot determine parameter types at runtime—like TypeScript—Protobufs aren't included in the default converter.

For example:

- If a value is an instance of a Protobuf message, it will be encoded with [proto3 JSON](https://developers.google.com/protocol-buffers/docs/proto3#json).
- If a value isn't null, binary, or a Protobuf, it will be encoded as JSON. If any part of it is not serializable as JSON (for example, a Date—see JSON data types), an error will be thrown.

The default converter also supports decoding binary Protobufs.
