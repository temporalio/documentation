---
id: what-is-a-payload
title: What is a Payload?
sidebar_label: Payload
description: A Payload represents binary data such as input and output from Activities and Workflows.
tags:
  - term
  - payloads
  - explanation
---

A [Payload](https://api-docs.temporal.io/#temporal.api.common.v1.Payload) represents binary data such as input and output from Activities and Workflows.
Payloads contain metadata which describe the binary data, such as its data type or other arbitrary values for use by custom encoders/converters.

When processed through the SDK, the [default Data Converter](/concepts/what-is-a-default-data-converter) serializes your data/value to a Payload before sending it to the Temporal Server.
While the default Data Converter processes supported type values to Payloads, you can also create a custom [Payload Converter](/concepts/what-is-a-payload-converter) to convert your custom object types.

You can additionally apply [custom codecs](/concepts/what-is-a-payload-codec) on your Payloads, with encryption or compression for example, to wrap them into new encoded Payloads.
