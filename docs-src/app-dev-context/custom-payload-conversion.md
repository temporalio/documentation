---
id: custom-payload-conversion
title: How to use custom payload conversion
description: Define your custom `PayloadConverter` with your custom logic and set the `DefaultDataConverter` with your custom `PayloadConverter` in your Client options.
sidebar_label: Custom payload conversion
tags:
  - guide-context
---

Most SDKs provide a [`PayloadConverter`](/concepts/what-is-a-payload-converter) that can be customized to convert custom data types to bytes and back.

Creating a custom Payload Converter is optional.
It's needed only if the default Data Converter does not support your custom values.

Create your [custom `PayloadConverter`](/concepts/what-is-a-payload-converter#custom-payload-conversion) and set it on a `DataConverter` in your Client options.

The order in which your Encoding Payload Converters are applied depend on the order given to the data converter.
You can set multiple custom Encoding Payload Converters to run your conversions and when converting from a value to a payload, only the first one that handles the value will apply. When converting to a value from a payload, the encoding is used.
