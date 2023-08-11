---
id: data-converter
title: Data Converter
sidebar_label: Data Converter
description: Use a Data Converter with a custom Payload Codec to encode and decode your data.
tags:
  - guide-context
  - security
---

Each Temporal SDK provides a [Data Converter](/concepts/what-is-a-data-converter) that can be customized with a custom [Payload Codec](/concepts/what-is-a-payload-codec) to encode and secure your data.

For details on what data can be encoded, how to secure it, and what to consider when using encryption, see [Data encryption](/production-readiness/develop#securing-your-data).

#### Codec Server

You can use a [Codec Server](/concepts/what-is-a-codec-server) with your custom Payload Codec to decode the data you see on your Web UI and CLI locally through remote endpoints.
However, ensure that you consider all security implications of [remote data encoding](/concepts/what-is-remote-data-encoding) before using a Codec Server.

For details on how to set up a Codec Server, see [Codec Server setup](/production-readiness/develop#codec-server-setup).
