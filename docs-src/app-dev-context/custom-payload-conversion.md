---
id: custom-payload-conversion
title: How to use custom payload conversion
description: Create your custom `PayloadConverter` and set it on a `DataConverter` in your Client options.
sidebar_label: Custom payload conversion
tags:
  - guide-context
---

Most SDKs provide a [Payload Converter](/concepts/what-is-a-payload-converter) that can be customized to convert a custom data type to [Payload](/concepts/what-is-a-payload) and back.

Implementing custom Payload conversion is optional.
It is needed only if the [default Data Converter](/concepts/what-is-a-default-data-converter) does not support your custom values.

Create your [custom Payload Converter](/concepts/what-is-a-payload-converter#custom-payload-conversion) and configure the Data Converter to use it in your Client options.

The order in which your encoding Payload Converters are applied depend on the order given to the Data Converter.
You can set multiple encoding Payload Converters to run your conversions.
When the Data Converter receives a value for conversion, it passes through each Payload Converter in sequence until the converter that handles the data type does the conversion.
