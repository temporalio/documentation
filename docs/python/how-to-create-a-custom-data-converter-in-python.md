---
id: how-to-create-a-custom-data-converter-in-python
title: How to create a custom data converter in Python
sidebar_label: Create a custom data converter
description: Create a custom data converter
tags:
  - developer-guide
  - sdk
  - python
---

Data converters are used to convert raw Temporal payloads to and from Python types.

A custom data converter of type [`temporalio.converter.DataConverter`](https://python.temporal.io/temporalio.converter.dataconverter) can be set by the [`data_converter`](https://python.temporal.io/temporalio.client.client#data_converter) Client parameter.
Data converters are a combination of _payload converters_ and _payload codecs_.

- Payload converters converts Python values to and from serialized bytes.
- Payload codecs converts bytes to bytes, for example, for compression or encryption.

The default data converter supports converting multiple types including:

- `None`
- `bytes`
- `google.protobuf.message.Message`: as JSON when encoding, but has ability to decode binary Protobuf from other languages.
- Anything that [json.dump](https://docs.python.org/3/library/json.html#json.dump) supports

As a special case in the default converter, data classes are automatically converted to dictionaries before encoding as JSON. Because Python is a dynamic language, when decoding by means of `json.load`, the type is not known at runtime. For example, a JSON object will be a dictionary. As a special case, if the parameter type hint is a data class for a JSON payload, it is decoded into an instance of that data class (properly recursing into child data classes).
