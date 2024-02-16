---
id: custom-payload-conversion
title: How to use custom payload conversion
description: Create your custom `PayloadConverter` and set it on a `DataConverter` in your Client options.
sidebar_label: Custom payload conversion
tags:
  - go sdk
  - developer-guide-doc-type
  - payload conversion
  - data converter
---

Temporal SDKs provide a default [Payload Converter](/concepts/what-is-a-payload-converter) that can be customized to convert a custom data type to [Payload](/concepts/what-is-a-payload) and back.

The order in which your encoding Payload Converters are applied depend on the order given to the Data Converter.
You can set multiple encoding Payload Converters to run your conversions.
When the Data Converter receives a value for conversion, it passes through each Payload Converter in sequence until the converter that handles the data type does the conversion.
