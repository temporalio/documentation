---
id: custom-payload-conversion
title: How to use custom payload-conversion
description:
sidebar_label: Custom logger
tags:
  - guide-context
---

By default Temporal uses the `JacksonJsonPayloadConverter` for serialization and deserialization of arguments.

Most SDKs provide a `PayloadConverter` that can be customized to convert custom data types to values and back.

Define your custom `PayloadConverter` with your custom logic and set the `DefaultDataConverter` with your custom `PayloadConverter` in your Client options.

You can set multiple custom `PayloadConverters` to run your conversions.
