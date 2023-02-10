---
id: custom-payload-conversion
title: How to use custom payload-conversion
description: Define your custom `PayloadConverter` with your custom logic and set the `DefaultDataConverter` with your custom `PayloadConverter` in your Client options.
sidebar_label: Custom Payload Conversion
tags:
  - guide-context
---

Define your custom `PayloadConverter` with your custom logic and set the `DefaultDataConverter` with your custom `PayloadConverter` in your Client options.

By default Temporal uses the `JacksonJsonPayloadConverter` for serialization and deserialization of arguments.

Most SDKs provide a `PayloadConverter` that can be customized to convert custom data types to values and back.

You can set multiple custom `PayloadConverters` to run your conversions.
