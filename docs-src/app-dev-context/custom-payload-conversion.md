---
id: custom-payload-conversion
title: How to use custom payload conversion
description: Create your custom `PayloadConverter` and set it on a `DataConverter` in your Client options.
sidebar_label: Custom payload conversion
tags:
  - guide-context
---

Most SDKs provide a [`PayloadConverter`](/concepts/what-is-a-payload-converter) that can be customized to convert values in custom data types to bytes and back.

Creating a custom Payload Converter is optional.
It's needed only if the default Data Converter does not support your custom values.

Create your [custom `PayloadConverter`](/concepts/what-is-a-payload-converter#custom-payload-conversion) and set it on a `DataConverter` in your Client options.

The order in which your encoding Payload Converters are applied depend on the order given to the Data Converter.
You can set multiple custom encoding Payload Converters to run your conversions.
When converting from a value to a payload, only the first one that handles the data type of the value will apply.
