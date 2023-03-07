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

Create your [custom `PayloadConverter`](/concepts/what-is-a-payload-converter#custom-payload-conversion) and set it with the default `DataConverter` in your Client options.

The order in which your Payload Converters are applied depend on the encoding type that each handles.
You can set multiple custom Payload Converters to run your conversions.
