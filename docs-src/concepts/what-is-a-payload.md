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
Payloads also contain metadata that describe their data type or other parameters for use by custom encoders/converters.

When processed through the SDK, the [default Data Converter](/concepts/what-is-a-default-data-converter) serializes your data/value to a Payload before sending it to the Temporal Server.
The default Data Converter processes supported type values to Payloads. You can create a custom [Payload Converter](/concepts/what-is-a-payload-converter) to apply different conversion steps.

You can additionally apply [custom codecs](/concepts/what-is-a-payload-codec), such as for encryption or compression, on your Payloads.
